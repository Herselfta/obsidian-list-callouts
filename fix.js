const fs = require('fs');

try {
// Fix main.ts
let mainSrc = fs.readFileSync('src/main.ts', 'utf8');
mainSrc = mainSrc.replace(
/this\.settings[\s\n]*\.map\(callout => callout\.char\)[\s\n]*\.sort\(\(a, b\) => b\.length - a\.length\)[\s\n]*\.map\(char => escapeStringRegexp\(char\)\)[\s\n]*\.join\('\|'\)/g,
`this.settings
            .map(callout => (callout && callout.char) || '')
            .filter(char => typeof char === 'string' && char.trim().length > 0)
            .sort((a, b) => b.length - a.length)
            .map(char => escapeStringRegexp(char))
            .join('|')`
);
fs.writeFileSync('src/main.ts', mainSrc);

// Fix postProcessor.ts
let ppSrc = fs.readFileSync('src/postProcessor.ts', 'utf8');
ppSrc = ppSrc.replace(/f\.append\(text\.slice\(callout\.char\.length\)\);/g, `f.append(text.slice(match[0].length));`);
fs.writeFileSync('src/postProcessor.ts', ppSrc);

console.log("Fixes applied successfully.");
} catch(e) {
  console.error("Error applying fix:", e);
}
