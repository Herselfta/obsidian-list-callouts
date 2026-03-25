import escapeStringRegexp from 'escape-string-regexp';

const settings = [
  { char: '?', color: 'red' },
  { char: '？', color: 'blue' }
];

const config = {
  callouts: settings.reduce((record, curr) => {
    record[curr.char] = curr;
    return record
  }, {}),
  re: new RegExp(
    `(^\\s*[-*+](?: \\[.\\])? |^\\s*\\d+[\\.\\)](?: \\[.\\])? )(${
      settings
        .map(callout => callout.char)
        .sort((a, b) => b.length - a.length)
        .map(char => escapeStringRegexp(char))
        .join('|')
    })(?:\\s+|$)`
  )
};

console.log(config.re);

const texts = [
  "- ? test",
  "- ？ test",
  "- ？\u3000test",
  "- ？",
];

texts.forEach(text => {
  const match = text.match(config.re);
  console.log(`Text: "${text}"`, match ? `MATCH: [1]="${match[1]}" [2]="${match[2]}"` : "FAIL");
});
