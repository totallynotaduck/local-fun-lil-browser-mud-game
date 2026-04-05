// LEVEL 55 UBER UNIQUE SET - BALANCE BREAKING ITEMS (NO FULL INVINCIBILITY)
// 8 Uber Uniques for every equipment slot - level 55 requirement
// All items are completely game breaking but do NOT make user invincible

require('./items.js');

const LEVEL_55_UBER_UNIQUES = {
    // ========== WEAPON ==========
    'World Devourer': {
        name: 'World Devourer', type: 'weapon', equipSlot: 'weapon',
        atk: 999, crit: 40, critDmg: 100, armorPen: 60, lifesteal: 25,
        levelReq: 55,
        desc: '+999 ATK, +40% CRIT, +100% Crit Damage, +60% Armor Pen, +25% Lifesteal | ✨ Special: Every attack heals you for 100% of damage dealt',
        rarity: 'uber_unique', specialAbility: 'full_lifesteal', uberUnique: true
    },

    // ========== ARMOR ==========
    'Armor of a Thousand Lies': {
        name: 'Armor of a Thousand Lies', type: 'armor', equipSlot: 'armor',
        def: 777, hpPercent: 75, dmgReduction: 40, thorns: 60,
        levelReq: 55,
        desc: '+777 DEF, +75% HP, +40% Damage Reduction, +60 Thorns | ✨ Special: All damage taken is reduced by 75% after all other calculations',
        rarity: 'uber_unique', specialAbility: 'damage_reduction_75', uberUnique: true
    },

    // ========== HELMET ==========
    'Crown of Endless Sight': {
        name: 'Crown of Endless Sight', type: 'helmet', equipSlot: 'helmet',
        def: 300, magicFind: 150, goldFind: 150, expBonus: 100, crit: 25,
        levelReq: 55,
        desc: '+300 DEF, +150% Magic Find, +150% Gold Find, +100% Bonus EXP, +25% CRIT | ✨ Special: Every enemy killed drops an extra item guaranteed',
        rarity: 'uber_unique', specialAbility: 'guaranteed_extra_drop', uberUnique: true
    },

    // ========== SHIELD ==========
    'Barrier of Forgotten Kings': {
        name: 'Barrier of Forgotten Kings', type: 'shield', equipSlot: 'shield',
        def: 555, block: 45, dmgReduction: 30, reflect: 35,
        levelReq: 55,
        desc: '+555 DEF, +45% Block, +30% Damage Reduction, +35% Damage Reflect | ✨ Special: On successful block, heal for 100% of blocked damage',
        rarity: 'uber_unique', specialAbility: 'heal_on_block', uberUnique: true
    },

    // ========== BOOTS ==========
    'Steps of the Void Walker': {
        name: 'Steps of the Void Walker', type: 'boots', equipSlot: 'boots',
        def: 222, dodge: 60, moveSpeed: 50, attackSpeed: 30,
        levelReq: 55,
        desc: '+222 DEF, +60% Dodge, +50% Move Speed, +30% Attack Speed | ✨ Special: You can escape any encounter with 100% success and full rewards',
        rarity: 'uber_unique', specialAbility: '100_escape_success', uberUnique: true
    },

    // ========== GLOVES ==========
    'Fists of the Unbroken': {
        name: 'Fists of the Unbroken', type: 'gloves', equipSlot: 'gloves',
        atk: 350, attackSpeed: 45, atkPercent: 50, critDmg: 60,
        levelReq: 55,
        desc: '+350 ATK, +45% Attack Speed, +50% ATK, +60% Crit Damage | ✨ Special: Every 4th attack hits 3 times instantly',
        rarity: 'uber_unique', specialAbility: 'triple_attack_every_4', uberUnique: true
    },

    // ========== RING ==========
    'Band of Absolute Dominance': {
        name: 'Band of Absolute Dominance', type: 'ring', equipSlot: 'ring',
        atkPercent: 60, defPercent: 60, crit: 30, critDmg: 75,
        levelReq: 55,
        desc: '+60% ATK, +60% DEF, +30% CRIT, +75% Crit Damage | ✨ Special: Critical hits cannot be resisted and always land',
        rarity: 'uber_unique', specialAbility: 'crit_guaranteed', uberUnique: true
    },

    // ========== AMULET ==========
    'Talisman of the Dying God': {
        name: 'Talisman of the Dying God', type: 'amulet', equipSlot: 'amulet',
        hpPercent: 100, healthRegen: 50, manaRegen: 25, atkPercent: 25, defPercent: 25,
        levelReq: 55,
        desc: '+100% HP, +50 Health Regen, +25 Mana Regen, +25% ATK, +25% DEF | ✨ Special: When below 10% HP all damage is doubled',
        rarity: 'uber_unique', specialAbility: 'low_hp_damage_buff', uberUnique: true
    }
};

// Add all Level 55 Uber Uniques to item pool
Object.keys(LEVEL_55_UBER_UNIQUES).forEach(key => {
    itemPool[key] = LEVEL_55_UBER_UNIQUES[key];
});