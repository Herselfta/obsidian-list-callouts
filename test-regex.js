const regexMatches = (regexStr, text) => {
    const re = new RegExp(regexStr);
    return text.match(re);
};

const prefixes = ["- ", "* ", "+ ", "1. ", "1) ", "- [ ] "];
const chars = ["？", "!", "A"];
const joined = chars.join('|');
const regexEditorStr = `(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${joined}) `;
const regexPostProcessorStr = `^(${joined}) `;

console.log('--- Editor Regex ---');
prefixes.forEach(p => {
    chars.forEach(c => {
        const text = `${p}${c} test`;
        console.log(`text: "${text}" ->`, regexMatches(regexEditorStr, text) ? "MATCH" : "FAIL");
    });
});

console.log('--- PostProcessor Regex ---');
chars.forEach(c => {
    const text = `${c} test`;
    console.log(`text: "${text}" ->`, regexMatches(regexPostProcessorStr, text) ? "MATCH" : "FAIL");
});
