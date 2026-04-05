// UBER UNIQUE ITEMS - ONE PER LEVEL BRACKET
// Better stats than legendary items, each with unique special abilities

if (typeof require !== 'undefined') {
    require('./items.js');
}

const uberUniqueSharedItemPool = globalThis.itemPool;

const UBER_UNIQUE_SET = [
    // LEVEL BRACKET 1-10
    {
        name: "Novice Edge",
        type: 'weapon',
        equipSlot: 'weapon',
        atk: 25,
        crit: 8,
        lifesteal: 5,
        levelReq: 5,
        desc: '+25 ATK, +8% CRIT, +5% Lifesteal | Special: Double experience from all kills below level 10',
        rarity: 'unique',
        specialAbility: 'low_level_exp_boost'
    },

    // LEVEL BRACKET 10-20
    {
        name: 'Ironclad Band',
        type: 'ring',
        equipSlot: 'ring',
        def: 18,
        atk: 15,
        dmgReduction: 10,
        levelReq: 15,
        desc: '+18 DEF, +15 ATK, +10% Damage Reduction | Special: Cannot be one-shot killed',
        rarity: 'uber_unique',
        specialAbility: 'anti_oneshot',
        uberUnique: true
    },

    // LEVEL BRACKET 20-35
    {
        name: 'Venomguard Breastplate',
        type: 'armor',
        equipSlot: 'armor',
        def: 75,
        thorns: 25,
        poisonResist: 100,
        levelReq: 28,
        desc: '+75 DEF, +25 Thorns, Poison Immune | Special: Reflect 25% damage taken back to attacker',
        rarity: 'uber_unique',
        specialAbility: 'damage_reflect',
        uberUnique: true
    },

    // LEVEL BRACKET 35-50
    {
        name: 'Voidstalker Hood',
        type: 'helmet',
        equipSlot: 'helmet',
        def: 48,
        crit: 18,
        dodge: 20,
        magicFind: 50,
        levelReq: 42,
        desc: '+48 DEF, +18% CRIT, +20% Dodge, +50% Magic Find | Special: Every 4th attack hits 3 times instantly',
        rarity: 'uber_unique',
        specialAbility: 'triple_attack_every_4',
        uberUnique: true
    },

    // LEVEL BRACKET 50-60
    {
        name: 'Worldeater Gauntlets',
        type: 'gloves',
        equipSlot: 'gloves',
        atk: 120,
        def: 65,
        attackSpeed: 25,
        armorPen: 35,
        levelReq: 55,
        desc: '+120 ATK, +65 DEF, +25% Attack Speed, +35% Armor Penetration | Special: Every 3rd attack ignores 100% defense',
        rarity: 'uber_unique',
        specialAbility: 'true_damage_every_3',
        uberUnique: true
    }
];

// Add these to item pool
if (uberUniqueSharedItemPool) {
    UBER_UNIQUE_SET.forEach(item => {
        uberUniqueSharedItemPool[item.name] = item;
    });
}

globalThis.UBER_UNIQUE_SET = UBER_UNIQUE_SET;