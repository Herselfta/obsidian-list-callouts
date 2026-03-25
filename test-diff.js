const escapeStringRegexp = (string) => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

const chars = ['&', '?', '!', '~', '@', '$', '%', '？', '～', '￥'];
const charsSorted = chars.slice().sort((a,b)=>b.length - a.length);

const oldJoined = chars.map(char => escapeStringRegexp(char)).join('|');
const newJoined = charsSorted.map(char => escapeStringRegexp(char)).join('|');

const oldRe = new RegExp(`(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${oldJoined}) `);
const newRe = new RegExp(`(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${newJoined})(?:\\s+|$)`);

const check = (str) => {
    const o = str.match(oldRe);
    const n = str.match(newRe);
    if (!o && !n) return;
    if ((o && o[2]) !== (n && n[2])) {
        console.log(`DIFF on '${str}': OLD => ${o?.[2]}, NEW => ${n?.[2]}`);
    } else {
        // console.log(`SAME on '${str}': ${o?.[2]}`);
    }
}

const spaces = [' ', '　', ''];
const tests = [];
chars.forEach(c => {
    spaces.forEach(s => {
        tests.push(`- ${c}${s}test`);
        tests.push(`1. ${c}${s}test`);
    });
});

tests.forEach(check);
console.log('Done diffing old vs new');
