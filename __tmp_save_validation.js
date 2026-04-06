const fs = require('fs');
const vm = require('vm');

const noop = () => {};
const fakeElement = () => ({
    style: {},
    classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
    innerHTML: '',
    textContent: '',
    value: '',
    disabled: false,
    title: '',
    appendChild: noop,
    removeChild: noop,
    insertBefore: noop,
    remove: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: noop,
    click: noop,
    scrollTop: 0,
    scrollHeight: 0,
    parentNode: null,
    children: []
});

const documentStub = {
    getElementById: () => fakeElement(),
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => fakeElement(),
    addEventListener: noop,
    body: fakeElement()
};

const localStorageStub = {
    store: Object.create(null),
    getItem(key) { return this.store[key] ?? null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; }
};

const context = {
    console,
    Math,
    Date,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    parseInt,
    parseFloat,
    isNaN,
    encodeURIComponent,
    decodeURIComponent,
    btoa: str => Buffer.from(str, 'binary').toString('base64'),
    atob: str => Buffer.from(str, 'base64').toString('binary'),
    setTimeout: () => 0,
    clearTimeout: noop,
    setInterval: () => 0,
    clearInterval: noop,
    confirm: () => true,
    alert: noop,
    Blob: function() {},
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL: noop },
    FileReader: function() { this.readAsText = noop; },
    indexedDB: undefined,
    localStorage: localStorageStub,
    location: { reload: noop },
    document: documentStub,
    window: null
};
context.window = context;
vm.createContext(context);

for (const file of ['items.js', 'uberUniqueItems.js', 'normalUniqueItems.js', 'level55UberUniques.js', 'enemies.js', 'uberUniqueMergeSystem.js']) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
if (!scriptMatch) throw new Error('Unable to locate inline script');
const inlineScript = scriptMatch[1].replace(/\binit\(\);\s*$/, '');
vm.runInContext(inlineScript, context, { filename: 'index.inline.js' });
vm.runInContext('globalThis.__gameState = gameState;', context, { filename: 'index.inline.export.js' });

const sampleItem = {
    ...context.itemPool['Rusty Sword'],
    name: 'Rusty Sword',
    qty: 2
};
const mergedItem = {
    ...context.itemPool['Reaper Scythe'],
    name: 'Reaper Scythe +2',
    mergeLevel: 2,
    qty: 1
};

const encodedSample = context.encodeItemForSave(sampleItem);
const decodedSample = context.decodeItemForSave(encodedSample);
const decodedLegacyNumeric = context.decodeItemForSave(147);
const encodedMerged = context.encodeItemForSave(mergedItem);
const decodedMerged = context.decodeItemForSave(encodedMerged);

const oldSchemaSave = {
    v: 2,
    t: Date.now(),
    p: {},
    i: [147, encodedMerged]
};
const restoredOld = context.restoreGameStateFromSaveData(JSON.stringify(oldSchemaSave));

console.log(JSON.stringify({
    encodedSample,
    decodedSampleName: decodedSample?.name,
    decodedSampleQty: decodedSample?.qty || 1,
    decodedLegacyNumericName: decodedLegacyNumeric?.name,
    encodedMerged,
    decodedMergedName: decodedMerged?.name,
    decodedMergedMergeLevel: decodedMerged?.mergeLevel,
    restoredOld,
    restoredInventoryNames: (context.__gameState.inventory || []).map(item => item?.name)
}, null, 2));