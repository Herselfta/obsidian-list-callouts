const DEFAULT_SETTINGS = [
  { char: '&', color: '1' },
  { char: '?', color: '2' },
  { char: '？', color: 'new' }, // NEW
  { char: '!', color: '3' },
];

const loadedSettings = [
  { char: '&', color: '1-mod' },
  { char: '?', color: '2-mod' },
  { char: '!', color: '3-mod' },
];

const modifiedBuiltins = loadedSettings.filter(c => !c.custom);

const settings = DEFAULT_SETTINGS.map((s, i) => {
    return Object.assign({}, s, modifiedBuiltins ? modifiedBuiltins[i] : {});
});

console.log(settings);
