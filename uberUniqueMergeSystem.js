// UBER UNIQUE INFINITE MERGE SYSTEM
// Allows infinite merging of Uber Unique items with +1, +2, +3 etc ranks
// ATK and DEF increase by 50% each merge

const UBER_UNIQUE_MERGE_RULES = {
    allowInfiniteMerge: true,
    baseItemRarity: 'uber_unique',
    mergeRequirements: {
        sameItem: true,
        requiredCount: 2,
        consumeMaterials: true
    },
    statIncreasePerMerge: {
        atk: 1.5,    // +50% ATK per merge
        def: 1.5,    // +50% DEF per merge
        crit: 1.1,   // +10% Crit per merge
        critDmg: 1.2, // +20% Crit Damage per merge
        other: 1.15  // +15% for all other stats
    },
    statExceptions: {
        // Stats that do NOT scale with merges
        doNotScale: ['name', 'levelReq', 'specialAbility', 'uberUnique', 'equipSlot', 'type', 'rarity']
    },
    maxMergeLevel: Infinity,
    namingPattern: '{name} +{level}',
    descriptionSuffix: '\n✨ Merged {level} times | ATK +50%, DEF +50% | All other stats increased'
};

// Function to merge two Uber Unique items
function mergeUberUniqueItems(baseItem, sacrificeItem) {
    // Allow both unique and uber_unique rarity items to be merged
    const allowedRarities = ['unique', 'uber_unique'];
    if (!allowedRarities.includes(baseItem.rarity) || !allowedRarities.includes(sacrificeItem.rarity)) {
        return null;
    }
    
    // Also check for the uberUnique boolean flag
    if (!(baseItem.uberUnique || sacrificeItem.uberUnique || baseItem.rarity === 'unique' || sacrificeItem.rarity === 'unique')) {
        return null;
    }
    
    // Strip merge suffixes before comparing names so different merge levels match as same item
    const stripMergeSuffix = (name) => name.replace(/ \+\d+$/, '');
    if (stripMergeSuffix(baseItem.name) !== stripMergeSuffix(sacrificeItem.name)) {
        return null;
    }
    
    const currentMergeLevel = baseItem.mergeLevel || 0;
    const newMergeLevel = currentMergeLevel + 1;
    
    const mergedItem = JSON.parse(JSON.stringify(baseItem));
    
    // Scale all stats
    Object.keys(mergedItem).forEach(stat => {
        if (UBER_UNIQUE_MERGE_RULES.statExceptions.doNotScale.includes(stat)) {
            return;
        }
        
        if (typeof mergedItem[stat] === 'number') {
            let multiplier;
            // Handle percentage stats properly (atk%, def%, etc.)
            const lowerStat = stat.toLowerCase();
            if (lowerStat === 'atk' || lowerStat === 'atk%' || lowerStat === 'attack' || lowerStat === 'attack%') {
                multiplier = UBER_UNIQUE_MERGE_RULES.statIncreasePerMerge.atk;
            } else if (lowerStat === 'def' || lowerStat === 'def%' || lowerStat === 'defense' || lowerStat === 'defense%') {
                multiplier = UBER_UNIQUE_MERGE_RULES.statIncreasePerMerge.def;
            } else if (lowerStat === 'crit' || lowerStat === 'crit%' || lowerStat === 'critchance' || lowerStat === 'crit_chance') {
                multiplier = UBER_UNIQUE_MERGE_RULES.statIncreasePerMerge.crit;
            } else if (lowerStat === 'critdmg' || lowerStat === 'crit_dmg' || lowerStat === 'critdamage' || lowerStat === 'crit_damage') {
                multiplier = UBER_UNIQUE_MERGE_RULES.statIncreasePerMerge.critDmg;
            } else {
                multiplier = UBER_UNIQUE_MERGE_RULES.statIncreasePerMerge.other;
            }
            
            // Use ceiling to ensure we always get at least +50% increase, no rounding loss
            mergedItem[stat] = Math.ceil(mergedItem[stat] * multiplier);
        }
    });
    
    mergedItem.mergeLevel = newMergeLevel;
    // Strip existing +N suffix before adding new merge level to prevent stacking
    const cleanItemName = baseItem.name.replace(/ \+\d+$/, '');
    mergedItem.name = `${cleanItemName} +${newMergeLevel}`;
    
    // Calculate cumulative percentage (1.5^level - 1) converted to integer percentage
    const totalAtkDefPercent = Math.round((Math.pow(1.5, newMergeLevel) - 1) * 100);
    mergedItem.desc = baseItem.desc.split('\n✨')[0] + `\n✨ Merged ${newMergeLevel} times | ATK +${totalAtkDefPercent}%, DEF +${totalAtkDefPercent}% | All other stats increased`;
    
    return mergedItem;
}

// Initialize merge flags on all uber unique items - call this AFTER ALL items are loaded
function initializeUberUniqueMergeFlags() {
    if (typeof itemPool === 'undefined') return;
    
    Object.keys(itemPool).forEach(key => {
        const item = itemPool[key];
        if (item.rarity === 'uber_unique' || item.uberUnique) {
            // Only set defaults if not already present
            if (item.canMerge === undefined) item.canMerge = true;
            if (item.mergeLevel === undefined) item.mergeLevel = 0;
        }
    });
}

// Auto initialize if itemPool already exists (for node environments)
if (typeof itemPool !== 'undefined' && Object.keys(itemPool).length > 0) {
    initializeUberUniqueMergeFlags();
}

// For browser: run initialization after document is fully loaded and all scripts have executed
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeUberUniqueMergeFlags);
    // Also run after all other scripts have finished processing
    setTimeout(initializeUberUniqueMergeFlags, 0);
}

// Also expose to window for browser environment
if (typeof window !== 'undefined') {
    window.mergeUberUniqueItems = mergeUberUniqueItems;
    window.initializeUberUniqueMergeFlags = initializeUberUniqueMergeFlags;
    window.UBER_UNIQUE_MERGE_RULES = UBER_UNIQUE_MERGE_RULES;
}

if (typeof module !== 'undefined') {
    module.exports = {
        UBER_UNIQUE_MERGE_RULES,
        mergeUberUniqueItems,
        initializeUberUniqueMergeFlags
    };
}
