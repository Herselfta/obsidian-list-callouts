const regexMatches = (regexStr, text) => {
    const re = new RegExp(regexStr);
    return text.match(re);
};

const chars = ["?", "？", "foo", "!"];
const joined = chars.join('|');
const regexEditorStr = `(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${joined}) `;

console.log(regexEditorStr);
const cases = [
    "- ? test",
    "- ？ test",
    "- foo test"
];

cases.forEach(c => {
    const m = regexMatches(regexEditorStr, c);
    console.log(c, m ? m.slice(1, 3) : null);
});
