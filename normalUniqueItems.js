// NORMAL UNIQUE ITEMS - NO SPECIAL ABILITIES
// Generated for every equipment slot across all level brackets

if (typeof require !== 'undefined') {
    require('./items.js');
}

const normalUniqueSharedItemPool = globalThis.itemPool;

const NORMAL_UNIQUE_ITEMS = {
    // ======================
    // LEVEL BRACKET 1-10
    // ======================
    'Apprentice Dagger': {
        name: 'Apprentice Dagger', type: 'weapon', equipSlot: 'weapon',
        atk: 15, crit: 5, attackSpeed: 10,
        levelReq: 3, desc: '+15 ATK, +5% CRIT, +10% Attack Speed', rarity: 'unique'
    },
    'Padded Leather Tunic': {
        name: 'Padded Leather Tunic', type: 'armor', equipSlot: 'armor',
        def: 10, hp: 25, healthRegen: 2,
        levelReq: 4, desc: '+10 DEF, +25 HP, +2 Health Regen', rarity: 'unique'
    },
    'Guardian Cap': {
        name: 'Guardian Cap', type: 'helmet', equipSlot: 'helmet',
        def: 6, dmgReduction: 5,
        levelReq: 5, desc: '+6 DEF, +5% Damage Reduction', rarity: 'unique'
    },
    'Traveler Boots': {
        name: 'Traveler Boots', type: 'boots', equipSlot: 'boots',
        def: 4, dodge: 8, moveSpeed: 10,
        levelReq: 6, desc: '+4 DEF, +8% Dodge, +10% Move Speed', rarity: 'unique'
    },
    'Training Gloves': {
        name: 'Training Gloves', type: 'gloves', equipSlot: 'gloves',
        atk: 3, atkPercent: 5,
        levelReq: 5, desc: '+3 ATK, +5% ATK', rarity: 'unique'
    },
    'Wanderer Cloak': {
        name: 'Wanderer Cloak', type: 'cape', equipSlot: 'cape',
        def: 5, magicFind: 15,
        levelReq: 7, desc: '+5 DEF, +15% Magic Find', rarity: 'unique'
    },
    'Ring of Promise': {
        name: 'Ring of Promise', type: 'ring', equipSlot: 'ring',
        atk: 2, def: 2, luck: 2,
        levelReq: 6, desc: '+2 ATK, +2 DEF, +2 Luck', rarity: 'unique'
    },
    'Wooden Talisman': {
        name: 'Wooden Talisman', type: 'amulet', equipSlot: 'amulet',
        def: 3, goldFind: 20,
        levelReq: 7, desc: '+3 DEF, +20% Gold Find', rarity: 'unique'
    },

    // ======================
    // LEVEL BRACKET 10-20
    // ======================
    'Steel Longsword': {
        name: 'Steel Longsword', type: 'weapon', equipSlot: 'weapon',
        atk: 42, crit: 10, critDmg: 15,
        levelReq: 12, desc: '+42 ATK, +10% CRIT, +15% Crit Damage', rarity: 'unique'
    },
    'Chainmail Hauberk': {
        name: 'Chainmail Hauberk', type: 'armor', equipSlot: 'armor',
        def: 32, hp: 75, hpPercent: 5,
        levelReq: 14, desc: '+32 DEF, +75 HP, +5% HP', rarity: 'unique'
    },
    'Knight Helm': {
        name: 'Knight Helm', type: 'helmet', equipSlot: 'helmet',
        def: 18, block: 10,
        levelReq: 15, desc: '+18 DEF, +10% Block Chance', rarity: 'unique'
    },
    'Reinforced Shield': {
        name: 'Reinforced Shield', type: 'shield', equipSlot: 'shield',
        def: 22, dmgReduction: 8,
        levelReq: 16, desc: '+22 DEF, +8% Damage Reduction', rarity: 'unique'
    },
    'Scout Treads': {
        name: 'Scout Treads', type: 'boots', equipSlot: 'boots',
        def: 12, dodge: 12,
        levelReq: 14, desc: '+12 DEF, +12% Dodge', rarity: 'unique'
    },
    'Warrior Gauntlets': {
        name: 'Warrior Gauntlets', type: 'gloves', equipSlot: 'gloves',
        atk: 15, attackSpeed: 8,
        levelReq: 15, desc: '+15 ATK, +8% Attack Speed', rarity: 'unique'
    },
    'Shadow Wrap': {
        name: 'Shadow Wrap', type: 'cape', equipSlot: 'cape',
        def: 15, crit: 7,
        levelReq: 17, desc: '+15 DEF, +7% CRIT', rarity: 'unique'
    },
    'Band of Strength': {
        name: 'Band of Strength', type: 'ring', equipSlot: 'ring',
        atk: 12, atkPercent: 8,
        levelReq: 16, desc: '+12 ATK, +8% ATK', rarity: 'unique'
    },
    'Amulet of Vitality': {
        name: 'Amulet of Vitality', type: 'amulet', equipSlot: 'amulet',
        hp: 50, healthRegen: 5,
        levelReq: 18, desc: '+50 HP, +5 Health Regen', rarity: 'unique'
    },

    // ======================
    // LEVEL BRACKET 20-35
    // ======================
    'Rune Forged Blade': {
        name: 'Rune Forged Blade', type: 'weapon', equipSlot: 'weapon',
        atk: 85, crit: 14, lifesteal: 6, armorPen: 12,
        levelReq: 24, desc: '+85 ATK, +14% CRIT, +6% Lifesteal, +12% Armor Pen', rarity: 'unique'
    },
    'Full Plate Armor': {
        name: 'Full Plate Armor', type: 'armor', equipSlot: 'armor',
        def: 70, hpPercent: 10, dmgReduction: 10,
        levelReq: 26, desc: '+70 DEF, +10% HP, +10% Damage Reduction', rarity: 'unique'
    },
    'Greathelm': {
        name: 'Greathelm', type: 'helmet', equipSlot: 'helmet',
        def: 38, defPercent: 10, block: 15,
        levelReq: 28, desc: '+38 DEF, +10% DEF, +15% Block', rarity: 'unique'
    },
    'Kite Shield': {
        name: 'Kite Shield', type: 'shield', equipSlot: 'shield',
        def: 45, block: 20, dmgReduction: 12,
        levelReq: 30, desc: '+45 DEF, +20% Block, +12% Damage Reduction', rarity: 'unique'
    },
    'Swift Striders': {
        name: 'Swift Striders', type: 'boots', equipSlot: 'boots',
        def: 28, dodge: 16, moveSpeed: 15,
        levelReq: 27, desc: '+28 DEF, +16% Dodge, +15% Move Speed', rarity: 'unique'
    },
    'Fury Grips': {
        name: 'Fury Grips', type: 'gloves', equipSlot: 'gloves',
        atk: 32, critDmg: 20, attackSpeed: 10,
        levelReq: 29, desc: '+32 ATK, +20% Crit Damage, +10% Attack Speed', rarity: 'unique'
    },
    'Dread Cloak': {
        name: 'Dread Cloak', type: 'cape', equipSlot: 'cape',
        def: 30, crit: 12, magicFind: 25,
        levelReq: 32, desc: '+30 DEF, +12% CRIT, +25% Magic Find', rarity: 'unique'
    },
    'Ring of Arcana': {
        name: 'Ring of Arcana', type: 'ring', equipSlot: 'ring',
        atk: 25, mp: 50, mpPercent: 10,
        levelReq: 31, desc: '+25 ATK, +50 MP, +10% MP', rarity: 'unique'
    },
    'Pendant of Protection': {
        name: 'Pendant of Protection', type: 'amulet', equipSlot: 'amulet',
        defPercent: 12, dmgReduction: 7,
        levelReq: 33, desc: '+12% DEF, +7% Damage Reduction', rarity: 'unique'
    },

    // ======================
    // LEVEL BRACKET 35-50
    // ======================
    'Obsidian Edge': {
        name: 'Obsidian Edge', type: 'weapon', equipSlot: 'weapon',
        atk: 165, crit: 18, critDmg: 28, armorPen: 20,
        levelReq: 40, desc: '+165 ATK, +18% CRIT, +28% Crit Damage, +20% Armor Pen', rarity: 'unique'
    },
    'Shadow Forge Plate': {
        name: 'Shadow Forge Plate', type: 'armor', equipSlot: 'armor',
        def: 130, hpPercent: 15, thorns: 20, dmgReduction: 15,
        levelReq: 43, desc: '+130 DEF, +15% HP, +20 Thorns, +15% Damage Reduction', rarity: 'unique'
    },
    'Crown of Dominion': {
        name: 'Crown of Dominion', type: 'helmet', equipSlot: 'helmet',
        def: 72, defPercent: 15, crit: 10, expBonus: 20,
        levelReq: 45, desc: '+72 DEF, +15% DEF, +10% CRIT, +20% Bonus EXP', rarity: 'unique'
    },
    'Aegis of Valor': {
        name: 'Aegis of Valor', type: 'shield', equipSlot: 'shield',
        def: 95, block: 25, dmgReduction: 18, reflect: 12,
        levelReq: 47, desc: '+95 DEF, +25% Block, +18% Damage Reduction, +12% Reflect', rarity: 'unique'
    },
    'Phantom Steps': {
        name: 'Phantom Steps', type: 'boots', equipSlot: 'boots',
        def: 55, dodge: 22, moveSpeed: 20,
        levelReq: 44, desc: '+55 DEF, +22% Dodge, +20% Move Speed', rarity: 'unique'
    },
    'Titan Fists': {
        name: 'Titan Fists', type: 'gloves', equipSlot: 'gloves',
        atk: 68, attackSpeed: 15, atkPercent: 12,
        levelReq: 46, desc: '+68 ATK, +15% Attack Speed, +12% ATK', rarity: 'unique'
    },
    'Wings of Night': {
        name: 'Wings of Night', type: 'cape', equipSlot: 'cape',
        def: 60, crit: 18, goldFind: 35,
        levelReq: 48, desc: '+60 DEF, +18% CRIT, +35% Gold Find', rarity: 'unique'
    },
    'Ring of the Void': {
        name: 'Ring of the Void', type: 'ring', equipSlot: 'ring',
        atkPercent: 18, magicPen: 18, critDmg: 22,
        levelReq: 49, desc: '+18% ATK, +18% Magic Pen, +22% Crit Damage', rarity: 'unique'
    },
    'Amulet of Eternity': {
        name: 'Amulet of Eternity', type: 'amulet', equipSlot: 'amulet',
        hpPercent: 12, healthRegen: 12, manaRegen: 8,
        levelReq: 47, desc: '+12% HP, +12 Health Regen, +8 Mana Regen', rarity: 'unique'
    },

    // ======================
    // LEVEL BRACKET 50-60
    // ======================
    'Doom Bringer': {
        name: 'Doom Bringer', type: 'weapon', equipSlot: 'weapon',
        atk: 275, crit: 22, critDmg: 35, armorPen: 28, lifesteal: 10,
        levelReq: 53, desc: '+275 ATK, +22% CRIT, +35% Crit Damage, +28% Armor Pen, +10% Lifesteal', rarity: 'unique'
    },
    'Impervious Armor': {
        name: 'Impervious Armor', type: 'armor', equipSlot: 'armor',
        def: 220, hpPercent: 20, dmgReduction: 22, thorns: 35,
        levelReq: 55, desc: '+220 DEF, +20% HP, +22% Damage Reduction, +35 Thorns', rarity: 'unique'
    },
    'Crown of the Ancients': {
        name: 'Crown of the Ancients', type: 'helmet', equipSlot: 'helmet',
        def: 115, defPercent: 20, expBonus: 30, magicFind: 40,
        levelReq: 57, desc: '+115 DEF, +20% DEF, +30% Bonus EXP, +40% Magic Find', rarity: 'unique'
    },
    'Eternal Ward': {
        name: 'Eternal Ward', type: 'shield', equipSlot: 'shield',
        def: 160, block: 30, dmgReduction: 25, reflect: 20,
        levelReq: 58, desc: '+160 DEF, +30% Block, +25% Damage Reduction, +20% Reflect', rarity: 'unique'
    },
    'Astride Treads': {
        name: 'Astride Treads', type: 'boots', equipSlot: 'boots',
        def: 95, dodge: 28, moveSpeed: 25, defPercent: 12,
        levelReq: 56, desc: '+95 DEF, +28% Dodge, +25% Move Speed, +12% DEF', rarity: 'unique'
    },
    'Godhand Gauntlets': {
        name: 'Godhand Gauntlets', type: 'gloves', equipSlot: 'gloves',
        atk: 110, attackSpeed: 20, atkPercent: 18, critDmg: 30,
        levelReq: 57, desc: '+110 ATK, +20% Attack Speed, +18% ATK, +30% Crit Damage', rarity: 'unique'
    },
    'Demonic Mantle': {
        name: 'Demonic Mantle', type: 'cape', equipSlot: 'cape',
        def: 90, crit: 22, critDmg: 25, goldFind: 50,
        levelReq: 59, desc: '+90 DEF, +22% CRIT, +25% Crit Damage, +50% Gold Find', rarity: 'unique'
    },
    'Ring of Supremacy': {
        name: 'Ring of Supremacy', type: 'ring', equipSlot: 'ring',
        atkPercent: 25, defPercent: 15, crit: 15, critDmg: 30,
        levelReq: 59, desc: '+25% ATK, +15% DEF, +15% CRIT, +30% Crit Damage', rarity: 'unique'
    },
    'Talisman of the Gods': {
        name: 'Talisman of the Gods', type: 'amulet', equipSlot: 'amulet',
        hpPercent: 18, mpPercent: 18, healthRegen: 18, manaRegen: 12,
        levelReq: 60, desc: '+18% HP, +18% MP, +18 Health Regen, +12 Mana Regen', rarity: 'unique'
    }
};

// Add all normal unique items to main item pool
if (normalUniqueSharedItemPool) {
    Object.keys(NORMAL_UNIQUE_ITEMS).forEach(key => {
        normalUniqueSharedItemPool[key] = NORMAL_UNIQUE_ITEMS[key];
    });
}

globalThis.NORMAL_UNIQUE_ITEMS = NORMAL_UNIQUE_ITEMS;