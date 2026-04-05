/**
 * Local Storage Manager for Realm of Shadows
 * Handles saving, loading, and managing game state in browser localStorage
 */

const STORAGE_KEY = 'realmOfShadows';
const STORAGE_VERSION = '1.0';
const MAX_INVENTORY_ITEMS = 50;

/**
 * ITEM COMPRESSION SYSTEM
 * Stores items by reference instead of full objects to drastically reduce save size
 * Items are looked up from the itemPool (defined in items.js) during decompression
 */

/**
 * Compresses inventory items into minimal format: [name, qty, overrides]
 * Most item properties come from itemPool, only store name + qty + level-based stat overrides
 */
function compressInventory(inventory) {
    if (!inventory || !Array.isArray(inventory)) return [];
    
    return inventory.filter(item => !!item).map(item => {
        // Store only: name, quantity, and any overrides (stats that differ from base)
        const compressed = [item.name || '', item.qty || 1];
        
        // Only store luck/stat overrides if they exist
        const overrides = {};
        if (item.luck !== undefined && item.luck !== 0) overrides.l = item.luck;
        if (item.ml !== undefined && item.ml !== 0) overrides.m = item.ml;
        if (item.atk !== undefined) overrides.a = item.atk;
        if (item.def !== undefined) overrides.d = item.def;
        if (item.hp !== undefined) overrides.h = item.hp;
        if (item.mp !== undefined) overrides.p = item.mp;
        
        if (Object.keys(overrides).length > 0) {
            compressed.push(overrides);
        }
        
        return compressed;
    });
}

/**
 * Decompresses inventory back into full item objects
 * Looks up item definitions from itemPool
 */
function decompressInventory(compressed) {
    if (!compressed || !Array.isArray(compressed)) return [];
    if (typeof itemPool === 'undefined') {
        console.warn('⚠️ itemPool not available, cannot decompress inventory');
        return [];
    }
    
    return compressed.filter(item => !!item && item[0]).map(item => {
        const [name, qty, overrides] = item;
        const baseItem = itemPool[name];
        
        if (!baseItem) {
            console.warn(`⚠️ Item not found in pool: ${name}`);
            return { name, qty, type: 'error' };
        }
        
        // Reconstruct full item from base definition + overrides
        const full = { ...baseItem, qty };
        
        if (overrides) {
            if (overrides.l !== undefined) full.luck = overrides.l;
            if (overrides.m !== undefined) full.ml = overrides.m;
            if (overrides.a !== undefined) full.atk = overrides.a;
            if (overrides.d !== undefined) full.def = overrides.d;
            if (overrides.h !== undefined) full.hp = overrides.h;
            if (overrides.p !== undefined) full.mp = overrides.p;
        }
        
        return full;
    });
}

/**
 * Compresses equipment into minimal format
 * Equipment keys are standardized, store as [itemName, ml, luck]
 */
function compressEquipment(equipment) {
    if (!equipment || typeof equipment !== 'object') return {};
    
    const compressed = {};
    Object.entries(equipment).forEach(([slot, item]) => {
        if (item && item.name) {
            // Store as [name, magicLevel, luck] for equipment
            const data = [item.name];
            if (item.ml !== undefined && item.ml !== 0) data.push(item.ml);
            if (item.luck !== undefined && item.luck !== 0) {
                if (data.length === 1) data.push(0); // ml placeholder
                data.push(item.luck);
            }
            compressed[slot] = data;
        } else {
            compressed[slot] = null;
        }
    });
    
    return compressed;
}

/**
 * Decompresses equipment back into full item objects
 */
function decompressEquipment(compressed) {
    if (!compressed || typeof itemPool === 'undefined') return compressed;
    
    const decompressed = {};
    Object.entries(compressed).forEach(([slot, data]) => {
        if (!data) {
            decompressed[slot] = null;
        } else if (Array.isArray(data)) {
            const [name, ml, luck] = data;
            const baseItem = itemPool[name];
            if (baseItem) {
                decompressed[slot] = { 
                    ...baseItem, 
                    ml: ml || 0,
                    luck: luck || 0
                };
            } else {
                decompressed[slot] = null;
            }
        } else {
            decompressed[slot] = data;
        }
    });
    
    return decompressed;
}

/**
 * Compresses scrolls array
 */
function compressScrolls(scrolls) {
    if (!scrolls || !Array.isArray(scrolls)) return [];
    
    return scrolls.filter(s => !!s).map(s => {
        // Store scroll as [name, level]
        return [s.name || '', s.level || 1];
    });
}

/**
 * Decompresses scrolls back into full objects
 */
function decompressScrolls(compressed) {
    if (!compressed || !Array.isArray(compressed)) return [];
    
    return compressed.filter(s => !!s).map(s => {
        if (Array.isArray(s) && s[0]) {
            const [name, level] = s;
            return { name, level, effect: 'scroll' };
        }
        return s;
    });
}

/**
 * Creates a clean copy of gameState for saving (excludes non-essential logs and temp data)
 * This reduces storage size and prevents quota exceeded errors
 */
function getCleanGameState(gameState, compress = true) {
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
    
    // COMPRESSION: Convert items to compressed format
    if (compress) {
        clean.inventory = compressInventory(clean.inventory);
        clean.equipment = compressEquipment(clean.equipment);
        clean.scrolls = compressScrolls(clean.scrolls);
        clean._compressed = true; // Flag indicating data is compressed
    }
    
    return clean;
}
    
    return clean;
}

/**
 * Gets detailed size breakdown of gameState by section
 */
function getStateSize(gameState, label = 'gameState', compressed = false) {
    let toAnalyze = gameState;
    
    if (compressed) {
        // For compressed state, temporarily decompress for analysis
        toAnalyze = {
            ...gameState,
            inventory: decompressInventory(gameState.inventory),
            equipment: decompressEquipment(gameState.equipment),
            scrolls: decompressScrolls(gameState.scrolls)
        };
    }
    
    const sections = {
        player: toAnalyze.player,
        equipment: toAnalyze.equipment,
        inventory: toAnalyze.inventory,
        quests: toAnalyze.quests,
        scrolls: toAnalyze.scrolls,
        wandering: toAnalyze.wandering,
        other: Object.fromEntries(
            Object.entries(toAnalyze).filter(([k]) => 
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
        
        // LEVEL 1: Normal save with compression
        const cleanState = getCleanGameState(gameState, true); // Enable compression
        let json = JSON.stringify(cleanState);
        let size = new Blob([json]).size;
        console.log(`Level 1 - Save size: ${size} bytes (compressed)`);
        
        try {
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved successfully (${size} bytes - ${((size/1024).toFixed(2))} KB)`);
            if (onSuccess) onSuccess('✅ Game saved successfully!');
            return;
        } catch (e) {
            if (!(e instanceof DOMException && e.name === 'QuotaExceededError')) {
                throw e;
            }
        }
        
        // LEVEL 2: Already compressed, reduce quest history
        console.warn('⚠️ Level 1 failed, attempting Level 2 cleanup (reduce history)...');
        const level2 = getCleanGameState(gameState, true);
        level2.completedQuests = level2.completedQuests.slice(0, 20);
        level2.quests = [];
        json = JSON.stringify(level2);
        size = new Blob([json]).size;
        console.log(`Level 2 - Save size: ${size} bytes`);
        
        try {
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved with reduced history!');
            return;
        } catch (e) {
            if (!(e instanceof DOMException && e.name === 'QuotaExceededError')) {
                throw e;
            }
        }
        
        // LEVEL 3: Clear old storage and retry
        console.warn('⚠️ Level 2 failed, clearing other storage...');
        try {
            const keysToCheck = Object.keys(localStorage);
            let freedSpace = 0;
            keysToCheck.forEach(key => {
                if (key !== STORAGE_KEY) {
                    freedSpace += localStorage[key].length;
                    localStorage.removeItem(key);
                }
            });
            console.log(`Freed ${freedSpace} bytes`);
            
            // Try Level 1 data again
            const retryData = getCleanGameState(gameState, true);
            json = JSON.stringify(retryData);
            localStorage.setItem(STORAGE_KEY, json);
            console.log(`✅ Game saved after clearing other data (${size} bytes)`);
            if (onSuccess) onSuccess('✅ Game saved!');
            return;
        } catch (e) {
            // Final failure
            console.error('❌ All save attempts failed:', e);
            if (onError) onError('❌ Save failed: Storage full. Clear browser data (DevTools > Application > Clear Site Data)');
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
            let parsed = JSON.parse(saved);
            
            // DECOMPRESSION: If data was compressed, decompress it
            if (parsed._compressed) {
                console.log('🔄 Decompressing saved game state...');
                parsed.inventory = decompressInventory(parsed.inventory);
                parsed.equipment = decompressEquipment(parsed.equipment);
                parsed.scrolls = decompressScrolls(parsed.scrolls);
                delete parsed._compressed; // Remove compression flag
            }
            
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
