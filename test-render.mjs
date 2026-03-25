import escapeStringRegexp from 'escape-string-regexp';

const settings = [
  { color: '255, 214, 0', char: '&' },
  { color: '255, 145, 0', char: '?' },
  { color: '255, 145, 0', char: '？' },
  { color: '255, 23, 68', char: '!' },
  { color: '255, 23, 68', char: '！' },
  { color: '124, 77, 255', char: '~' },
  { color: '124, 77, 255', char: '～' },
  { color: '0, 184, 212', char: '@' },
  { color: '0, 200, 83', char: '$' },
  { color: '0, 200, 83', char: '￥' },
  { color: '0, 200, 83', char: '¥' },
  { color: '158, 158, 158', char: '%' },
];

const callouts = settings.reduce((record, curr) => {
    record[curr.char] = curr;
    return record
}, {});

const editorReStr = `(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${
    settings
    .map(callout => (callout && callout.char) || '')
    .filter(char => typeof char === 'string' && char.trim().length > 0)
    .sort((a, b) => b.length - a.length)
    .map(char => escapeStringRegexp(char))
    .join('|')
})(?:import escapeStringRegexp fromxp
const settings = [
  { color: '255, 214, 0', char: ' te  { color: '255, ?   { color: '255, 145, 0', char: '?' }? { color: '255, 145, 0', char: '？'te  { color: '255, 23, 68', char: '!' },
ma  { color: '255, 23, 68', char: '！'nT  { color: '124, 77, 255', char: '~' }, c  { color: '124, 77, 255', char: '～'ch  { color: '0, 184, 212', char: '@' },
 st callout = callouts[match[2]];
          { color: '0, 200, 83', char: '￥'og(`  Callout resolved:`, callout);
        { color: '158, 158, 158', char: '%' E];

const callouts = settings.reduce((r'$
mat    record[curr.char] = curr;
    return record
}, og    return h.`);
    }
});
