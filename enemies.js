// ENEMY TIERS - Scaled for level 50 max
const ENEMY_TIERS = {
    0: { hp: 20, atk: 5, def: 1, xp: 15, gold: 5, rarity: 'common' },
    1: { hp: 35, atk: 8, def: 2, xp: 25, gold: 10, rarity: 'common' },
    2: { hp: 55, atk: 12, def: 5, xp: 45, gold: 25, rarity: 'uncommon' },
    3: { hp: 85, atk: 16, def: 8, xp: 70, gold: 40, rarity: 'uncommon' },
    4: { hp: 120, atk: 22, def: 12, xp: 110, gold: 70, rarity: 'rare' },
    5: { hp: 180, atk: 28, def: 16, xp: 200, gold: 120, rarity: 'rare' },
    6: { hp: 300, atk: 38, def: 22, xp: 500, gold: 250, rarity: 'epic' },
    7: { hp: 500, atk: 50, def: 30, xp: 1000, gold: 500, rarity: 'legendary' },
    8: { hp: 800, atk: 65, def: 40, xp: 2000, gold: 800, rarity: 'legendary' },
    9: { hp: 1200, atk: 85, def: 55, xp: 3500, gold: 1200, rarity: 'legendary' },
    10: { hp: 1800, atk: 110, def: 70, xp: 5000, gold: 1800, rarity: 'legendary' }
};

// ENEMY NAME DATABASE - More enemies for variety
const ENEMY_NAME_DB = {
    // TIER 0-1: Level 1-5 (Common)
    'rat': { tier: 0, rarity: 'common', drops: ['Health Potion'] },
    'slime': { tier: 0, rarity: 'common', drops: ['Mana Potion'] },
    'wolf': { tier: 1, rarity: 'common', drops: ['Wolf Pelt'] },
    'goblin': { tier: 1, rarity: 'common', drops: ['Goblin Ears'] },
    'forest_sprite': { tier: 1, rarity: 'common', drops: ['Sprite Dust'] },
    'giant_bat': { tier: 1, rarity: 'common', drops: ['Bat Wing'] },
    'bandit': { tier: 1, rarity: 'common', drops: ['Iron Ore', 'Copper Ring'] },
    
    // TIER 2-3: Level 8-15 (Uncommon)
    'dark_wolf': { tier: 2, rarity: 'uncommon', drops: ['Dark Pelt'] },
    'wraith': { tier: 2, rarity: 'uncommon', drops: ['Wraith Essence'] },
    'rock_golem': { tier: 2, rarity: 'uncommon', drops: ['Stone Core'] },
    'harpy': { tier: 2, rarity: 'uncommon', drops: ['Harpy Feather'] },
    'orc_warrior': { tier: 2, rarity: 'uncommon', drops: ['Iron Ore', 'Battle Axe'] },
    'skeleton_knight': { tier: 3, rarity: 'uncommon', drops: ['Ancient Bone', 'Iron Helm'] },
    'forest_troll': { tier: 3, rarity: 'uncommon', drops: ['Cave Troll Hide'] },
    'pixie_swarm': { tier: 3, rarity: 'uncommon', drops: ['Pixie Wings', 'Sprite Dust'] },
    'wolf_alpha': { tier: 3, rarity: 'uncommon', drops: ['Dark Pelt', 'Wolf Pelt'] },
    
    // TIER 4-5: Level 18-30 (Rare)
    'dark_knight': { tier: 4, rarity: 'rare', drops: ['Dark Armor', 'Cursed Blade'] },
    'young_dragon': { tier: 4, rarity: 'rare', drops: ['Dragon Scale', 'Dragon Claw'] },
    'cave_troll': { tier: 4, rarity: 'rare', drops: ['Cave Troll Hide'] },
    'dark_guard': { tier: 4, rarity: 'rare', drops: ['Dark Helmet', 'Dark Shield'] },
    'necromancer': { tier: 4, rarity: 'rare', drops: ['Wraith Essence', 'Ancient Bone'] },
    'wyvern': { tier: 5, rarity: 'rare', drops: ['Dragon Scale', 'Harpy Feather'] },
    'stone_giant': { tier: 5, rarity: 'rare', drops: ['Stone Core', 'Magic Stone'] },
    'phantom_warrior': { tier: 5, rarity: 'rare', drops: ['Shadow Essence', 'Wraith Essence'] },
    'elder_troll': { tier: 5, rarity: 'rare', drops: ['Cave Troll Hide', 'Magic Stone'] },
    'vampire_spawn': { tier: 5, rarity: 'rare', drops: ['Dark Pelt', 'Wraith Essence'] },
    
    // TIER 6: Level 35-42 (Epic)
    'dragon': { tier: 6, rarity: 'epic', drops: ['Dragon Heart', 'Dragon Scale'] },
    'shadow_mage': { tier: 6, rarity: 'epic', drops: ['Shadow Staff', 'Shadow Essence'] },
    'demon_knight': { tier: 6, rarity: 'epic', drops: ['Demon Horn', 'Infernal Blade'] },
    'ancient_golem': { tier: 6, rarity: 'epic', drops: ['Stone Core', 'Mythril Ore'] },
    'elder_vampire': { tier: 6, rarity: 'epic', drops: ['Shadow Essence', 'Vampire Cape'] },
    'storm_elemental': { tier: 6, rarity: 'epic', drops: ['Magic Stone', 'Storm Hammer'] },
    
    // TIER 7: Level 45-50 (Legendary)
    'shadow_lord': { tier: 7, rarity: 'legendary', drops: ['Shadow Crown', 'Soul Blade'] },
    'elder_dragon': { tier: 7, rarity: 'legendary', drops: ['Dragon Heart', 'Dragon Scale', 'Phoenix Feather'] },
    'demon_prince': { tier: 7, rarity: 'legendary', drops: ['Demon Horn', 'Void Crystal'] },
    'lich_king': { tier: 7, rarity: 'legendary', drops: ['Wraith Essence', 'Ancient Bone', 'Void Crystal'] },
    'titan': { tier: 7, rarity: 'legendary', drops: ['Stone Core', 'Mythril Ore', 'Void Crystal'] },
    
    // TIER 8: Level 50-55 (Super Bosses)
    'void_harbinger': { tier: 8, rarity: 'legendary', drops: ['Void Crystal', 'Shadow Essence', 'Soul Gem'] },
    'abyssal_knight': { tier: 8, rarity: 'legendary', drops: ['Demon Horn', 'Shadow Plate', 'Void Crystal'] },
    'infernal_dragon': { tier: 8, rarity: 'legendary', drops: ['Dragon Heart', 'Dragon Scale', 'Demon Horn'] },
    'frost_lich': { tier: 8, rarity: 'legendary', drops: ['Ancient Bone', 'Wraith Essence', 'Magic Stone'] },
    
    // TIER 9: Level 55-60 (Ultimate Bosses)
    'chaos_dragon': { tier: 9, rarity: 'legendary', drops: ['Dragon Heart', 'Phoenix Feather', 'Void Crystal'] },
    'demon_titan': { tier: 9, rarity: 'legendary', drops: ['Demon Horn', 'Mythril Ore', 'Dragon Heart'] },
    'void_reaper': { tier: 9, rarity: 'legendary', drops: ['Shadow Essence', 'Void Crystal', 'Soul Gem'] },
    'storm_titan': { tier: 9, rarity: 'legendary', drops: ['Stone Core', 'Storm Hammer', 'Mythril Ore'] },
    
    // TIER 10: Level 60 (Final Bosses)
    'apocalypse': { tier: 10, rarity: 'legendary', drops: ['Void Crystal', 'Soul Gem', 'Soul Gem'] },
    'void_emperor': { tier: 10, rarity: 'legendary', drops: ['Void Crystal', 'Void Crystal', 'Phoenix Feather'] },
    'eternal_dragon': { tier: 10, rarity: 'legendary', drops: ['Dragon Heart', 'Phoenix Feather', 'Dragon Scale'] },
    'primordial_demon': { tier: 10, rarity: 'legendary', drops: ['Demon Horn', 'Infernal Blade', 'Void Crystal'] }
};

// WORLD BOSSES
const WORLD_BOSSES = [
    { name: 'Ancient Dragon King', tier: 8, hp: 5000, atk: 60, def: 40, xp: 2000, gold: 1000, drops: ['Dragon Heart', 'Soul Gem'] },
    { name: 'Shadow Demon Lord', tier: 8, hp: 4500, atk: 70, def: 35, xp: 1800, gold: 900, drops: ['Demon Horn', 'Soul Gem'] },
    { name: 'Lich King Eternal', tier: 8, hp: 4000, atk: 55, def: 45, xp: 1900, gold: 950, drops: ['Ancient Bone', 'Soul Gem'] },
    { name: 'Titan of Destruction', tier: 9, hp: 8000, atk: 90, def: 60, xp: 4000, gold: 2000, drops: ['Mythril Ore', 'Void Crystal', 'Soul Gem'] },
    { name: 'Void Emperor', tier: 10, hp: 12000, atk: 120, def: 80, xp: 6000, gold: 3000, drops: ['Void Crystal', 'Soul Gem', 'Soul Gem'] }
];

// PROCESSED ENEMIES (generated from ENEMY_NAME_DB and ENEMY_TIERS)
const enemies = {};
Object.keys(ENEMY_NAME_DB).forEach(key => {
    const e = ENEMY_NAME_DB[key];
    const t = ENEMY_TIERS[e.tier];
    // Status effect infliction chance mapping per enemy
    const enemyDebuffMap = {
        // DOT Effects
        'dragon': { inflict: 'burn', chance: 35 },
        'young_dragon': { inflict: 'burn', chance: 25 },
        'elder_dragon': { inflict: 'burn', chance: 45 },
        'infernal_dragon': { inflict: 'burn', chance: 60 },
        'chaos_dragon': { inflict: 'burn', chance: 70 },
        'eternal_dragon': { inflict: 'burn', chance: 80 },
        'ancient_dragon_king': { inflict: 'burn', chance: 75 },
        'spider': { inflict: 'poison', chance: 30 },
        'necromancer': { inflict: 'poison', chance: 40 },
        'vampire_spawn': { inflict: 'bleed', chance: 35 },
        'elder_vampire': { inflict: 'bleed', chance: 50 },
        'frost_lich': { inflict: 'frostbite', chance: 45 },
        
        // Control Effects
        'storm_elemental': { inflict: 'paralysis', chance: 30 },
        'storm_titan': { inflict: 'paralysis', chance: 45 },
        'frost_lich': { inflict: 'freeze', chance: 35 },
        'rock_golem': { inflict: 'stun', chance: 25 },
        'stone_giant': { inflict: 'stun', chance: 35 },
        'ancient_golem': { inflict: 'stun', chance: 45 },
        'titan': { inflict: 'stun', chance: 55 },
        'demon_titan': { inflict: 'stun', chance: 60 },
        'forest_troll': { inflict: 'root', chance: 25 },
        'cave_troll': { inflict: 'root', chance: 35 },
        'elder_troll': { inflict: 'root', chance: 45 },
        'shadow_mage': { inflict: 'silence', chance: 35 },
        'shadow_lord': { inflict: 'silence', chance: 45 },
        'lich_king': { inflict: 'silence', chance: 50 },
        
        // Stat Debuffs
        'wraith': { inflict: 'weakness', chance: 25 },
        'phantom_warrior': { inflict: 'weakness', chance: 35 },
        'pixie_swarm': { inflict: 'slow', chance: 30 },
        'harpy': { inflict: 'slow', chance: 25 },
        'dark_knight': { inflict: 'curse', chance: 30 },
        'demon_knight': { inflict: 'curse', chance: 40 },
        'demon_prince': { inflict: 'curse', chance: 55 },
        'abyssal_knight': { inflict: 'vulnerability', chance: 35 },
        'void_harbinger': { inflict: 'exhaustion', chance: 40 },
        'void_reaper': { inflict: 'exhaustion', chance: 55 },
        'void_emperor': { inflict: 'exhaustion', chance: 65 },
        'apocalypse': { inflict: 'curse', chance: 70 },
        'primordial_demon': { inflict: 'vulnerability', chance: 60 },
        'shadow_demon_lord': { inflict: 'curse', chance: 65 }
    };

    enemies[key] = { 
        name: key.replace(/_/g, ' '), 
        hp: t.hp, 
        maxHp: t.hp, 
        atk: t.atk, 
        def: t.def, 
        xp: t.xp, 
        gold: t.gold, 
        drops: e.drops, 
        tier: e.tier, 
        rarity: e.rarity || t.rarity,
        inflictDebuff: enemyDebuffMap[key] || null
    };
});
