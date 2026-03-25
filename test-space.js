const escapeStringRegexp = (string) => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

const chars = ['&', '?', '!', '~', '@', '$', '%', '？', '～', '￥'];
const charsSorted = chars.slice().sort((a,b)=>b.length - a.length);

const oldJoined = chars.map(char => escapeStringRegexp(char)).join('|');
const newJoined = charsSorted.map(char => escapeStringRegexp(char)).join('|');

const oldRe = new RegExp(`(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${oldJoined}) `);
const newRe = new RegExp(`(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${newJoined})(?:\\s+|$)`);

const o = '- ？ test'.match(oldRe);
const n = '- ？ test'.match(newRe);
console.log('OLD matched:', Boolean(o));
console.log('NEW matched:', Boolean(n));
console.log('OLD callout:', o ? o[2] : null);
console.log('NEW callout:', n ? n[2] : null);

console.log('OLD 0:', o ? o[0] : null);
console.log('NEW 0:', n ? n[0] : null);

console.log('OLD 1 length:', o ? o[1].length : null);
console.log('NEW 1 length:', n ? n[1].length : null);
