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
const atkCritEntry = Object.entries(context.itemPool).find(([, item]) => item && item.rarity === 'unique' && typeof item.atk === 'number' && typeof item.crit === 'number');
const defEntry = Object.entries(context.itemPool).find(([, item]) => item && item.rarity === 'unique' && typeof item.def === 'number');
const critEntry = Object.entries(context.itemPool).find(([, item]) => item && item.rarity === 'unique' && typeof item.crit === 'number');

if (!amuletBaseItem) {
    throw new Error('Unable to locate Amulet of Vitality test item');
}

if (!atkCritEntry || !defEntry || !critEntry) {
    throw new Error('Unable to locate atk/def/crit validation items');
}

const [atkCritBaseName, atkCritBaseItem] = atkCritEntry;
const [defBaseName, defBaseItem] = defEntry;
const [critBaseName, critBaseItem] = critEntry;

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
const expectedAtkCrit = simulateMergeFromBase(atkCritBaseItem, 2);
const expectedDef = simulateMergeFromBase(defBaseItem, 2);
const expectedCrit = simulateMergeFromBase(critBaseItem, 2);

function restoreCompactNameOnlyItem(baseName, mergedName) {
    const save = {
        v: 2,
        t: Date.now(),
        p: {},
        i: [[baseName, { n: mergedName }]]
    };
    context.restoreGameStateFromSaveData(JSON.stringify(save));
    return (context.__gameState.inventory || []).find(item => item?.name === mergedName) || null;
}

function restoreLegacyNameOnlyItem(baseItem, mergedName) {
    const save = {
        player: {},
        inventory: [{ ...baseItem, name: mergedName }],
        equipment: {}
    };
    context.restoreGameStateFromSaveData(JSON.stringify(save));
    return (context.__gameState.inventory || []).find(item => item?.name === mergedName) || null;
}

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

const atkCritCompactRecovered = restoreCompactNameOnlyItem(atkCritBaseName, `${atkCritBaseName} +2`);
const atkCritLegacyRecovered = restoreLegacyNameOnlyItem(atkCritBaseItem, `${atkCritBaseName} +2`);
const defCompactRecovered = restoreCompactNameOnlyItem(defBaseName, `${defBaseName} +2`);
const defLegacyRecovered = restoreLegacyNameOnlyItem(defBaseItem, `${defBaseName} +2`);
const critCompactRecovered = restoreCompactNameOnlyItem(critBaseName, `${critBaseName} +2`);
const critLegacyRecovered = restoreLegacyNameOnlyItem(critBaseItem, `${critBaseName} +2`);

const normalShieldBaseItem = context.itemPool['Tower Shield'] || Object.values(context.itemPool).find(item => item && item.type === 'shield');
const uniqueShieldBaseItem = context.itemPool['Aegis of Valor'] || Object.values(context.itemPool).find(item => item && item.type === 'shield' && item.rarity === 'unique');
const scrollBaseItem = Object.values(context.scrollPool || {})[0];

if (!normalShieldBaseItem || !uniqueShieldBaseItem || !scrollBaseItem) {
    throw new Error('Unable to locate normal shield, unique shield, or scroll validation items');
}

function roundTripState({ inventory = [], equipment = {}, equippedScrolls = [] }) {
    context.__gameState.inventory = inventory.map(item => ({ ...item }));
    context.__gameState.equipment = {
        ...context.__gameState.equipment,
        weapon: null,
        armor: null,
        helmet: null,
        shield: null,
        ring: null,
        amulet: null,
        boots: null,
        gloves: null,
        cape: null,
        ...equipment
    };
    context.__gameState.equippedScrolls = equippedScrolls.map(item => item ? ({ ...item }) : null);
    const save = context.buildCompactSaveData();
    const hydrated = context.decodeCompactSaveData(save);
    return { save, hydrated };
}

const mergedUniqueShield = simulateMergeFromBase(uniqueShieldBaseItem, 2);
const exactRoundTripNormalShield = roundTripState({
    inventory: [
        { ...amuletBaseItem, name: 'Amulet of Vitality +2', mergeLevel: 2, hp: expectedAmulet.hp, healthRegen: expectedAmulet.healthRegen, desc: expectedAmulet.desc, qty: 1 },
        { ...context.itemPool['Rusty Sword'], qty: 2 }
    ],
    equipment: {
        weapon: { ...atkCritBaseItem, name: `${atkCritBaseName} +2`, mergeLevel: 2, atk: expectedAtkCrit.atk, crit: expectedAtkCrit.crit, desc: expectedAtkCrit.desc, equipped: true },
        shield: { ...normalShieldBaseItem, equipped: true }
    },
    equippedScrolls: [{ ...scrollBaseItem, type: 'scroll' }, null, null, null, null]
});

const exactRoundTripMergedShield = roundTripState({
    equipment: {
        shield: { ...mergedUniqueShield, equipped: true }
    }
});

context.__gameState.player = { ...context.__gameState.player, atk: 10, def: 5, baseAtk: 10, baseDef: 5 };
context.__gameState.equipment.weapon = { ...expectedAtkCrit, equipped: true };
context.__gameState.equipment.shield = { ...mergedUniqueShield, equipped: true };
context.recalculateAllPlayerStats();
const globalAtkTotal = context.getTotalAtk();
const globalDefTotal = context.getTotalDef();
const expectedGlobalAtk = Math.floor((10 + (atkCritBaseItem.atk || 0)) * Math.pow(1.5, 2));
const expectedGlobalDef = Math.floor((5 + (uniqueShieldBaseItem.def || 0)) * Math.pow(1.5, 2));

const formulaWeaponBase = atkCritBaseItem;
context.__gameState.player = {
    ...context.__gameState.player,
    atk: 100,
    def: 5,
    baseAtk: 100,
    baseDef: 5,
    baseCrit: 0
};
context.__gameState.equipment.weapon = {
    ...formulaWeaponBase,
    name: `${atkCritBaseName} +1`,
    mergeLevel: 1,
    atk: Math.ceil((formulaWeaponBase.atk || 0) * 1.5),
    atkPercent: 10,
    equipped: true,
    desc: `${formulaWeaponBase.desc || ''}\n✨ Merged 1 times | ATK +50%, DEF +50% | All other stats increased`
};
context.__gameState.equipment.shield = null;
context.recalculateAllPlayerStats();
const formulaScenarioAtk = context.getTotalAtk();
const expectedFormulaScenarioAtk = Math.floor((100 + (formulaWeaponBase.atk || 0)) * 1.1 * 1.5);

context.__gameState.player = {
    ...context.__gameState.player,
    atk: 10,
    def: 5,
    baseAtk: 10,
    baseDef: 5,
    baseCrit: 0
};
context.__gameState.equipment.weapon = null;
context.__gameState.equipment.shield = null;
context.__gameState.equipment.armor = null;
context.__gameState.equipment.helmet = null;
context.__gameState.equipment.ring = null;
context.__gameState.equipment.boots = null;
context.__gameState.equipment.gloves = null;
context.__gameState.equipment.cape = null;
context.__gameState.equipment.amulet = { ...expectedAmulet, equipped: true };
context.recalculateAllPlayerStats();
const amuletGlobalAtkTotal = context.getTotalAtk();
const amuletGlobalDefTotal = context.getTotalDef();
const expectedAmuletGlobalAtk = Math.floor(10 * Math.pow(1.5, 2));
const expectedAmuletGlobalDef = Math.floor(5 * Math.pow(1.5, 2));

context.__gameState.player = {
    ...context.__gameState.player,
    level: 19,
    atk: 10,
    def: 5,
    baseAtk: 10,
    baseDef: 5,
    hp: 100,
    maxHp: 100,
    baseMaxHp: 100,
    mp: 50,
    maxMp: 50,
    baseMaxMp: 50
};
context.__gameState.inventory = [{ ...expectedAmulet, qty: 1, equipped: false }];
context.__gameState.equipment = {
    weapon: null,
    armor: null,
    helmet: null,
    shield: null,
    ring: null,
    amulet: null,
    boots: null,
    gloves: null,
    cape: null
};
context.equipItem(0);
const amuletEquipAtk = context.getTotalAtk();
const amuletEquipDef = context.getTotalDef();
context.unequipItem('amulet');
const amuletUnequipAtk = context.getTotalAtk();
const amuletUnequipDef = context.getTotalDef();

function summarizeItem(item) {
    if (!item) return null;
    return {
        name: item.name,
        type: item.type,
        equipSlot: item.equipSlot,
        rarity: item.rarity,
        mergeLevel: item.mergeLevel || 0,
        qty: item.qty || 1,
        atk: item.atk,
        def: item.def,
        crit: item.crit,
        hp: item.hp,
        healthRegen: item.healthRegen,
        desc: item.desc,
        instanceId: item.instanceId || null
    };
}

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
    },
    statBonusChecks: {
        atk: {
            item: atkCritBaseName,
            compactAtk: atkCritCompactRecovered?.atk,
            legacyAtk: atkCritLegacyRecovered?.atk,
            expectedAtk: expectedAtkCrit?.atk,
            compactCrit: atkCritCompactRecovered?.crit,
            legacyCrit: atkCritLegacyRecovered?.crit,
            expectedCrit: expectedAtkCrit?.crit
        },
        def: {
            item: defBaseName,
            compactDef: defCompactRecovered?.def,
            legacyDef: defLegacyRecovered?.def,
            expectedDef: expectedDef?.def
        },
        crit: {
            item: critBaseName,
            compactCrit: critCompactRecovered?.crit,
            legacyCrit: critLegacyRecovered?.crit,
            expectedCrit: expectedCrit?.crit
        }
    },
    exactRoundTrip: {
        normalShield: {
            savedShield: summarizeItem(exactRoundTripNormalShield.save.xe ? context.decodeExactItemFromSave(exactRoundTripNormalShield.save.xe.s) : null),
            loadedShield: summarizeItem(exactRoundTripNormalShield.hydrated.equipment.shield),
            savedWeapon: summarizeItem(exactRoundTripNormalShield.save.xe ? context.decodeExactItemFromSave(exactRoundTripNormalShield.save.xe.w) : null),
            loadedWeapon: summarizeItem(exactRoundTripNormalShield.hydrated.equipment.weapon),
            savedInventory: (exactRoundTripNormalShield.save.ix || []).map(entry => summarizeItem(entry ? context.decodeExactItemFromSave(entry) : null)).filter(Boolean),
            loadedInventory: (exactRoundTripNormalShield.hydrated.inventory || []).map(summarizeItem),
            savedScrolls: (exactRoundTripNormalShield.save.xes || []).map(entry => summarizeItem(entry ? context.decodeExactItemFromSave(entry) : null)),
            loadedScrolls: (exactRoundTripNormalShield.hydrated.equippedScrolls || []).map(summarizeItem)
        },
        mergedUniqueShield: {
            savedShield: summarizeItem(exactRoundTripMergedShield.save.xe ? context.decodeExactItemFromSave(exactRoundTripMergedShield.save.xe.s) : null),
            loadedShield: summarizeItem(exactRoundTripMergedShield.hydrated.equipment.shield)
        }
    },
    globalMergeTotals: {
        atkItem: atkCritBaseName,
        totalAtk: globalAtkTotal,
        expectedTotalAtk: expectedGlobalAtk,
        defItem: uniqueShieldBaseItem.name,
        totalDef: globalDefTotal,
        expectedTotalDef: expectedGlobalDef
    },
    formulaScenario: {
        playerBaseAtk: 100,
        item: atkCritBaseName,
        itemBaseAtk: formulaWeaponBase.atk || 0,
        itemAtkPercent: 10,
        mergeLevel: 1,
        totalAtk: formulaScenarioAtk,
        expectedTotalAtk: expectedFormulaScenarioAtk
    },
    amuletGlobalMergeTotals: {
        item: 'Amulet of Vitality',
        mergeLevel: 2,
        totalAtk: amuletGlobalAtkTotal,
        expectedTotalAtk: expectedAmuletGlobalAtk,
        totalDef: amuletGlobalDefTotal,
        expectedTotalDef: expectedAmuletGlobalDef
    },
    amuletEquipFlow: {
        afterEquipAtk: amuletEquipAtk,
        expectedAfterEquipAtk: expectedAmuletGlobalAtk,
        afterEquipDef: amuletEquipDef,
        expectedAfterEquipDef: expectedAmuletGlobalDef,
        afterUnequipAtk: amuletUnequipAtk,
        expectedAfterUnequipAtk: 10,
        afterUnequipDef: amuletUnequipDef,
        expectedAfterUnequipDef: 5
    }
}, null, 2));