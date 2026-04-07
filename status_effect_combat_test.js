const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const noop = () => {};
const fakeElement = () => ({
    style: {},
    classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
    innerHTML: '',
    textContent: '',
    value: '',
    disabled: false,
    title: '',
    appendChild: noop,
    removeChild: noop,
    insertBefore: noop,
    remove: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: noop,
    click: noop,
    scrollTop: 0,
    scrollHeight: 0,
    parentNode: null,
    children: []
});

const documentStub = {
    getElementById: () => fakeElement(),
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => fakeElement(),
    addEventListener: noop,
    body: fakeElement()
};

const localStorageStub = {
    store: Object.create(null),
    getItem(key) { return this.store[key] ?? null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; }
};

const mathProxy = Object.create(Math);
mathProxy.random = () => 0.42;

const context = {
    console,
    Math: mathProxy,
    Date,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    parseInt,
    parseFloat,
    isNaN,
    encodeURIComponent,
    decodeURIComponent,
    btoa: str => Buffer.from(str, 'binary').toString('base64'),
    atob: str => Buffer.from(str, 'base64').toString('binary'),
    setTimeout: () => 0,
    clearTimeout: noop,
    setInterval: () => 0,
    clearInterval: noop,
    confirm: () => true,
    alert: noop,
    Blob: function() {},
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL: noop },
    FileReader: function() { this.readAsText = noop; },
    indexedDB: undefined,
    localStorage: localStorageStub,
    location: { reload: noop },
    document: documentStub,
    window: null
};

context.window = context;
vm.createContext(context);

for (const file of ['items.js', 'uberUniqueItems.js', 'normalUniqueItems.js', 'level55UberUniques.js', 'enemies.js', 'uberUniqueMergeSystem.js']) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
if (!scriptMatch) throw new Error('Unable to locate inline script');
const inlineScript = scriptMatch[1].replace(/\binit\(\);\s*$/, '');
vm.runInContext(inlineScript, context, { filename: 'index.inline.js' });

vm.runInContext(`
globalThis.__testApi = {
    cloneData,
    gameState,
    dungeonState,
    COMBAT_STATUS_TEMPLATES,
    COMBAT_STATUS_RULES,
    INITIAL_GAME_STATE_SNAPSHOT,
    INITIAL_DUNGEON_STATE_SNAPSHOT,
    addPlayerStatusEffect,
    addEnemyStatusEffect,
    getPlayerStatusSnapshot,
    getEnemyStatusSnapshot,
    getActiveStatusEffectsForTarget,
    applyEndOfTurnPlayerStatusEffects,
    applyEndOfTurnEnemyStatusEffects,
    applyDamageToTarget,
    applyHealingToTarget,
    removeStatusEffectFromTarget,
    battleAction,
    battleUseItem,
    dungeonAction,
    dungeonUseItem,
    wanderingUseItem,
    attackWorldBoss,
    useItem,
    recalculateAllPlayerStats
};
`, context, { filename: 'status-effect-test-export.js' });

const api = context.__testApi;

function resetState() {
    vm.runInContext(`
        Object.keys(gameState).forEach(key => delete gameState[key]);
        Object.assign(gameState, cloneData(INITIAL_GAME_STATE_SNAPSHOT));
        Object.keys(dungeonState).forEach(key => delete dungeonState[key]);
        Object.assign(dungeonState, cloneData(INITIAL_DUNGEON_STATE_SNAPSHOT));
        combatScrollState.active = false;
        combatScrollState.context = null;
        combatScrollState.sessionId = null;
        combatScrollState.usedSlots = Array(gameState.scrollSlots).fill(false);
        combatScrollState.activatedEffects = {};
        combatScrollState.turnCounter = 0;
        gameState.activeScrollEffects = [];
        gameState.activeStatusEffects = [];
        gameState.player.baseAtk = gameState.player.atk;
        gameState.player.baseDef = gameState.player.def;
        gameState.player.baseMaxHp = gameState.player.maxHp;
        gameState.player.baseMaxMp = gameState.player.maxMp;
        gameState.player.baseLuck = gameState.player.luck || 0;
        gameState.player.baseCrit = gameState.player.crit || 0;
        gameState.player.baseCritDmg = gameState.player.critDmg || 50;
        gameState.player.baseDodge = gameState.player.dodge || 0;
        gameState.player.baseLifesteal = gameState.player.lifesteal || 0;
        gameState.player.baseDmgReduction = gameState.player.dmgReduction || 0;
        gameState.player.baseArmorPen = gameState.player.armorPen || 0;
        gameState.player.baseMagicPen = gameState.player.magicPen || 0;
        gameState.player.baseAttackSpeed = gameState.player.attackSpeed || 0;
        gameState.player.baseCdr = gameState.player.cdr || 0;
        gameState.player.baseMoveSpeed = gameState.player.moveSpeed || 0;
        recalculateAllPlayerStats();
    `, context, { filename: 'status-effect-reset.js' });
}

function makeEnemy(overrides = {}) {
    return {
        name: 'Training Dummy',
        hp: 400,
        maxHp: 400,
        atk: 5,
        def: 0,
        gold: 0,
        xp: 0,
        tier: 1,
        dodge: 0,
        drops: [],
        ...overrides
    };
}

function getEffect(target, effectId) {
    return (target.activeStatusEffects || api.gameState.activeStatusEffects || []).find(effect => effect && effect.id === effectId) || null;
}

function activePlayerEffect(effectId) {
    return (api.gameState.activeStatusEffects || []).find(effect => effect && effect.id === effectId) || null;
}

function assertSnapshotMatches(template, snapshot, label) {
    const booleanProps = [
        'skipTurn', 'cannotAttack', 'cannotUseItems', 'cannotUseAbilities',
        'cannotEscape', 'attackTwice', 'immuneToDamage', 'immuneToDebuffs'
    ];
    for (const prop of booleanProps) {
        if (template[prop]) {
            assert.strictEqual(snapshot[prop], true, `${label}: expected ${prop}`);
        }
    }

    const numericProps = [
        'damageDealtMultiplier', 'damageTakenMultiplier', 'defenseMultiplier',
        'dodgeMultiplier', 'dodgeBonus', 'critMultiplier', 'missChance'
    ];
    for (const prop of numericProps) {
        if (template[prop] !== undefined) {
            assert.strictEqual(snapshot[prop], template[prop], `${label}: expected ${prop}=${template[prop]}`);
        }
    }
}

function runStatusTemplateCoverageTests() {
    const templates = Object.entries(api.COMBAT_STATUS_TEMPLATES);
    for (const [effectId, template] of templates) {
        resetState();
        assert.strictEqual(api.addPlayerStatusEffect(effectId, { source: 'test-player' }), true, `player should accept ${effectId}`);
        assertSnapshotMatches(template, api.getPlayerStatusSnapshot(), `player snapshot ${effectId}`);

        const playerEffect = activePlayerEffect(effectId);
        assert(playerEffect, `player should have active ${effectId}`);

        if (api.COMBAT_STATUS_RULES.stackable.has(effectId)) {
            assert.strictEqual(api.addPlayerStatusEffect(effectId, { source: 'stack-check' }), true, `${effectId} should stack`);
            assert.strictEqual(activePlayerEffect(effectId).stacks, 2, `${effectId} should have 2 stacks`);
        } else if (api.COMBAT_STATUS_RULES.unique.has(effectId)) {
            assert.strictEqual(api.addPlayerStatusEffect(effectId, { source: 'unique-check' }), false, `${effectId} should reject duplicate unique reapply`);
        } else if (api.COMBAT_STATUS_RULES.refreshOnReapply.has(effectId)) {
            activePlayerEffect(effectId).remainingTurns = 1;
            assert.strictEqual(api.addPlayerStatusEffect(effectId, { source: 'refresh-check' }), true, `${effectId} should refresh`);
            assert.strictEqual(activePlayerEffect(effectId).remainingTurns, template.duration, `${effectId} should refresh duration`);
        }

        if (template.dotFlat || template.dotPercentMaxHp) {
            api.gameState.player.hp = 200;
            api.gameState.player.maxHp = 200;
            api.gameState.player.baseMaxHp = 200;
            const beforeHp = api.gameState.player.hp;
            api.applyEndOfTurnPlayerStatusEffects(api.gameState.player, noop);
            assert(api.gameState.player.hp < beforeHp, `${effectId} should damage player over time`);
        }

        if (template.healFlat || template.healPercentMaxHp) {
            api.gameState.player.hp = 100;
            api.gameState.player.maxHp = 200;
            api.gameState.player.baseMaxHp = 200;
            const beforeHp = api.gameState.player.hp;
            api.applyEndOfTurnPlayerStatusEffects(api.gameState.player, noop);
            assert(api.gameState.player.hp > beforeHp, `${effectId} should heal player over time`);
        }

        if (template.absorbDamage !== undefined) {
            api.gameState.player.hp = 100;
            const absorbedDamage = api.applyDamageToTarget(api.gameState.player, 80, noop);
            assert.strictEqual(absorbedDamage, 0, `${effectId} should fully absorb first damage packet`);
            assert.strictEqual(api.gameState.player.hp, 100, `${effectId} should prevent HP loss on absorbed packet`);
        }

        resetState();
        const enemy = makeEnemy();
        assert.strictEqual(api.addEnemyStatusEffect(enemy, effectId, { source: 'test-enemy' }), true, `enemy should accept ${effectId}`);
        assertSnapshotMatches(template, api.getEnemyStatusSnapshot(enemy), `enemy snapshot ${effectId}`);

        if (template.dotFlat || template.dotPercentMaxHp) {
            const beforeHp = enemy.hp;
            api.applyEndOfTurnEnemyStatusEffects(enemy, noop);
            assert(enemy.hp < beforeHp, `${effectId} should damage enemy over time`);
        }

        if (template.healFlat || template.healPercentMaxHp) {
            enemy.hp = 100;
            enemy.maxHp = 200;
            const beforeHp = enemy.hp;
            api.applyEndOfTurnEnemyStatusEffects(enemy, noop);
            assert(enemy.hp > beforeHp, `${effectId} should heal enemy over time`);
        }

        if (template.absorbDamage !== undefined) {
            enemy.hp = 100;
            const absorbedDamage = api.applyDamageToTarget(enemy, 80, noop);
            assert.strictEqual(absorbedDamage, 0, `${effectId} should absorb enemy damage`);
            assert.strictEqual(enemy.hp, 100, `${effectId} should preserve enemy HP while shielding`);
        }
    }
}

function runCombatPathIntegrationTests() {
    resetState();
    api.gameState.player.mp = 100;
    api.gameState.equipment.weapon = {
        name: 'Battle Test Wand',
        type: 'weapon',
        equipSlot: 'weapon',
        atk: 0,
        onHitDebuff: { effect: 'burn', chance: 100 }
    };
    api.gameState.inBattle = true;
    api.gameState.currentEnemy = makeEnemy({ hp: 600, maxHp: 600 });
    assert.strictEqual(api.addEnemyStatusEffect(api.gameState.currentEnemy, 'poison', { source: 'prebattle' }), true);
    api.battleAction('spell');
    assert(getEffect(api.gameState.currentEnemy, 'burn'), 'battle spell should apply player on-hit debuff to enemy');
    assert.strictEqual(getEffect(api.gameState.currentEnemy, 'poison').remainingTurns, 3, 'battle spell path should process enemy end-of-turn status effects');

    resetState();
    api.gameState.player.mp = 100;
    api.gameState.player.hp = 100;
    api.gameState.equipment.weapon = {
        name: 'Dungeon Test Staff',
        type: 'weapon',
        equipSlot: 'weapon',
        atk: 0,
        onHitDebuff: { effect: 'curse', chance: 100 }
    };
    api.dungeonState.active = true;
    api.dungeonState.inBattle = true;
    api.dungeonState.hp = 100;
    api.dungeonState.maxHp = 100;
    api.dungeonState.currentEnemy = makeEnemy({ name: 'Dungeon Dummy', hp: 650, maxHp: 650 });
    assert.strictEqual(api.addEnemyStatusEffect(api.dungeonState.currentEnemy, 'burn', { source: 'predungeon' }), true);
    api.dungeonAction('spell');
    assert(getEffect(api.dungeonState.currentEnemy, 'curse'), 'dungeon spell should apply player on-hit debuff to enemy');
    assert.strictEqual(getEffect(api.dungeonState.currentEnemy, 'burn').remainingTurns, 2, 'dungeon spell path should process enemy end-of-turn statuses');

    resetState();
    api.gameState.player.hp = 100;
    api.gameState.player.mp = 100;
    api.gameState.equipment.weapon = {
        name: 'World Boss Test Blade',
        type: 'weapon',
        equipSlot: 'weapon',
        atk: 0,
        onHitDebuff: { effect: 'weakness', chance: 100 }
    };
    api.gameState.worldBossActive = true;
    api.gameState.currentWorldBoss = makeEnemy({ name: 'Boss Dummy', hp: 5000, maxHp: 5000, atk: 1, def: 0, tier: 5 });
    api.gameState.worldBossSpawnTime = Date.now();
    assert.strictEqual(api.addEnemyStatusEffect(api.gameState.currentWorldBoss, 'burn', { source: 'preboss' }), true);
    api.attackWorldBoss();
    assert(getEffect(api.gameState.currentWorldBoss, 'weakness'), 'world boss attack should apply player on-hit debuff to boss');
    assert.strictEqual(getEffect(api.gameState.currentWorldBoss, 'burn').remainingTurns, 2, 'world boss path should process enemy end-of-turn statuses');

    resetState();
    api.gameState.player.hp = 100;
    api.gameState.player.mp = 100;
    api.gameState.inBattle = true;
    api.gameState.currentEnemy = makeEnemy({ name: 'Paralysis Dummy', hp: 250, maxHp: 250, atk: 5, def: 0, dodge: 0 });
    assert.strictEqual(api.addPlayerStatusEffect('paralysis', { source: 'combat-test' }), true);
    const enemyHpBefore = api.gameState.currentEnemy.hp;
    api.battleAction('attack');
    assert.strictEqual(api.gameState.currentEnemy.hp, enemyHpBefore, 'paralysis should cause battle attacks to miss completely');
    assert(!activePlayerEffect('paralysis'), 'paralysis should expire after the missed combat turn');
}

function runItemPathIntegrationTests() {
    resetState();
    api.gameState.player.hp = 40;
    api.gameState.player.maxHp = 100;
    api.gameState.player.baseMaxHp = 100;
    api.gameState.inventory = [{ name: 'Potion', type: 'consumable', effect: 'heal', value: 30, qty: 1 }];
    assert.strictEqual(api.addPlayerStatusEffect('bleed', { source: 'inventory' }), true);
    api.useItem(0);
    assert(!activePlayerEffect('bleed'), 'inventory healing should remove bleed');

    resetState();
    api.gameState.player.hp = 40;
    api.gameState.player.maxHp = 100;
    api.gameState.player.baseMaxHp = 100;
    api.gameState.inBattle = true;
    api.gameState.currentEnemy = makeEnemy();
    api.gameState.inventory = [{ name: 'Potion', type: 'consumable', effect: 'heal', value: 30, qty: 1 }];
    assert.strictEqual(api.addPlayerStatusEffect('silence', { source: 'battle' }), true);
    api.battleUseItem(0);
    assert.strictEqual(api.gameState.player.hp, 40, 'battle item use should be blocked by silence');
    assert.strictEqual(api.gameState.inventory.length, 1, 'blocked battle item use should not consume item');

    resetState();
    api.gameState.player.hp = 40;
    api.gameState.player.maxHp = 100;
    api.gameState.player.baseMaxHp = 100;
    api.gameState.inBattle = true;
    api.gameState.currentEnemy = makeEnemy({ name: 'Paralysis Item Dummy' });
    api.gameState.inventory = [{ name: 'Potion', type: 'consumable', effect: 'heal', value: 30, qty: 1 }];
    assert.strictEqual(api.addPlayerStatusEffect('paralysis', { source: 'battle' }), true);
    api.battleUseItem(0);
    assert.strictEqual(api.gameState.player.hp, 40, 'battle item use should be blocked by paralysis');
    assert.strictEqual(api.gameState.inventory.length, 1, 'paralysis-blocked item use should not consume item');

    resetState();
    api.gameState.player.hp = 40;
    api.gameState.player.maxHp = 100;
    api.gameState.player.baseMaxHp = 100;
    api.gameState.wandering.active = true;
    api.gameState.wandering.inBattle = true;
    api.gameState.wandering.currentEnemy = makeEnemy({ name: 'Wander Dummy' });
    api.gameState.inventory = [{ name: 'Potion', type: 'consumable', effect: 'heal', value: 30, qty: 1 }];
    assert.strictEqual(api.addPlayerStatusEffect('bleed', { source: 'wandering' }), true);
    api.wanderingUseItem(0);
    assert(!activePlayerEffect('bleed'), 'wandering healing should remove bleed');

    resetState();
    api.gameState.player.hp = 40;
    api.gameState.player.maxHp = 100;
    api.gameState.player.baseMaxHp = 100;
    api.dungeonState.active = true;
    api.dungeonState.inBattle = true;
    api.dungeonState.hp = 40;
    api.dungeonState.maxHp = 100;
    api.dungeonState.currentEnemy = makeEnemy({ name: 'Dungeon Item Dummy' });
    api.gameState.inventory = [{ name: 'Potion', type: 'consumable', effect: 'heal', value: 30, qty: 1 }];
    assert.strictEqual(api.addPlayerStatusEffect('bleed', { source: 'dungeon' }), true);
    api.dungeonUseItem(0);
    assert(!activePlayerEffect('bleed'), 'dungeon healing should remove bleed');
}

function runAllTests() {
    runStatusTemplateCoverageTests();
    runCombatPathIntegrationTests();
    runItemPathIntegrationTests();
}

try {
    runAllTests();
    console.log(`✅ Status effect coverage passed for ${Object.keys(api.COMBAT_STATUS_TEMPLATES).length} combat effects across battle, dungeon, wandering, world boss, and item paths.`);
} catch (error) {
    console.error('❌ Status effect combat test failed:', error && error.stack ? error.stack : error);
    process.exitCode = 1;
}