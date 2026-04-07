// ITEMS DATABASE
// Rarity multipliers: common=1x, uncommon=1.5x, rare=2x, epic=3x, legendary=5x, unique=7.5x, uber_unique=9x
// Level scaling: every 10 levels = 2x stats

const itemPool = {
    // CONSUMABLES
    'Health Potion': { name: 'Health Potion', type: 'consumable', effect: 'heal', value: 30, desc: 'Restores 30 HP', rarity: 'common' },
    'Mana Potion': { name: 'Mana Potion', type: 'consumable', effect: 'mana', value: 20, desc: 'Restores 20 MP', rarity: 'common' },
    'Greater Health Potion': { name: 'Greater Health Potion', type: 'consumable', effect: 'heal', value: 100, desc: 'Restores 100 HP', rarity: 'uncommon' },
    'Greater Mana Potion': { name: 'Greater Mana Potion', type: 'consumable', effect: 'mana', value: 60, desc: 'Restores 60 MP', rarity: 'uncommon' },
    'Superior Health Potion': { name: 'Superior Health Potion', type: 'consumable', effect: 'heal', value: 300, desc: 'Restores 300 HP', rarity: 'rare' },
    'Superior Mana Potion': { name: 'Superior Mana Potion', type: 'consumable', effect: 'mana', value: 150, desc: 'Restores 150 MP', rarity: 'rare' },
    'Elixir of Life': { name: 'Elixir of Life', type: 'consumable', effect: 'heal', value: 1000, desc: 'Restores 1000 HP', rarity: 'epic' },
    'Elixir of Mana': { name: 'Elixir of Mana', type: 'consumable', effect: 'mana', value: 500, desc: 'Restores 500 MP', rarity: 'epic' },
    'Phoenix Health Elixir': { name: 'Phoenix Health Elixir', type: 'consumable', effect: 'heal_full', value: 1, desc: 'Fully restores all HP', rarity: 'legendary' },
    'Phoenix Mana Elixir': { name: 'Phoenix Mana Elixir', type: 'consumable', effect: 'mana_full', value: 1, desc: 'Fully restores all MP', rarity: 'legendary' },
    'Divine Restoration': { name: 'Divine Restoration', type: 'consumable', effect: 'full_restore', value: 1, desc: 'Fully restores ALL HP and MP', rarity: 'legendary' },
    
    // MATERIALS
    'Wolf Pelt': { name: 'Wolf Pelt', type: 'material', desc: 'Thick pelt', rarity: 'common' },
    'Goblin Ears': { name: 'Goblin Ears', type: 'material', desc: 'Gnarly ears', rarity: 'common' },
    'Sprite Dust': { name: 'Sprite Dust', type: 'material', desc: 'Shimmering dust', rarity: 'uncommon' },
    'Stone Core': { name: 'Stone Core', type: 'material', desc: 'Glowing essence', rarity: 'uncommon' },
    'Harpy Feather': { name: 'Harpy Feather', type: 'material', desc: 'Flight feather', rarity: 'common' },
    'Dragon Scale': { name: 'Dragon Scale', type: 'material', desc: 'Red-hot scale', rarity: 'rare' },
    'Dark Pelt': { name: 'Dark Pelt', type: 'material', desc: 'Shadowy fur', rarity: 'rare' },
    'Wraith Essence': { name: 'Wraith Essence', type: 'material', desc: 'Spectral essence', rarity: 'rare' },
    'Bat Wing': { name: 'Bat Wing', type: 'material', desc: 'Leathery wing', rarity: 'common' },
    'Dragon Claw': { name: 'Dragon Claw', type: 'material', desc: 'Sharp claw', rarity: 'rare' },
    'Dragon Heart': { name: 'Dragon Heart', type: 'material', desc: 'Dragon heart', rarity: 'legendary' },
    'Magic Stone': { name: 'Magic Stone', type: 'material', desc: 'Enchanted gem', rarity: 'rare' },
    'Iron Ore': { name: 'Iron Ore', type: 'material', desc: 'Raw iron', rarity: 'common' },
    'Pixie Wings': { name: 'Pixie Wings', type: 'material', desc: 'Tiny wings', rarity: 'common' },
    'Cave Troll Hide': { name: 'Cave Troll Hide', type: 'material', desc: 'Tough hide', rarity: 'uncommon' },
    'Shadow Essence': { name: 'Shadow Essence', type: 'material', desc: 'Dark energy', rarity: 'epic' },
    'Demon Horn': { name: 'Demon Horn', type: 'material', desc: 'Twisted horn', rarity: 'epic' },
    'Phoenix Feather': { name: 'Phoenix Feather', type: 'material', desc: 'Burning feather', rarity: 'legendary' },
    'Mythril Ore': { name: 'Mythril Ore', type: 'material', desc: 'Rare ore', rarity: 'epic' },
    'Ancient Bone': { name: 'Ancient Bone', type: 'material', desc: 'Old bone', rarity: 'rare' },
    'Void Crystal': { name: 'Void Crystal', type: 'material', desc: 'Dark crystal', rarity: 'legendary' },
    'Steel Ingot': { name: 'Steel Ingot', type: 'material', desc: 'Refined steel used for better weapons and armor', rarity: 'uncommon' },
    'Silkweave': { name: 'Silkweave', type: 'material', desc: 'Fine enchanted cloth for agile gear', rarity: 'uncommon' },
    'Moonstone': { name: 'Moonstone', type: 'material', desc: 'A pale gem humming with mana', rarity: 'rare' },
    'Runic Thread': { name: 'Runic Thread', type: 'material', desc: 'Inscribed thread that binds magical equipment', rarity: 'rare' },
    'Aethersteel Ingot': { name: 'Aethersteel Ingot', type: 'material', desc: 'Star-forged metal for powerful equipment', rarity: 'epic' },
    'Abyssal Shard': { name: 'Abyssal Shard', type: 'material', desc: 'Dense shard of abyssal power', rarity: 'epic' },
    'Celestial Core': { name: 'Celestial Core', type: 'material', desc: 'A brilliant core overflowing with divine force', rarity: 'legendary' },
    'Starweave Fiber': { name: 'Starweave Fiber', type: 'material', desc: 'Radiant thread woven from constellations', rarity: 'legendary' },
    
    // WEAPONS - Level 1-10 (Common)
    'Rusty Sword': { name: 'Rusty Sword', type: 'weapon', equipSlot: 'weapon', atk: 3, levelReq: 1, desc: '+3 ATK', rarity: 'common' },
    'Wooden Club': { name: 'Wooden Club', type: 'weapon', equipSlot: 'weapon', atk: 4, levelReq: 3, desc: '+4 ATK', rarity: 'common' },
    'Iron Dagger': { name: 'Iron Dagger', type: 'weapon', equipSlot: 'weapon', atk: 5, levelReq: 5, desc: '+5 ATK', rarity: 'common' },
    'Short Sword': { name: 'Short Sword', type: 'weapon', equipSlot: 'weapon', atk: 6, levelReq: 8, desc: '+6 ATK', rarity: 'common' },
    
    // WEAPONS - Level 10-20 (Uncommon)
    'Iron Sword': { name: 'Iron Sword', type: 'weapon', equipSlot: 'weapon', atk: 8, levelReq: 10, desc: '+8 ATK', rarity: 'uncommon' },
    'Steel Blade': { name: 'Steel Blade', type: 'weapon', equipSlot: 'weapon', atk: 12, levelReq: 15, desc: '+12 ATK', rarity: 'uncommon' },
    'Battle Axe': { name: 'Battle Axe', type: 'weapon', equipSlot: 'weapon', atk: 15, levelReq: 18, desc: '+15 ATK', rarity: 'uncommon' },
    
    // WEAPONS - Level 20-35 (Rare)
    'Cursed Blade': { name: 'Cursed Blade', type: 'weapon', equipSlot: 'weapon', atk: 20, levelReq: 20, desc: '+20 ATK | 30% chance to Curse target', rarity: 'rare', onHitDebuff: { effect: 'curse', chance: 30 } },
    'Enchanted Sword': { name: 'Enchanted Sword', type: 'weapon', equipSlot: 'weapon', atk: 28, levelReq: 25, desc: '+28 ATK | 20% chance to Burn target', rarity: 'rare', onHitDebuff: { effect: 'burn', chance: 20 } },
    'Dragon Slayer': { name: 'Dragon Slayer', type: 'weapon', equipSlot: 'weapon', atk: 35, levelReq: 30, desc: '+35 ATK | 40% chance to Bleed target', rarity: 'rare', onHitDebuff: { effect: 'bleed', chance: 40 } },
    'Storm Hammer': { name: 'Storm Hammer', type: 'weapon', equipSlot: 'weapon', atk: 40, levelReq: 35, desc: '+40 ATK | 25% chance to Stun target', rarity: 'rare', onHitDebuff: { effect: 'stun', chance: 25 } },
    
    // WEAPONS - Level 35-50 (Epic)
    'Shadow Staff': { name: 'Shadow Staff', type: 'weapon', equipSlot: 'weapon', atk: 50, levelReq: 35, desc: '+50 ATK | 35% chance to Silence target', rarity: 'epic', onHitDebuff: { effect: 'silence', chance: 35 } },
    'Infernal Blade': { name: 'Infernal Blade', type: 'weapon', equipSlot: 'weapon', atk: 65, levelReq: 40, desc: '+65 ATK | 50% chance to Burn target', rarity: 'epic', onHitDebuff: { effect: 'burn', chance: 50 } },
    'Void Reaper': { name: 'Void Reaper', type: 'weapon', equipSlot: 'weapon', atk: 80, levelReq: 45, desc: '+80 ATK | 40% chance to Exhaust target', rarity: 'epic', onHitDebuff: { effect: 'exhaustion', chance: 40 } },
    'Doom Bringer': { name: 'Doom Bringer', type: 'weapon', equipSlot: 'weapon', atk: 100, levelReq: 50, desc: '+100 ATK | 30% chance to make target Vulnerable', rarity: 'epic', onHitDebuff: { effect: 'vulnerability', chance: 30 } },
    
    // WEAPONS - Level 50-60 (Legendary)
    'Soul Blade': { name: 'Soul Blade', type: 'weapon', equipSlot: 'weapon', atk: 120, levelReq: 50, desc: '+120 ATK | 45% chance to Weaken target', rarity: 'legendary', onHitDebuff: { effect: 'weakness', chance: 45 } },
    'Excalibur': { name: 'Excalibur', type: 'weapon', equipSlot: 'weapon', atk: 150, levelReq: 55, desc: '+150 ATK | 35% chance to Freeze target', rarity: 'legendary', onHitDebuff: { effect: 'freeze', chance: 35 } },
    'Apocalypse': { name: 'Apocalypse', type: 'weapon', equipSlot: 'weapon', atk: 180, levelReq: 60, desc: '+180 ATK | 60% chance to Curse target', rarity: 'legendary', onHitDebuff: { effect: 'curse', chance: 60 } },
    
    // ARMOR - Level 1-10 (Common)
    'Leather Vest': { name: 'Leather Vest', type: 'armor', equipSlot: 'armor', def: 2, levelReq: 1, desc: '+2 DEF', rarity: 'common' },
    'Padded Armor': { name: 'Padded Armor', type: 'armor', equipSlot: 'armor', def: 4, levelReq: 5, desc: '+4 DEF', rarity: 'common' },
    'Chain Shirt': { name: 'Chain Shirt', type: 'armor', equipSlot: 'armor', def: 6, levelReq: 8, desc: '+6 DEF', rarity: 'common' },
    
    // ARMOR - Level 10-20 (Uncommon)
    'Scale Mail': { name: 'Scale Mail', type: 'armor', equipSlot: 'armor', def: 10, levelReq: 10, desc: '+10 DEF', rarity: 'uncommon' },
    'Brigandine': { name: 'Brigandine', type: 'armor', equipSlot: 'armor', def: 15, levelReq: 15, desc: '+15 DEF', rarity: 'uncommon' },
    
    // ARMOR - Level 20-35 (Rare)
    'Dark Armor': { name: 'Dark Armor', type: 'armor', equipSlot: 'armor', def: 22, levelReq: 20, desc: '+22 DEF', rarity: 'rare' },
    'Plate Armor': { name: 'Plate Armor', type: 'armor', equipSlot: 'armor', def: 32, levelReq: 25, desc: '+32 DEF', rarity: 'rare' },
    'Dragon Scale Mail': { name: 'Dragon Scale Mail', type: 'armor', equipSlot: 'armor', def: 42, levelReq: 30, desc: '+42 DEF', rarity: 'rare' },
    
    // ARMOR - Level 35-50 (Epic)
    'Shadow Plate': { name: 'Shadow Plate', type: 'armor', equipSlot: 'armor', def: 55, levelReq: 35, desc: '+55 DEF', rarity: 'epic' },
    'Infernal Armor': { name: 'Infernal Armor', type: 'armor', equipSlot: 'armor', def: 75, levelReq: 40, desc: '+75 DEF', rarity: 'epic' },
    'Void Fortress': { name: 'Void Fortress', type: 'armor', equipSlot: 'armor', def: 100, levelReq: 45, desc: '+100 DEF', rarity: 'epic' },
    
    // ARMOR - Level 50-60 (Legendary)
    'Shadow Crown': { name: 'Shadow Crown', type: 'armor', equipSlot: 'armor', def: 130, levelReq: 50, desc: '+130 DEF', rarity: 'legendary' },
    'Divine Raiment': { name: 'Divine Raiment', type: 'armor', equipSlot: 'armor', def: 160, levelReq: 55, desc: '+160 DEF', rarity: 'legendary' },
    'Eternal Aegis': { name: 'Eternal Aegis', type: 'armor', equipSlot: 'armor', def: 200, levelReq: 60, desc: '+200 DEF', rarity: 'legendary' },
    
    // HELMETS
    'Leather Cap': { name: 'Leather Cap', type: 'helmet', equipSlot: 'helmet', def: 1, levelReq: 1, desc: '+1 DEF', rarity: 'common' },
    'Iron Helm': { name: 'Iron Helm', type: 'helmet', equipSlot: 'helmet', def: 5, levelReq: 10, desc: '+5 DEF', rarity: 'uncommon' },
    'Dark Helmet': { name: 'Dark Helmet', type: 'helmet', equipSlot: 'helmet', def: 12, levelReq: 20, desc: '+12 DEF', rarity: 'rare' },
    'Helm of Darkness': { name: 'Helm of Darkness', type: 'helmet', equipSlot: 'helmet', def: 30, levelReq: 35, desc: '+30 DEF', rarity: 'epic' },
    'Crown of Ages': { name: 'Crown of Ages', type: 'helmet', equipSlot: 'helmet', def: 60, levelReq: 50, desc: '+60 DEF', rarity: 'legendary' },
    
    // SHIELDS
    'Wooden Shield': { name: 'Wooden Shield', type: 'shield', equipSlot: 'shield', def: 2, levelReq: 1, desc: '+2 DEF', rarity: 'common' },
    'Buckler': { name: 'Buckler', type: 'shield', equipSlot: 'shield', def: 6, levelReq: 10, desc: '+6 DEF', rarity: 'uncommon' },
    'Dark Shield': { name: 'Dark Shield', type: 'shield', equipSlot: 'shield', def: 15, levelReq: 20, desc: '+15 DEF', rarity: 'rare' },
    'Tower Shield': { name: 'Tower Shield', type: 'shield', equipSlot: 'shield', def: 35, levelReq: 35, desc: '+35 DEF', rarity: 'epic' },
    'Sacred Ward': { name: 'Sacred Ward', type: 'shield', equipSlot: 'shield', def: 70, levelReq: 50, desc: '+70 DEF', rarity: 'legendary' },
    
    // BOOTS
    'Sandals': { name: 'Sandals', type: 'boots', equipSlot: 'boots', def: 1, levelReq: 1, desc: '+1 DEF', rarity: 'common' },
    'Leather Boots': { name: 'Leather Boots', type: 'boots', equipSlot: 'boots', def: 3, levelReq: 8, desc: '+3 DEF', rarity: 'common' },
'Swift Boots': { name: 'Swift Boots', type: 'boots', equipSlot: 'boots', def: 8, atk: 2, levelReq: 15, desc: '+8 DEF, +2 ATK', rarity: 'uncommon' },
    'Shadow Treads': { name: 'Shadow Treads', type: 'boots', equipSlot: 'boots', def: 20, levelReq: 25, desc: '+20 DEF', rarity: 'rare' },
    'Phantom Steps': { name: 'Phantom Steps', type: 'boots', equipSlot: 'boots', def: 45, levelReq: 40, desc: '+45 DEF', rarity: 'epic' },
    'Hermes Sandals': { name: 'Hermes Sandals', type: 'boots', equipSlot: 'boots', def: 80, levelReq: 55, desc: '+80 DEF', rarity: 'legendary' },
    
    // GLOVES
    'Cloth Gloves': { name: 'Cloth Gloves', type: 'gloves', equipSlot: 'gloves', atk: 1, levelReq: 1, desc: '+1 ATK', rarity: 'common' },
    'Leather Gloves': { name: 'Leather Gloves', type: 'gloves', equipSlot: 'gloves', atk: 3, levelReq: 8, desc: '+3 ATK', rarity: 'common' },
    'Gauntlets': { name: 'Gauntlets', type: 'gloves', equipSlot: 'gloves', atk: 8, levelReq: 15, desc: '+8 ATK', rarity: 'uncommon' },
    'Warrior Grips': { name: 'Warrior Grips', type: 'gloves', equipSlot: 'gloves', atk: 18, levelReq: 25, desc: '+18 ATK', rarity: 'rare' },
    'Demon Hands': { name: 'Demon Hands', type: 'gloves', equipSlot: 'gloves', atk: 40, levelReq: 40, desc: '+40 ATK', rarity: 'epic' },
    'Titan Fists': { name: 'Titan Fists', type: 'gloves', equipSlot: 'gloves', atk: 80, levelReq: 55, desc: '+80 ATK', rarity: 'legendary' },
    
    // CAPES
    'Cloth Cloak': { name: 'Cloth Cloak', type: 'cape', equipSlot: 'cape', def: 1, levelReq: 1, desc: '+1 DEF', rarity: 'common' },
    'Traveler Cloak': { name: 'Traveler Cloak', type: 'cape', equipSlot: 'cape', def: 4, levelReq: 10, desc: '+4 DEF', rarity: 'uncommon' },
    'Shadow Cloak': { name: 'Shadow Cloak', type: 'cape', equipSlot: 'cape', def: 12, crit: 5, levelReq: 20, desc: '+12 DEF, +5% CRIT', rarity: 'rare' },
    'Vampire Cape': { name: 'Vampire Cape', type: 'cape', equipSlot: 'cape', def: 30, crit: 12, levelReq: 35, desc: '+30 DEF, +12% CRIT', rarity: 'epic' },
    'Wings of Liberty': { name: 'Wings of Liberty', type: 'cape', equipSlot: 'cape', def: 65, crit: 25, levelReq: 50, desc: '+65 DEF, +25% CRIT', rarity: 'legendary' },
    
    // RINGS
    'Copper Ring': { name: 'Copper Ring', type: 'ring', equipSlot: 'ring', atk: 1, levelReq: 1, desc: '+1 ATK', rarity: 'common' },
    'Ring of Power': { name: 'Ring of Power', type: 'ring', equipSlot: 'ring', atk: 5, levelReq: 10, desc: '+5 ATK', rarity: 'uncommon' },
    'Lucky Charm': { name: 'Lucky Charm', type: 'charm', equipSlot: 'ring', luck: 3, levelReq: 15, desc: '+3 LUCK', rarity: 'uncommon' },
'Critical Ring': { name: 'Critical Ring', type: 'ring', equipSlot: 'ring', crit: 15, levelReq: 20, desc: '+15% CRIT', rarity: 'rare' },
    'Band of Fury': { name: 'Band of Fury', type: 'ring', equipSlot: 'ring', atk: 25, crit: 10, levelReq: 30, desc: '+25 ATK, +10% CRIT', rarity: 'rare' },
    'Ring of Chaos': { name: 'Ring of Chaos', type: 'ring', equipSlot: 'ring', atk: 50, levelReq: 40, desc: '+50 ATK', rarity: 'epic' },
    'One Ring': { name: 'One Ring', type: 'ring', equipSlot: 'ring', atk: 80, crit: 20, levelReq: 55, desc: '+80 ATK, +20% CRIT', rarity: 'legendary' },
    
    // AMULETS
    'Wooden Charm': { name: 'Wooden Charm', type: 'amulet', equipSlot: 'amulet', def: 1, levelReq: 1, desc: '+1 DEF', rarity: 'common' },
    'Amulet of Warding': { name: 'Amulet of Warding', type: 'amulet', equipSlot: 'amulet', def: 6, levelReq: 10, desc: '+6 DEF', rarity: 'uncommon' },
    'Life Pendant': { name: 'Life Pendant', type: 'amulet', equipSlot: 'amulet', def: 15, levelReq: 20, desc: '+15 DEF', rarity: 'rare' },
    'Dragon Heart Amulet': { name: 'Dragon Heart Amulet', type: 'amulet', equipSlot: 'amulet', def: 35, levelReq: 35, desc: '+35 DEF', rarity: 'epic' },
    'Phoenix Heart': { name: 'Phoenix Heart', type: 'amulet', equipSlot: 'amulet', def: 75, levelReq: 50, desc: '+75 DEF', rarity: 'legendary' },
    
    // CURRENCY
    'Soul Gem': { name: 'Soul Gem', type: 'currency', desc: 'Premium currency', rarity: 'legendary' },
    
    // UBER UNIQUE ITEMS
    'Reaper Scythe': { 
        name: 'Reaper Scythe', 
        type: 'weapon', 
        equipSlot: 'weapon', 
        atk: 666, 
        crit: 33, 
        critDmg: 66,
        atkPercent: 66,
        levelReq: 50, 
        desc: '+666 ATK, +33% CRIT, +66% Crit Damage, +66% ATK | Special: Deals 50% of Enemy Current HP as bonus damage', 
        rarity: 'uber_unique',
        specialAbility: 'half_current_hp',
        uberUnique: true
    },
    
    'Ankh Shield': { 
        name: 'Ankh Shield', 
        type: 'shield', 
        equipSlot: 'shield', 
        def: 99, 
        dmgReduction: 25,
        defPercent: 40,
        levelReq: 50, 
        desc: '+99 DEF, +25% Damage Reduction, +40% DEF | Special: Immune to all negative status effects when equipped', 
        rarity: 'uber_unique',
        specialAbility: 'status_immunity',
        uberUnique: true
    },
    
    'Stellar Sprinters': { 
        name: 'Stellar Sprinters', 
        type: 'boots', 
        equipSlot: 'boots', 
        def: 250, 
        defPercent: 20,
        atkPercent: 10,
        dodge: 40,
        levelReq: 50, 
        desc: '+250 DEF, +20% DEF, +10% ATK, +40% Dodge | Special: Wander encounters count as 10 encounters, Escape with full rewards', 
        rarity: 'uber_unique',
        specialAbility: 'encounter_multiplier_escape',
        uberUnique: true
    }
};

// SCROLL POOL
const scrollPool = {
    // EXISTING SCROLLS
    'Minor Power Scroll': { name: 'Minor Power Scroll', type: 'scroll', rarity: 'common', effect: 'damage_boost', value: 1.5, duration: 2, desc: '1.5x damage for 2 turns' },
    'Healing Scroll': { name: 'Healing Scroll', type: 'scroll', rarity: 'common', effect: 'heal', value: 25, duration: 1, desc: 'Heal 25 HP' },
    'Power Scroll': { name: 'Power Scroll', type: 'scroll', rarity: 'uncommon', effect: 'damage_boost', value: 2, duration: 2, desc: '2x damage' },
    'Greater Power Scroll': { name: 'Greater Power Scroll', type: 'scroll', rarity: 'rare', effect: 'damage_boost', value: 3, duration: 3, desc: '3x damage' },
    'Critical Strike Scroll': { name: 'Critical Strike Scroll', type: 'scroll', rarity: 'rare', effect: 'crit_chance', value: 0.5, duration: 3, desc: '50% crit' },
    'Execution Scroll': { name: 'Execution Scroll', type: 'scroll', rarity: 'epic', effect: 'execute', value: 0.35, duration: 1, desc: 'Kill under 35% HP' },
    'Supreme Power Scroll': { name: 'Supreme Power Scroll', type: 'scroll', rarity: 'legendary', effect: 'damage_boost', value: 5, duration: 3, desc: '5x damage' },
    'Divine Shield Scroll': { name: 'Divine Shield Scroll', type: 'scroll', rarity: 'legendary', effect: 'invulnerable', value: 1, duration: 1, desc: 'Invulnerable 1 turn' },

    // NEW COMMON SCROLLS (base value, 1x multiplier)
    'Minor Shield Scroll': { name: 'Minor Shield Scroll', type: 'scroll', rarity: 'common', effect: 'defense_boost', value: 1.3, duration: 2, desc: '+30% DEF for 2 turns' },
    'Minor Speed Scroll': { name: 'Minor Speed Scroll', type: 'scroll', rarity: 'common', effect: 'dodge_boost', value: 0.15, duration: 2, desc: '+15% dodge for 2 turns' },
    'Minor Flame Scroll': { name: 'Minor Flame Scroll', type: 'scroll', rarity: 'common', effect: 'burn', value: 8, duration: 2, desc: 'Burn 8 DMG/turn for 2 turns' },
    'Minor Frost Scroll': { name: 'Minor Frost Scroll', type: 'scroll', rarity: 'common', effect: 'slow', value: 0.2, duration: 2, desc: 'Enemy -20% DMG for 2 turns' },
    'Minor Luck Scroll': { name: 'Minor Luck Scroll', type: 'scroll', rarity: 'common', effect: 'drop_boost', value: 0.1, duration: 3, desc: '+10% drop rate for 3 turns' },
    'Minor Thorns Scroll': { name: 'Minor Thorns Scroll', type: 'scroll', rarity: 'common', effect: 'thorns', value: 5, duration: 2, desc: 'Reflect 5 DMG for 2 turns' },
    'Minor Poison Scroll': { name: 'Minor Poison Scroll', type: 'scroll', rarity: 'common', effect: 'poison', value: 6, duration: 3, desc: 'Poison 6 DMG/turn for 3 turns' },

    // NEW UNCOMMON SCROLLS (1.5x multiplier)
    'Shield Scroll': { name: 'Shield Scroll', type: 'scroll', rarity: 'uncommon', effect: 'defense_boost', value: 1.5, duration: 2, desc: '+50% DEF for 2 turns' },
    'Speed Scroll': { name: 'Speed Scroll', type: 'scroll', rarity: 'uncommon', effect: 'dodge_boost', value: 0.25, duration: 2, desc: '+25% dodge for 2 turns' },
    'Flame Scroll': { name: 'Flame Scroll', type: 'scroll', rarity: 'uncommon', effect: 'burn', value: 15, duration: 2, desc: 'Burn 15 DMG/turn for 2 turns' },
    'Frost Scroll': { name: 'Frost Scroll', type: 'scroll', rarity: 'uncommon', effect: 'slow', value: 0.35, duration: 2, desc: 'Enemy -35% DMG for 2 turns' },
    'Regeneration Scroll': { name: 'Regeneration Scroll', type: 'scroll', rarity: 'uncommon', effect: 'regen', value: 12, duration: 3, desc: 'Regen 12 HP/turn for 3 turns' },
    'Lucky Scroll': { name: 'Lucky Scroll', type: 'scroll', rarity: 'uncommon', effect: 'drop_boost', value: 0.2, duration: 3, desc: '+20% drop rate for 3 turns' },
    'Thorns Scroll': { name: 'Thorns Scroll', type: 'scroll', rarity: 'uncommon', effect: 'thorns', value: 12, duration: 2, desc: 'Reflect 12 DMG for 2 turns' },

    // NEW RARE SCROLLS (2x multiplier)
    'Greater Shield Scroll': { name: 'Greater Shield Scroll', type: 'scroll', rarity: 'rare', effect: 'defense_boost', value: 2, duration: 3, desc: '+100% DEF for 3 turns' },
    'Greater Speed Scroll': { name: 'Greater Speed Scroll', type: 'scroll', rarity: 'rare', effect: 'dodge_boost', value: 0.4, duration: 3, desc: '+40% dodge for 3 turns' },
    'Greater Flame Scroll': { name: 'Greater Flame Scroll', type: 'scroll', rarity: 'rare', effect: 'burn', value: 30, duration: 3, desc: 'Burn 30 DMG/turn for 3 turns' },
    'Greater Frost Scroll': { name: 'Greater Frost Scroll', type: 'scroll', rarity: 'rare', effect: 'slow', value: 0.5, duration: 3, desc: 'Enemy -50% DMG for 3 turns' },
    'Greater Regeneration Scroll': { name: 'Greater Regeneration Scroll', type: 'scroll', rarity: 'rare', effect: 'regen', value: 25, duration: 3, desc: 'Regen 25 HP/turn for 3 turns' },
    'Fortune Scroll': { name: 'Fortune Scroll', type: 'scroll', rarity: 'rare', effect: 'drop_boost', value: 0.35, duration: 3, desc: '+35% drop rate for 3 turns' },
    'Vampiric Scroll': { name: 'Vampiric Scroll', type: 'scroll', rarity: 'rare', effect: 'lifesteal', value: 0.25, duration: 3, desc: '25% lifesteal for 3 turns' },

    // NEW EPIC SCROLLS (3x multiplier)
    'Superior Shield Scroll': { name: 'Superior Shield Scroll', type: 'scroll', rarity: 'epic', effect: 'defense_boost', value: 3, duration: 3, desc: '+200% DEF for 3 turns' },
    'Berserker Scroll': { name: 'Berserker Scroll', type: 'scroll', rarity: 'epic', effect: 'berserker', value: 2.5, duration: 2, desc: '2.5x ATK, -30% DEF for 2 turns' },
    'Inferno Scroll': { name: 'Inferno Scroll', type: 'scroll', rarity: 'epic', effect: 'burn', value: 60, duration: 3, desc: 'Burn 60 DMG/turn for 3 turns' },
    'Glacial Scroll': { name: 'Glacial Scroll', type: 'scroll', rarity: 'epic', effect: 'freeze', value: 1, duration: 1, desc: 'Freeze enemy 1 turn' },
    'Greater Execution Scroll': { name: 'Greater Execution Scroll', type: 'scroll', rarity: 'epic', effect: 'execute', value: 0.3, duration: 1, desc: 'Kill under 30% HP' },
    'Supreme Fortune Scroll': { name: 'Supreme Fortune Scroll', type: 'scroll', rarity: 'epic', effect: 'drop_boost', value: 0.6, duration: 3, desc: '+60% drop rate for 3 turns' },

    // NEW LEGENDARY SCROLLS (5x multiplier)
    'Phoenix Scroll': { name: 'Phoenix Scroll', type: 'scroll', rarity: 'legendary', effect: 'revive', value: 0.5, duration: 1, desc: 'Revive with 50% HP on death' },
    'God Slayer Scroll': { name: 'God Slayer Scroll', type: 'scroll', rarity: 'legendary', effect: 'damage_boost', value: 8, duration: 2, desc: '8x damage for 2 turns' },
    'Immortality Scroll': { name: 'Immortality Scroll', type: 'scroll', rarity: 'legendary', effect: 'invulnerable', value: 1, duration: 2, desc: 'Invulnerable for 2 turns' },
    'Armageddon Scroll': { name: 'Armageddon Scroll', type: 'scroll', rarity: 'legendary', effect: 'nuke', value: 9999, duration: 1, desc: 'Deal 9999 DMG instantly' },
    'Absolute Zero Scroll': { name: 'Absolute Zero Scroll', type: 'scroll', rarity: 'legendary', effect: 'freeze', value: 1, duration: 3, desc: 'Freeze enemy for 3 turns' }
};

// CRAFTING RECIPES
const BASE_CRAFTING_RECIPES = [
    { name: 'Iron Sword', materials: { 'Iron Ore': 3 }, result: { name: 'Iron Sword', type: 'weapon', equipSlot: 'weapon', atk: 8, levelReq: 10, desc: '+8 ATK', rarity: 'uncommon' }, chance: 0.8 },
    { name: 'Health Potion', materials: { 'Sprite Dust': 1, 'Wolf Pelt': 1 }, result: { name: 'Health Potion', type: 'consumable', effect: 'heal', value: 30, desc: 'Restores 30 HP', rarity: 'common' }, chance: 0.9 },
    { name: 'Lucky Charm', materials: { 'Pixie Wings': 3, 'Magic Stone': 1 }, result: { name: 'Lucky Charm', type: 'charm', equipSlot: 'ring', luck: 3, levelReq: 15, desc: '+3 LUCK', rarity: 'uncommon' }, chance: 0.4 },
    { name: 'Critical Ring', materials: { 'Harpy Feather': 2, 'Dragon Claw': 1 }, result: { name: 'Critical Ring', type: 'ring', equipSlot: 'ring', crit: 15, levelReq: 20, desc: '+15% CRIT', rarity: 'rare' }, chance: 0.35 },
    { name: 'Dragon Scale Mail', materials: { 'Dragon Scale': 5, 'Iron Ore': 10 }, result: { name: 'Dragon Scale Mail', type: 'armor', equipSlot: 'armor', def: 42, levelReq: 30, desc: '+42 DEF', rarity: 'rare' }, chance: 0.3 },
    { name: 'Shadow Cloak', materials: { 'Shadow Essence': 2, 'Dark Pelt': 3 }, result: { name: 'Shadow Cloak', type: 'cape', equipSlot: 'cape', def: 12, crit: 5, levelReq: 20, desc: '+12 DEF, +5% CRIT', rarity: 'rare' }, chance: 0.35 },
    { name: 'Greater Health Potion', materials: { 'Sprite Dust': 3, 'Wolf Pelt': 3, 'Magic Stone': 1 }, result: { name: 'Greater Health Potion', type: 'consumable', effect: 'heal', value: 100, desc: 'Restores 100 HP', rarity: 'uncommon' }, chance: 0.7 }
];

const SPECIAL_CRAFTING_RECIPES = [
    {
        name: 'Blessing Oil',
        materials: { 'Moonstone': 2, 'Runic Thread': 2, 'Aethersteel Ingot': 1, 'Celestial Core': 1 },
        result: { name: 'Blessing Oil', type: 'consumable', effect: 'blessing', value: 50, desc: 'Chance to increase Weapon Luck.', rarity: 'epic', price: 500 },
        chance: 0.52
    },
    {
        name: 'World Boss Ticket',
        materials: { 'Abyssal Shard': 2, 'Dragon Heart': 1, 'Void Crystal': 2, 'Celestial Core': 1, 'Starweave Fiber': 1 },
        result: { name: 'World Boss Ticket', type: 'consumable', effect: 'spawn_world_boss', value: 0, desc: 'Immediately summons a World Boss when used', rarity: 'epic', price: 15000 },
        chance: 0.3
    }
];

const craftingRecipes = [];
const UNIQUE_CRAFT_UBER_DROP_CHANCE = 0.005;

const CRAFTABLE_EQUIP_TYPES = ['weapon', 'armor', 'helmet', 'shield', 'ring', 'amulet', 'boots', 'gloves', 'cape', 'charm'];
const RECIPE_RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'unique', 'uber_unique'];
const CRAFT_SUCCESS_BY_RARITY = {
    common: 0.97,
    uncommon: 0.88,
    rare: 0.74,
    epic: 0.58,
    legendary: 0.42,
    unique: 0.28,
    uber_unique: 0.16
};
const SLOT_PRIMARY_MATERIALS = {
    weapon: ['Iron Ore', 'Steel Ingot', 'Dragon Claw', 'Mythril Ore', 'Dragon Heart', 'Celestial Core', 'Celestial Core'],
    armor: ['Wolf Pelt', 'Steel Ingot', 'Dragon Scale', 'Aethersteel Ingot', 'Dragon Heart', 'Celestial Core', 'Celestial Core'],
    helmet: ['Wolf Pelt', 'Steel Ingot', 'Dragon Scale', 'Aethersteel Ingot', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    shield: ['Iron Ore', 'Stone Core', 'Dragon Scale', 'Aethersteel Ingot', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    boots: ['Bat Wing', 'Cave Troll Hide', 'Dark Pelt', 'Shadow Essence', 'Phoenix Feather', 'Starweave Fiber', 'Starweave Fiber'],
    gloves: ['Wolf Pelt', 'Cave Troll Hide', 'Dragon Claw', 'Demon Horn', 'Dragon Heart', 'Starweave Fiber', 'Starweave Fiber'],
    cape: ['Harpy Feather', 'Silkweave', 'Runic Thread', 'Shadow Essence', 'Phoenix Feather', 'Starweave Fiber', 'Starweave Fiber'],
    ring: ['Pixie Wings', 'Sprite Dust', 'Moonstone', 'Abyssal Shard', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    amulet: ['Pixie Wings', 'Stone Core', 'Magic Stone', 'Abyssal Shard', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    charm: ['Pixie Wings', 'Stone Core', 'Moonstone', 'Abyssal Shard', 'Void Crystal', 'Celestial Core', 'Celestial Core']
};
const SLOT_SUPPORT_MATERIALS = {
    weapon: ['Goblin Ears', 'Sprite Dust', 'Magic Stone', 'Runic Thread', 'Abyssal Shard', 'Void Crystal', 'Void Crystal'],
    armor: ['Wolf Pelt', 'Cave Troll Hide', 'Ancient Bone', 'Runic Thread', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    helmet: ['Goblin Ears', 'Stone Core', 'Ancient Bone', 'Runic Thread', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    shield: ['Wolf Pelt', 'Stone Core', 'Magic Stone', 'Abyssal Shard', 'Void Crystal', 'Celestial Core', 'Celestial Core'],
    boots: ['Harpy Feather', 'Pixie Wings', 'Moonstone', 'Runic Thread', 'Starweave Fiber', 'Celestial Core', 'Celestial Core'],
    gloves: ['Bat Wing', 'Harpy Feather', 'Moonstone', 'Abyssal Shard', 'Phoenix Feather', 'Celestial Core', 'Celestial Core'],
    cape: ['Pixie Wings', 'Sprite Dust', 'Wraith Essence', 'Abyssal Shard', 'Starweave Fiber', 'Celestial Core', 'Celestial Core'],
    ring: ['Goblin Ears', 'Magic Stone', 'Wraith Essence', 'Abyssal Shard', 'Dragon Heart', 'Celestial Core', 'Celestial Core'],
    amulet: ['Wolf Pelt', 'Sprite Dust', 'Wraith Essence', 'Shadow Essence', 'Phoenix Feather', 'Celestial Core', 'Celestial Core'],
    charm: ['Pixie Wings', 'Magic Stone', 'Moonstone', 'Abyssal Shard', 'Dragon Heart', 'Celestial Core', 'Celestial Core']
};
const CONSUMABLE_PRIMARY_MATERIALS = {
    heal: ['Wolf Pelt', 'Sprite Dust', 'Stone Core', 'Moonstone', 'Abyssal Shard', 'Celestial Core', 'Celestial Core'],
    mana: ['Pixie Wings', 'Sprite Dust', 'Magic Stone', 'Moonstone', 'Abyssal Shard', 'Celestial Core', 'Celestial Core'],
    heal_full: ['Dragon Heart', 'Phoenix Feather', 'Void Crystal', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core'],
    mana_full: ['Void Crystal', 'Phoenix Feather', 'Dragon Heart', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core'],
    full_restore: ['Dragon Heart', 'Phoenix Feather', 'Void Crystal', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core'],
    blessing: ['Moonstone', 'Abyssal Shard', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core'],
    spawn_world_boss: ['Void Crystal', 'Dragon Heart', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core', 'Celestial Core']
};
const CONSUMABLE_SUPPORT_MATERIALS = {
    heal: ['Goblin Ears', 'Steel Ingot', 'Runic Thread', 'Aethersteel Ingot', 'Phoenix Feather', 'Starweave Fiber', 'Starweave Fiber'],
    mana: ['Bat Wing', 'Steel Ingot', 'Runic Thread', 'Aethersteel Ingot', 'Void Crystal', 'Starweave Fiber', 'Starweave Fiber'],
    heal_full: ['Phoenix Feather', 'Celestial Core', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber'],
    mana_full: ['Dragon Heart', 'Celestial Core', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber'],
    full_restore: ['Phoenix Feather', 'Dragon Heart', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber'],
    blessing: ['Runic Thread', 'Aethersteel Ingot', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber', 'Starweave Fiber'],
    spawn_world_boss: ['Abyssal Shard', 'Starweave Fiber', 'Void Crystal', 'Void Crystal', 'Void Crystal', 'Void Crystal', 'Void Crystal']
};

function getRecipeRarityIndex(rarity) {
    const idx = RECIPE_RARITY_ORDER.indexOf(rarity);
    return idx === -1 ? 0 : idx;
}

function getRecipeTierMaterial(materialList, rarity) {
    return materialList[Math.min(getRecipeRarityIndex(rarity), materialList.length - 1)];
}

function addRecipeMaterial(materials, name, qty) {
    if (!name || qty <= 0) return;
    materials[name] = (materials[name] || 0) + qty;
}

function isStaticCraftableItem(item) {
    if (!item || !item.name) return false;
    if (/\(\d+-\d+\)$/.test(item.name)) return false;
    if (item.type === 'material' || item.type === 'currency' || item.type === 'scroll') return false;
    if (item.type === 'consumable') return true;
    return !!(item.equipSlot || CRAFTABLE_EQUIP_TYPES.includes(item.type));
}

function buildEquipmentRecipeMaterials(item) {
    const slot = item.equipSlot || item.type || 'weapon';
    const primaryList = SLOT_PRIMARY_MATERIALS[slot] || SLOT_PRIMARY_MATERIALS.weapon;
    const supportList = SLOT_SUPPORT_MATERIALS[slot] || SLOT_SUPPORT_MATERIALS.weapon;
    const rarityIndex = getRecipeRarityIndex(item.rarity);
    const levelReq = item.levelReq || 1;
    const levelFactor = Math.max(1, Math.ceil(levelReq / 15));
    const materials = {};

    addRecipeMaterial(materials, getRecipeTierMaterial(primaryList, item.rarity), 1 + levelFactor + Math.min(rarityIndex, 3));
    addRecipeMaterial(materials, getRecipeTierMaterial(supportList, item.rarity), Math.max(1, Math.ceil(levelFactor / 2) + Math.floor(rarityIndex / 2)));

    if (rarityIndex >= 2) {
        addRecipeMaterial(materials, getRecipeTierMaterial(primaryList, RECIPE_RARITY_ORDER[rarityIndex - 1]), 1 + Math.floor(rarityIndex / 2));
    }

    if (item.atk && item.def) {
        addRecipeMaterial(materials, rarityIndex >= 3 ? 'Aethersteel Ingot' : 'Stone Core', 1);
    }
    if (item.crit || item.critDmg) {
        addRecipeMaterial(materials, rarityIndex >= 2 ? 'Moonstone' : 'Harpy Feather', 1);
    }
    if (item.luck || item.magicFind || item.goldFind) {
        addRecipeMaterial(materials, rarityIndex >= 3 ? 'Abyssal Shard' : 'Pixie Wings', 1);
    }
    if (item.hpPercent || item.mpPercent || item.healthRegen || item.manaRegen) {
        addRecipeMaterial(materials, rarityIndex >= 4 ? 'Celestial Core' : 'Wraith Essence', 1);
    }
    if (item.rarity === 'unique') {
        addRecipeMaterial(materials, 'Celestial Core', 1);
    }
    if (item.rarity === 'uber_unique') {
        addRecipeMaterial(materials, 'Celestial Core', 2);
        addRecipeMaterial(materials, 'Void Crystal', 2);
        addRecipeMaterial(materials, 'Starweave Fiber', 1);
    }

    return materials;
}

function buildConsumableRecipeMaterials(item) {
    const rarityIndex = getRecipeRarityIndex(item.rarity);
    const primaryList = CONSUMABLE_PRIMARY_MATERIALS[item.effect] || CONSUMABLE_PRIMARY_MATERIALS.heal;
    const supportList = CONSUMABLE_SUPPORT_MATERIALS[item.effect] || CONSUMABLE_SUPPORT_MATERIALS.heal;
    const valueFactor = Math.max(1, Math.ceil((item.value || 1) / 75));
    const materials = {};

    addRecipeMaterial(materials, getRecipeTierMaterial(primaryList, item.rarity), 1 + valueFactor + Math.min(rarityIndex, 2));
    addRecipeMaterial(materials, getRecipeTierMaterial(supportList, item.rarity), Math.max(1, Math.ceil(valueFactor / 2) + Math.floor(rarityIndex / 2)));

    if (item.effect === 'heal_full' || item.effect === 'mana_full' || item.effect === 'full_restore') {
        addRecipeMaterial(materials, 'Phoenix Feather', 1);
        addRecipeMaterial(materials, 'Void Crystal', 1);
    } else if (rarityIndex >= 2) {
        addRecipeMaterial(materials, item.effect === 'mana' ? 'Magic Stone' : 'Steel Ingot', 1);
    }

    return materials;
}

function createAutoCraftingRecipe(item) {
    return {
        name: item.name,
        materials: item.type === 'consumable' ? buildConsumableRecipeMaterials(item) : buildEquipmentRecipeMaterials(item),
        result: { ...item },
        chance: CRAFT_SUCCESS_BY_RARITY[item.rarity] || 0.6
    };
}

function cloneRecipe(recipe) {
    return {
        ...recipe,
        materials: { ...(recipe.materials || {}) },
        result: { ...(recipe.result || {}) }
    };
}

function rebuildCraftingRecipes() {
    const recipeMap = new Map();

    BASE_CRAFTING_RECIPES.forEach(recipe => {
        recipeMap.set(recipe.result.name, cloneRecipe(recipe));
    });

    Object.values(itemPool)
        .filter(isStaticCraftableItem)
        .filter(item => item.rarity !== 'uber_unique')
        .forEach(item => {
            if (!recipeMap.has(item.name)) {
                recipeMap.set(item.name, createAutoCraftingRecipe(item));
            }
        });

    const specialRecipes = Array.isArray(globalThis.SPECIAL_CRAFTING_RECIPES) ? globalThis.SPECIAL_CRAFTING_RECIPES : SPECIAL_CRAFTING_RECIPES;
    specialRecipes.forEach(recipe => {
        if (recipe && recipe.result && recipe.result.name && recipe.result.rarity !== 'uber_unique') {
            recipeMap.set(recipe.result.name, cloneRecipe(recipe));
        }
    });

    const sortedRecipes = Array.from(recipeMap.values()).sort((a, b) => {
        const aItem = a.result || {};
        const bItem = b.result || {};
        const aLevel = aItem.levelReq || 0;
        const bLevel = bItem.levelReq || 0;
        if (aLevel !== bLevel) return aLevel - bLevel;

        const rarityDiff = getRecipeRarityIndex(aItem.rarity) - getRecipeRarityIndex(bItem.rarity);
        if (rarityDiff !== 0) return rarityDiff;

        return String(a.name || '').localeCompare(String(b.name || ''));
    });

    craftingRecipes.length = 0;
    sortedRecipes.forEach(recipe => craftingRecipes.push(recipe));
    return craftingRecipes;
}

// SELL VALUES
const UNIQUE_ATTRIBUTE_POOL = [
    { name: 'ATK%', min: 5, max: 20, type: 'percentage', stat: 'atk' },
    { name: 'DEF%', min: 5, max: 20, type: 'percentage', stat: 'def' },
    { name: 'Crit Damage', min: 10, max: 25, type: 'flat', stat: 'critDmg' },
    { name: 'Crit Chance', min: 3, max: 12, type: 'flat', stat: 'crit' },
    { name: 'HP%', min: 5, max: 25, type: 'percentage', stat: 'hp' },
    { name: 'MP%', min: 5, max: 25, type: 'percentage', stat: 'mp' },
    { name: 'Attack Speed', min: 5, max: 15, type: 'flat', stat: 'attackSpeed' },
    { name: 'Dodge Chance', min: 3, max: 10, type: 'flat', stat: 'dodge' },
    { name: 'Life Steal', min: 2, max: 8, type: 'flat', stat: 'lifesteal' },
    { name: 'Mana Regen', min: 1, max: 5, type: 'flat', stat: 'manaRegen' },
    { name: 'Health Regen', min: 2, max: 10, type: 'flat', stat: 'healthRegen' },
    { name: 'Luck', min: 5, max: 20, type: 'flat', stat: 'luck' },
    { name: 'Magic Find', min: 10, max: 35, type: 'flat', stat: 'magicFind' },
    { name: 'Damage Reduction', min: 2, max: 7, type: 'flat', stat: 'dmgReduction' },
    { name: 'Bonus EXP', min: 10, max: 30, type: 'flat', stat: 'expBonus' },
    { name: 'Gold Find', min: 15, max: 40, type: 'flat', stat: 'goldFind' },
    { name: 'Armor Penetration', min: 5, max: 18, type: 'flat', stat: 'armorPen' },
    { name: 'Magic Penetration', min: 5, max: 18, type: 'flat', stat: 'magicPen' },
    { name: 'Block Chance', min: 3, max: 12, type: 'flat', stat: 'block' },
    { name: 'Reflect Damage', min: 5, max: 15, type: 'flat', stat: 'reflect' },
    { name: 'Thorns', min: 10, max: 30, type: 'flat', stat: 'thorns' },
    { name: 'Move Speed', min: 5, max: 20, type: 'flat', stat: 'moveSpeed' },
    { name: 'Elemental Damage', min: 8, max: 22, type: 'flat', stat: 'eleDmg' },
    { name: 'Stun Chance', min: 2, max: 8, type: 'flat', stat: 'stunChance' },
    { name: 'Cooldown Reduction', min: 5, max: 15, type: 'flat', stat: 'cdr' }
];

const SELL_VALUES = {
    common: { gold: 10 },
    uncommon: { gold: 25 },
    rare: { gold: 50 },
    epic: { gold: 100 },
    legendary: { soulGems: 1 },
    unique: { soulGems: 5 }
};

// Remove misplaced `luck` from any item in the pool that isn't a weapon/charm/ring/amulet
(function sanitizeItemPoolLuck() {
    const allowedLuckTypes = ['weapon', 'charm'];
    Object.keys(itemPool).forEach(key => {
        const it = itemPool[key];
        if (it && it.luck && !allowedLuckTypes.includes(it.type)) {
            delete it.luck;
        }
    });
})();

// Ensure equipable items in the pool have an `equipSlot` matching their type
(function ensureEquipSlots() {
    const equipTypes = ['weapon','armor','helmet','shield','ring','amulet','boots','gloves','cape'];
    Object.keys(itemPool).forEach(key => {
        const it = itemPool[key];
        if (!it) return;
        if (!it.equipSlot && it.type && typeof it.type === 'string') {
            const t = it.type.trim().toLowerCase();
            if (t === 'charm') {
                // charms equip into the ring slot
                it.equipSlot = 'ring';
            } else if (equipTypes.includes(t)) {
                it.equipSlot = t;
            }
        }
    });
})();

// Auto-generate additional equipment items per level bracket (~40 per bracket)
(function generateBracketItems() {
const rarityMultipliers = { common: 1, uncommon: 1.5, rare: 2, epic: 3, legendary: 5, unique: 7.5, uber_unique: 9 };
    const equipTypes = ['weapon', 'armor', 'helmet', 'shield', 'ring', 'amulet', 'boots', 'gloves', 'cape'];
    const brackets = [
        { min: 1, max: 10, tag: '1-10' },
        { min: 10, max: 20, tag: '10-20' },
        { min: 20, max: 35, tag: '20-35' },
        { min: 35, max: 50, tag: '35-50' },
        { min: 50, max: 60, tag: '50-60' }
    ];

    const prefixes = ['Bronze','Iron','Steel','Shadow','Cinder','Storm','Void','Dragon','Obsidian','Gleaming','Swift','Ancient','Eternal','Dread','Frost','Flame','Thunder','Mystic','Elder','Runed'];
    const nouns = {
        weapon: ['Sword','Dagger','Axe','Blade','Staff','Hammer','Spear','Mace','Saber'],
        armor: ['Vest','Mail','Plate','Hauberk','Breastplate','Raiment'],
        helmet: ['Cap','Helm','Crown','Mask','Visor'],
        shield: ['Shield','Buckler','Barrier','Aegis'],
        boots: ['Boots','Sandals','Treads','Steps','Greaves'],
        gloves: ['Gloves','Gauntlets','Grips','Mitts'],
        cape: ['Cloak','Cape','Shroud','Mantle','Wrap'],
        ring: ['Ring','Band','Loop'],
        amulet: ['Pendant','Amulet','Charm','Talisman']
    };

    function localPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function pickRarity() {
        const r = Math.random();
        if (r < 0.45) return 'common';
        if (r < 0.75) return 'uncommon';
        if (r < 0.92) return 'rare';
        if (r < 0.99) return 'epic';
        if (r < 0.998) return 'legendary';
        // Unique / Uber Unique generation is heavily nerfed
        if (r < 0.9998) {
            return Math.random() < 0.005 ? 'uber_unique' : 'unique';
        }
        return 'uber_unique';
    }
    
    function addUniqueAttributes(item) {
        // Unique items get 1-3 random attributes from pool
        const attributeCount = 1 + Math.floor(Math.random() * 3);
        const selectedAttributes = [];
        const usedIndices = new Set();
        
        for (let i = 0; i < attributeCount; i++) {
            let attrIndex;
            do {
                attrIndex = Math.floor(Math.random() * UNIQUE_ATTRIBUTE_POOL.length);
            } while (usedIndices.has(attrIndex));
            usedIndices.add(attrIndex);
            
            const attr = UNIQUE_ATTRIBUTE_POOL[attrIndex];
            const value = attr.min + Math.floor(Math.random() * (attr.max - attr.min + 1));
            
            selectedAttributes.push({
                name: attr.name,
                value: value,
                type: attr.type
            });
            
            // Add attribute to item
            item[attr.stat] = value;
        }
        
        // Build description suffix
        const attrDesc = selectedAttributes.map(a => `+${a.value}${a.type === 'percentage' ? '%' : ''} ${a.name}`).join(', ');
        item.desc += ` | ${attrDesc}`;
        
        return item;
    }

    function uniqueName(base) {
        let name = base;
        let i = 1;
        while (itemPool[name]) {
            name = `${base} ${i}`;
            i++;
        }
        return name;
    }

    brackets.forEach(br => {
        const avgLevel = Math.floor((br.min + br.max) / 2);
        for (let i = 0; i < 40; i++) {
            const type = localPick(equipTypes);
            const rarity = pickRarity();
            const rarityMul = rarityMultipliers[rarity] || 1;
            const baseStat = Math.max(1, Math.round(avgLevel * 0.45));
            const levelMul = 1 + (avgLevel / 40); // modest scaling with level
            const variance = 0.85 + Math.random() * 0.3;
            const statVal = Math.max(1, Math.round(baseStat * rarityMul * levelMul * variance));

            // choose noun based on type
            const nounList = nouns[type] || ['Item'];
            const prefix = localPick(prefixes);
            const noun = localPick(nounList);
            const baseName = `${prefix} ${noun} (${br.tag})`;
            const name = uniqueName(baseName);

            const levelReq = Math.max(br.min, Math.floor(br.min + Math.random() * (br.max - br.min + 1)));

            const item = { name, type, equipSlot: type, levelReq, rarity, desc: '' };

            // assign stats by type
            if (type === 'weapon') {
                item.atk = statVal;
                // occasional small crit or luck on weapons
                if (Math.random() < 0.12) item.crit = Math.max(1, Math.round(statVal / 10));
                if (Math.random() < 0.08) item.luck = Math.max(1, Math.round(statVal / 12));
                item.desc = `+${item.atk} ATK` + (item.crit ? `, +${item.crit}% CRIT` : '') + (item.luck ? `, +${item.luck} LUCK` : '');
            } else if (['armor','helmet','shield','boots','gloves','cape'].includes(type)) {
                item.def = statVal;
                // gloves/cape may have atk/crit
                if (type === 'gloves' && Math.random() < 0.2) item.atk = Math.max(1, Math.round(statVal * 0.4));
                if (type === 'cape' && Math.random() < 0.15) item.crit = Math.max(1, Math.round(statVal / 8));
                item.desc = `+${item.def} DEF` + (item.atk ? `, +${item.atk} ATK` : '') + (item.crit ? `, +${item.crit}% CRIT` : '');
            } else if (type === 'ring' || type === 'amulet') {
                // support small bonuses
                if (Math.random() < 0.5) {
                    item.atk = Math.max(1, Math.round(statVal * 0.3));
                } else {
                    item.def = Math.max(1, Math.round(statVal * 0.25));
                }
                if (Math.random() < 0.25) item.crit = Math.max(1, Math.round(statVal / 12));
                item.desc = `${item.atk ? `+${item.atk} ATK` : ''}${item.def ? `${item.atk ? ', ' : ''}+${item.def} DEF` : ''}${item.crit ? `, +${item.crit}% CRIT` : ''}`;
            }

            // final touches
            item.desc = item.desc || `Level ${levelReq} ${rarity} ${type}`;
            
            // Add special attributes for Unique items
            if (rarity === 'unique') {
                addUniqueAttributes(item);
            }

            // insert into pool
            itemPool[name] = item;
        }
    });
})();

rebuildCraftingRecipes();

// Make available globally for browser and other non-module script environments
globalThis.itemPool = itemPool;
globalThis.scrollPool = scrollPool;
globalThis.craftingRecipes = craftingRecipes;
globalThis.SPECIAL_CRAFTING_RECIPES = SPECIAL_CRAFTING_RECIPES;
globalThis.rebuildCraftingRecipes = rebuildCraftingRecipes;
globalThis.UNIQUE_CRAFT_UBER_DROP_CHANCE = UNIQUE_CRAFT_UBER_DROP_CHANCE;
globalThis.UNIQUE_ATTRIBUTE_POOL = UNIQUE_ATTRIBUTE_POOL;
globalThis.SELL_VALUES = SELL_VALUES;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { itemPool, scrollPool, craftingRecipes, rebuildCraftingRecipes, UNIQUE_CRAFT_UBER_DROP_CHANCE, UNIQUE_ATTRIBUTE_POOL, SELL_VALUES };
}