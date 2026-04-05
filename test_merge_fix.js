const { mergeUberUniqueItems } = require('./uberUniqueMergeSystem.js');

// Create test item
const testItem = {
    name: "Test Uber Sword",
    rarity: "uber_unique",
    atk: 100,
    def: 100,
    crit: 10,
    critDmg: 50,
    mergeLevel: 0,
    desc: "Test item"
};

console.log("ORIGINAL ITEM:");
console.log(`ATK: ${testItem.atk}`);
console.log(`DEF: ${testItem.def}`);
console.log(`Crit: ${testItem.crit}`);
console.log(`Crit Dmg: ${testItem.critDmg}\n`);

const mergedItem = mergeUberUniqueItems(testItem, testItem);

console.log("MERGED ITEM (+1):");
console.log(`ATK: ${mergedItem.atk} (Expected: 150, +50%)`);
console.log(`DEF: ${mergedItem.def} (Expected: 150, +50%)`);
console.log(`Crit: ${mergedItem.crit} (Expected: 11, +10%)`);
console.log(`Crit Dmg: ${mergedItem.critDmg} (Expected: 60, +20%)`);
console.log(`Merge Level: ${mergedItem.mergeLevel}`);
console.log(`Name: ${mergedItem.name}`);

// Verify stats are correct
const atkCorrect = mergedItem.atk === 150;
const defCorrect = mergedItem.def === 150;

console.log(`\n✅ ATK 50% increase working: ${atkCorrect ? 'YES' : 'NO'}`);
console.log(`✅ DEF 50% increase working: ${defCorrect ? 'YES' : 'NO'}`);

if (atkCorrect && defCorrect) {
    console.log("\n✓ ALL TESTS PASSED - Merge function now correctly applies +50% ATK and DEF");
} else {
    console.log("\n✗ TEST FAILED");
}