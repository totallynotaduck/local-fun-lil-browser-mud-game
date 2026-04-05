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
    // Remove non-essential data that accumulates and bloats storage
    clean.battleLog = [];
    clean.itemLog = [];
    clean.chatMessages = [];
    clean.fakePlayers = [];
    clean.auctionItems = [];
    clean.wandering.log = [];
    clean.worldBossDamage = {};
    clean.worldBossTotalDamage = 0;
    // Keep essential game state: player, equipment, inventory, quests, dungeons, etc.
    return clean;
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
        const cleanState = getCleanGameState(gameState);
        const json = JSON.stringify(cleanState);
        const size = new Blob([json]).size;
        console.log(`Save size: ${size} bytes (cleaned)`);
        
        try {
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved to localStorage (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved successfully!');
        } catch (e) {
            if (e instanceof DOMException && e.name === 'QuotaExceededError') {
                console.warn('Storage quota exceeded, attempting aggressive cleanup...');
                // Force aggressive cleanup and retry
                const aggressiveClean = getCleanGameState(gameState);
                aggressiveClean.inventory = aggressiveClean.inventory.slice(0, MAX_INVENTORY_ITEMS);
                aggressiveClean.scrolls = aggressiveClean.scrolls.slice(0, 20);
                const aggressiveJson = JSON.stringify(aggressiveClean);
                
                try {
                    localStorage.setItem(STORAGE_KEY, aggressiveJson);
                    console.log(`✅ Game saved with reduced inventory (${aggressiveJson.length} bytes)`);
                    if (onSuccess) onSuccess('✅ Game saved with reduced inventory!');
                } catch (e2) {
                    console.error('Save failed even after aggressive cleanup:', e2);
                    if (onError) onError(`❌ Save failed: Storage quota exceeded. Please clear browser data and try again.`);
                }
            } else {
                throw e;
            }
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
        getStorageUsage,
        getStorageQuota,
        saveToLocalStorage,
        loadFromLocalStorage,
        hasSaveFile,
        deleteSaveFile,
        clearAllLocalStorage,
        getSaveFileInfo
    };
}
