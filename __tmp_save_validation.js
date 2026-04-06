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

const uniqueEntry = Object.entries(context.itemPool).find(([, item]) => item && item.rarity === 'unique');
const uberUniqueEntry = Object.entries(context.itemPool).find(([, item]) => item && (item.rarity === 'uber_unique' || item.uberUnique));

if (!uniqueEntry || !uberUniqueEntry) {
    throw new Error('Unable to locate unique and uber unique test items');
}

const [uniqueBaseName, uniqueBaseItem] = uniqueEntry;
const [uberBaseName, uberBaseItem] = uberUniqueEntry;
const amuletBaseItem = context.itemPool['Amulet of Vitality'];

if (!amuletBaseItem) {
    throw new Error('Unable to locate Amulet of Vitality test item');
}

function simulateMergeFromBase(baseItem, levels) {
    let current = { ...baseItem, name: baseItem.name, mergeLevel: 0 };
    for (let i = 0; i < levels; i++) {
        current = context.mergeUberUniqueItems(current, { ...baseItem, name: baseItem.name, mergeLevel: 0 });
    }
    return current;
}

const expectedLegacyUnique = simulateMergeFromBase(uniqueBaseItem, 2);
const expectedLegacyUber = simulateMergeFromBase(uberBaseItem, 1);
const expectedAmulet = simulateMergeFromBase(amuletBaseItem, 2);

const oldSchemaSave = {
    v: 2,
    t: Date.now(),
    p: {},
    i: [147, encodedMerged]
};
const restoredOld = context.restoreGameStateFromSaveData(JSON.stringify(oldSchemaSave));

const oldCompactNameOnlySave = {
    v: 2,
    t: Date.now(),
    p: {},
    i: [
        [uniqueBaseName, { n: `${uniqueBaseName} +2` }],
        [uberBaseName, { n: `${uberBaseName} +1` }]
    ]
};
const restoredCompactNameOnly = context.restoreGameStateFromSaveData(JSON.stringify(oldCompactNameOnlySave));
const compactRecoveredItems = context.__gameState.inventory || [];
const compactRecoveredUnique = compactRecoveredItems.find(item => item?.name === `${uniqueBaseName} +2`);
const compactRecoveredUber = compactRecoveredItems.find(item => item?.name === `${uberBaseName} +1`);

const legacyNameOnlySave = {
    player: {},
    inventory: [
        { ...uniqueBaseItem, name: `${uniqueBaseName} +2` },
        { ...uberBaseItem, name: `${uberBaseName} +1` }
    ],
    equipment: {}
};
const restoredLegacyNameOnly = context.restoreGameStateFromSaveData(JSON.stringify(legacyNameOnlySave));
const legacyRecoveredItems = context.__gameState.inventory || [];
const legacyRecoveredUnique = legacyRecoveredItems.find(item => item?.name === `${uniqueBaseName} +2`);
const legacyRecoveredUber = legacyRecoveredItems.find(item => item?.name === `${uberBaseName} +1`);

const amuletCompactNameOnlySave = {
    v: 2,
    t: Date.now(),
    p: {},
    i: [['Amulet of Vitality', { n: 'Amulet of Vitality +2' }]]
};
const restoredAmuletCompact = context.restoreGameStateFromSaveData(JSON.stringify(amuletCompactNameOnlySave));
const amuletCompactRecovered = (context.__gameState.inventory || []).find(item => item?.name === 'Amulet of Vitality +2');

const amuletLegacyNameOnlySave = {
    player: {},
    inventory: [
        { ...amuletBaseItem, name: 'Amulet of Vitality +2' }
    ],
    equipment: {}
};
const restoredAmuletLegacy = context.restoreGameStateFromSaveData(JSON.stringify(amuletLegacyNameOnlySave));
const amuletLegacyRecovered = (context.__gameState.inventory || []).find(item => item?.name === 'Amulet of Vitality +2');

console.log(JSON.stringify({
    encodedSample,
    decodedSampleName: decodedSample?.name,
    decodedSampleQty: decodedSample?.qty || 1,
    decodedLegacyNumericName: decodedLegacyNumeric?.name,
    encodedMerged,
    decodedMergedName: decodedMerged?.name,
    decodedMergedMergeLevel: decodedMerged?.mergeLevel,
    restoredOld,
    restoredInventoryNames: (context.__gameState.inventory || []).map(item => item?.name),
    compactNameOnlyRestore: {
        restoredCompactNameOnly,
        uniqueName: compactRecoveredUnique?.name,
        uniqueMergeLevel: compactRecoveredUnique?.mergeLevel,
        uniqueAtk: compactRecoveredUnique?.atk,
        uniqueExpectedAtk: expectedLegacyUnique?.atk,
        uberName: compactRecoveredUber?.name,
        uberMergeLevel: compactRecoveredUber?.mergeLevel,
        uberDef: compactRecoveredUber?.def,
        uberExpectedDef: expectedLegacyUber?.def
    },
    legacyNameOnlyRestore: {
        restoredLegacyNameOnly,
        uniqueName: legacyRecoveredUnique?.name,
        uniqueMergeLevel: legacyRecoveredUnique?.mergeLevel,
        uniqueAtk: legacyRecoveredUnique?.atk,
        uniqueExpectedAtk: expectedLegacyUnique?.atk,
        uberName: legacyRecoveredUber?.name,
        uberMergeLevel: legacyRecoveredUber?.mergeLevel,
        uberDef: legacyRecoveredUber?.def,
        uberExpectedDef: expectedLegacyUber?.def
    },
    amuletCompactRestore: {
        restoredAmuletCompact,
        name: amuletCompactRecovered?.name,
        mergeLevel: amuletCompactRecovered?.mergeLevel,
        hp: amuletCompactRecovered?.hp,
        expectedHp: expectedAmulet?.hp,
        healthRegen: amuletCompactRecovered?.healthRegen,
        expectedHealthRegen: expectedAmulet?.healthRegen,
        desc: amuletCompactRecovered?.desc,
        expectedDesc: expectedAmulet?.desc
    },
    amuletLegacyRestore: {
        restoredAmuletLegacy,
        name: amuletLegacyRecovered?.name,
        mergeLevel: amuletLegacyRecovered?.mergeLevel,
        hp: amuletLegacyRecovered?.hp,
        expectedHp: expectedAmulet?.hp,
        healthRegen: amuletLegacyRecovered?.healthRegen,
        expectedHealthRegen: expectedAmulet?.healthRegen,
        desc: amuletLegacyRecovered?.desc,
        expectedDesc: expectedAmulet?.desc
    }
}, null, 2));