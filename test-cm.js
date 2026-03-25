import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { ensureSyntaxTree, syntaxTree } from '@codemirror/language';

const state = EditorState.create({
  doc: '- ？ test\n- ? test',
  extensions: [markdown()]
});

const tree = syntaxTree(state);
tree.iterate({
  enter: (node) => {
    console.log(`[${node.from}:${node.to}] ${node.name} | '${state.doc.sliceString(node.from, node.to)}'`);
  }
});
