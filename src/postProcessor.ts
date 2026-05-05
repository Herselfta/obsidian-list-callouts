import { MarkdownPostProcessor, setIcon } from 'obsidian';
import { CalloutConfig } from './settings';

function getFirstTextNode(node: Node): Node | null {
  if (node.nodeType === document.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (
      el.hasClass('list-bullet') ||
      el.hasClass('task-list-item-checkbox') ||
      el.tagName === 'INPUT'
    ) {
      return null;
    }

    for (const child of Array.from(el.childNodes)) {
      const result = getFirstTextNode(child);
      if (result) return result;
    }
  }

  if (node.nodeType === document.TEXT_NODE) {
    if (node.nodeValue?.trim() !== '') {
      return node;
    }
  }

  return null;
}

function wrapLiContent(li: HTMLElement) {
  const toReplace: ChildNode[] = [];
  let insertBefore = null;

  for (let i = 0, len = li.childNodes.length; i < len; i++) {
    const child = li.childNodes.item(i);

    if (child.nodeType === document.ELEMENT_NODE) {
      const el = child as Element;
      if (
        el.hasClass('list-collapse-indicator') ||
        el.hasClass('list-bullet')
      ) {
        continue;
      }

      if (['UL', 'OL'].includes(el.tagName)) {
        insertBefore = child;
        break;
      }
    }

    toReplace.push(child);
  }

  // If there's already a P tag (loose list), reuse it as the wrapper
  const meaningfulNodes = toReplace.filter(
    (n) => n.nodeType !== document.TEXT_NODE || n.nodeValue?.trim() !== ''
  );

  if (
    meaningfulNodes.length === 1 &&
    (meaningfulNodes[0] as HTMLElement).tagName === 'P'
  ) {
    const p = meaningfulNodes[0] as HTMLElement;
    p.addClass('lc-li-wrapper');
    p.addClass('lc-is-p');
    if (
      li.querySelector(
        'input.task-list-item-checkbox, input[type="checkbox"], .task-list-item-checkbox'
      )
    ) {
      p.addClass('lc-has-checkbox');
    }
    return;
  }

  const wrapper = createSpan({ cls: 'lc-li-wrapper' });
  if (
    li.querySelector(
      'input.task-list-item-checkbox, input[type="checkbox"], .task-list-item-checkbox'
    )
  ) {
    wrapper.addClass('lc-has-checkbox');
  }
  toReplace.forEach((node) => wrapper.append(node));

  if (insertBefore) {
    insertBefore.before(wrapper);
  } else {
    li.append(wrapper);
  }
}

export function buildPostProcessor(
  getConfig: () => CalloutConfig
): MarkdownPostProcessor {
  return async (el, ctx: any) => {
    const config = getConfig();

    if (ctx.promises?.length) {
      await Promise.all(ctx.promises);
    }

    el.findAll('li').forEach((li) => {
      const node = getFirstTextNode(li);
      if (!node) return;

      const text = node.textContent;
      if (!text) return;

      const match = text.match(config.re);
      // match[1] is leading whitespace, match[2] is the callout char
      const callout = match ? config.callouts[match[2]] : null;

      if (match && callout) {
        li.addClass('lc-list-callout');
        li.setAttribute('data-callout', callout.char);
        li.style.setProperty('--lc-callout-color', callout.color);

        (node as any).replaceWith(
          createFragment((f) => {
            // Restore leading whitespace
            f.append(match[1]);
            f.append(
              createSpan(
                {
                  cls: 'lc-list-marker',
                  text: match[2],
                },
                (span) => {
                  if (callout.icon) {
                    setIcon(span, callout.icon);
                  }
                }
              )
            );
            // Append rest of text
            f.append(text.slice(match[0].length));
          })
        );

        wrapLiContent(li);
      }
    });
  };
}
