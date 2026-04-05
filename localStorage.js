/**
 * Local Storage Manager for Realm of Shadows
 * Handles saving, loading, and managing game state in browser localStorage
 */

const STORAGE_KEY = 'realmOfShadows';
const STORAGE_VERSION = '1.0';
const MAX_INVENTORY_ITEMS = 50;

/**
 * Creates a clean copy of gameState for saving (excludes non-essential logs and temp data)
 * This reduces storage size and prevents quota exceeded errors
 */
function getCleanGameState(gameState) {
    const clean = JSON.parse(JSON.stringify(gameState));
    
    // Remove ALL non-essential data
    clean.battleLog = [];
    clean.itemLog = [];
    clean.chatMessages = [];
    clean.fakePlayers = [];
    clean.auctionItems = [];
    clean.wandering.log = [];
    clean.worldBossDamage = {};
    clean.worldBossTotalDamage = 0;
    
    // Aggressively cap large arrays to prevent quota issues
    // Cap inventory to 30 items max
    if (clean.inventory && clean.inventory.length > 30) {
        clean.inventory = clean.inventory.slice(0, 30);
    }
    
    // Cap scrolls to 10 max
    if (clean.scrolls && clean.scrolls.length > 10) {
        clean.scrolls = clean.scrolls.slice(0, 10);
    }
    
    // Remove all descriptions and flavor text from equipment and items to save space
    if (clean.inventory) {
        clean.inventory.forEach(item => {
            if (item) {
                // Keep only essential item properties
                // Remove: desc, lore, flavorText, notes
                if (item.desc) delete item.desc;
            }
        });
    }
    
    Object.keys(clean.equipment || {}).forEach(slot => {
        const eq = clean.equipment[slot];
        if (eq && eq.desc) delete eq.desc;
    });
    
    // Cap quests/completed quests to prevent bloat
    if (clean.quests && clean.quests.length > 20) {
        clean.quests = clean.quests.slice(0, 20);
    }
    if (clean.completedQuests && clean.completedQuests.length > 50) {
        clean.completedQuests = clean.completedQuests.slice(0, 50);
    }
    
    // Remove guildQuests (can be re-fetched)
    clean.guildQuests = [];
    clean.guildQuestProgress = {};
    
    return clean;
}

/**
 * Gets detailed size breakdown of gameState by section
 */
function getStateSize(gameState, label = 'gameState') {
    const sections = {
        player: gameState.player,
        equipment: gameState.equipment,
        inventory: gameState.inventory,
        quests: gameState.quests,
        scrolls: gameState.scrolls,
        wandering: gameState.wandering,
        other: Object.fromEntries(
            Object.entries(gameState).filter(([k]) => 
                !['player', 'equipment', 'inventory', 'quests', 'scrolls', 'wandering'].includes(k)
            )
        )
    };
    
    const sizes = {};
    let total = 0;
    Object.entries(sections).forEach(([name, data]) => {
        const size = new Blob([JSON.stringify(data)]).size;
        sizes[name] = size;
        total += size;
    });
    
    console.log(`📊 ${label} size breakdown:`);
    Object.entries(sizes).forEach(([section, size]) => {
        const percent = ((size / total) * 100).toFixed(1);
        console.log(`  ${section}: ${size} bytes (${percent}%)`);
    });
    console.log(`  TOTAL: ${total} bytes`);
    
    return { sizes, total };
}

/**
 * Gets the current storage usage in bytes
 */
function getStorageUsage() {
    try {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    } catch (e) {
        return 0;
    }
}

/**
 * Gets the approximate storage quota in bytes (usually 5-10MB)
 */
function getStorageQuota() {
    if (navigator.storage && navigator.storage.estimate) {
        return navigator.storage.estimate().then(estimate => {
            return {
                usage: estimate.usage,
                quota: estimate.quota,
                percent: Math.round((estimate.usage / estimate.quota) * 100)
            };
        });
    }
    return Promise.resolve({
        usage: getStorageUsage(),
        quota: 5242880, // Default 5MB
        percent: Math.round((getStorageUsage() / 5242880) * 100)
    });
}

/**
 * Saves game state to localStorage with automatic cleanup on quota exceeded
 */
function saveToLocalStorage(gameState, onSuccess, onError) {
    try {
        console.log('🔄 Attempting to save game...');
        
        // LEVEL 1: Normal save with cleaned data
        const cleanState = getCleanGameState(gameState);
        let json = JSON.stringify(cleanState);
        let size = new Blob([json]).size;
        console.log(`Level 1 - Save size: ${size} bytes (cleaned)`);
        
        try {
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved successfully (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved successfully!');
            return;
        } catch (e) {
            if (!(e instanceof DOMException && e.name === 'QuotaExceededError')) {
                throw e;
            }
        }
        
        // LEVEL 2: Aggressive cleanup - reduce inventory and scrolls
        console.warn('⚠️ Level 1 failed, attempting Level 2 cleanup (reduce items)...');
        const level2 = getCleanGameState(gameState);
        level2.inventory = level2.inventory.slice(0, 15);
        level2.scrolls = level2.scrolls.slice(0, 5);
        level2.quests = [];
        level2.completedQuests = level2.completedQuests.slice(0, 20);
        json = JSON.stringify(level2);
        size = new Blob([json]).size;
        console.log(`Level 2 - Save size: ${size} bytes`);
        
        try {
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved with aggressive cleanup (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved (inventory reduced to fit storage)!');
            return;
        } catch (e) {
            if (!(e instanceof DOMException && e.name === 'QuotaExceededError')) {
                throw e;
            }
        }
        
        // LEVEL 3: Extreme cleanup - save only essentials
        console.warn('⚠️ Level 2 failed, attempting Level 3 cleanup (minimal data)...');
        const level3 = {
            player: gameState.player,
            equipment: gameState.equipment,
            inventory: gameState.inventory.slice(0, 5),
            scrolls: gameState.scrolls.slice(0, 2),
            soulGems: gameState.soulGems,
            dungeonStage: gameState.dungeonStage,
            highestDungeonStage: gameState.highestDungeonStage,
            quests: [],
            completedQuests: [],
            jobsCompleted: gameState.jobsCompleted,
            premiumMultiplier: gameState.premiumMultiplier,
            soulGems: gameState.soulGems,
            bossActive: false,
            worldBossActive: false
        };
        json = JSON.stringify(level3);
        size = new Blob([json]).size;
        console.log(`Level 3 - Save size: ${size} bytes`);
        
        try {
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved with minimal data (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved (minimal mode - clear browser cache to restore full saves)!');
            return;
        } catch (e) {
            if (!(e instanceof DOMException && e.name === 'QuotaExceededError')) {
                throw e;
            }
        }
        
        // LEVEL 4: Clear old storage and try again
        console.warn('⚠️ Level 3 failed, clearing old storage and retrying...');
        try {
            // Try to free up space by removing other data
            const keysToCheck = Object.keys(localStorage);
            let freedSpace = 0;
            keysToCheck.forEach(key => {
                if (key !== STORAGE_KEY && key.includes('auth') === false) {
                    freedSpace += localStorage[key].length;
                    localStorage.removeItem(key);
                }
            });
            console.log(`Freed ${freedSpace} bytes`);
            
            // Try saving again with level 3 data
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved after clearing other data (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved after cleanup!');
            return;
        } catch (e) {
            // Final failure
            console.error('❌ All save attempts failed:', e);
            if (onError) onError('❌ Save failed: Storage quota exceeded. Clear browser data (Settings > Clear browsing data > Cookies and cached images)');
        }
    } catch (e) {
        console.error('Save error:', e);
        if (onError) onError(`❌ Failed to save game: ${e.message}`);
    }
}

/**
 * Loads game state from localStorage
 */
function loadFromLocalStorage(onSuccess, onError) {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log(`✅ Game loaded from localStorage`);
            if (onSuccess) onSuccess(parsed);
            return parsed;
        } else {
            console.warn('No save file found in localStorage');
            if (onError) onError('⚠️ No save file found!');
            return null;
        }
    } catch (e) {
        console.error('Load error:', e);
        if (onError) onError(`❌ Failed to load game: ${e.message}`);
        return null;
    }
}

/**
 * Checks if a save file exists in localStorage
 */
function hasSaveFile() {
    return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Deletes the save file from localStorage
 */
function deleteSaveFile(onSuccess, onError) {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('✅ Save file deleted from localStorage');
        if (onSuccess) onSuccess('Save file deleted!');
    } catch (e) {
        console.error('Delete error:', e);
        if (onError) onError(`Failed to delete save file: ${e.message}`);
    }
}

/**
 * Clears ALL localStorage data for the game
 */
function clearAllLocalStorage(onSuccess, onError) {
    try {
        localStorage.clear();
        console.log('✅ All localStorage data cleared');
        if (onSuccess) onSuccess('All data cleared!');
    } catch (e) {
        console.error('Clear error:', e);
        if (onError) onError(`Failed to clear storage: ${e.message}`);
    }
}

/**
 * Gets save file info (size, timestamp if available)
 */
function getSaveFileInfo() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;
        
        const size = new Blob([saved]).size;
        return {
            exists: true,
            sizeBytes: size,
            sizeKB: (size / 1024).toFixed(2),
            lastSaved: new Date().toLocaleString() // Note: localStorage doesn't track modification time
        };
    } catch (e) {
        console.error('Error getting save info:', e);
        return null;
    }
}

// Export for use in HTML (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCleanGameState,
        getStateSize,
        getStorageUsage,
        getStorageQuota,
        saveToLocalStorage,
        loadFromLocalStorage,
        hasSaveFile,
        deleteSaveFile,
        clearAllLocalStorage,
        getSaveFileInfo,
        debugStorage
    };
}

/**
 * Debug function to analyze storage and show recommendations
 * Call from console: debugStorage()
 */
function debugStorage() {
    console.clear();
    console.log('🔍 Storage Diagnostics');
    console.log('═'.repeat(50));
    
    // Current storage usage
    const usage = getStorageUsage();
    console.log(`\n📦 Total localStorage used: ${usage} bytes (${(usage / 1024).toFixed(2)} KB)`);
    
    // Storage quota
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimate => {
            const quota = estimate.quota;
            const percent = Math.round((estimate.usage / quota) * 100);
            console.log(`📊 Storage quota: ${quota} bytes (${(quota / 1024 / 1024).toFixed(2)} MB)`);
            console.log(`📈 Usage: ${percent}%`);
            
            if (percent > 90) {
                console.warn('⚠️  WARNING: Storage nearly full! Consider clearing browser data.');
            }
        });
    }
    
    // List all items in storage
    console.log('\n📋 Items in localStorage:');
    Object.keys(localStorage).forEach(key => {
        const size = localStorage[key].length;
        console.log(`  - "${key}": ${size} bytes`);
    });
    
    // Game state size breakdown if game loaded
    if (typeof gameState !== 'undefined') {
        console.log('\n📊 Game State Size Breakdown:');
        getStateSize(gameState, 'Full gameState');
        
        console.log('\n📊 Cleaned Game State Size:');
        const cleanState = getCleanGameState(gameState);
        getStateSize(cleanState, 'Cleaned gameState');
    }
    
    console.log('\n💡 Recommendations:');
    console.log('  1. Open DevTools > Application > Cookies > Delete site data');
    console.log('  2. Or use: clearAllLocalStorage()');
    console.log('  3. Reduce inventory to fewer items');
    console.log('  4. Clear scrolls you don\'t need');
}
