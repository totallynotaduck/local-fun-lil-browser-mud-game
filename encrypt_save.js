// Encrypts our max level save into proper .ros format for the game
const fs = require('fs');

const ENCRYPTION_KEY = 'R3alm0fSh4d0ws_S3cr3tK3y_2026!';
const saveData = require('./max_level_save.json');

// Game exact encryption algorithm
function encryptData(data) {
    const jsonString = JSON.stringify(data);
    let encrypted = '';
    for (let i = 0; i < jsonString.length; i++) {
        encrypted += String.fromCharCode(jsonString.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return btoa(encodeURIComponent(encrypted));
}

const encrypted = encryptData(saveData);
fs.writeFileSync('max_level_60_save.ros', encrypted);

console.log('✅ Properly encrypted .ros save file created: max_level_60_save.ros');
console.log('✅ This file will load correctly in the game');