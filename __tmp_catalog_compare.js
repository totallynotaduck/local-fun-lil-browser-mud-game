const fs = require('fs');
const vm = require('vm');
const { execFileSync } = require('child_process');

function buildCatalogFromSources(sources) {
    const ctx = { console };
    vm.createContext(ctx);

    for (const source of sources) {
        vm.runInContext(
            `${source}\n;if (typeof itemPool !== 'undefined') globalThis.__itemPool = itemPool; if (typeof scrollPool !== 'undefined') globalThis.__scrollPool = scrollPool;`,
            ctx
        );
    }

    const itemPool = ctx.__itemPool || {};
    const scrollPool = ctx.__scrollPool || {};
    const extras = {
        'Blessing Oil': { name: 'Blessing Oil' },
        'World Boss Ticket': { name: 'World Boss Ticket' }
    };

    const entries = new Map();
    const add = (name, item) => {
        if (!name || !item || entries.has(name) || /\(\d+-\d+\)( \d+)?$/.test(name)) return;
        entries.set(name, item);
    };

    Object.entries(itemPool).forEach(([name, item]) => add(name, item));
    Object.entries(scrollPool).forEach(([name, item]) => add(name, item));
    Object.entries(extras).forEach(([name, item]) => add(name, item));

    return Array.from(entries.keys()).sort((a, b) => a.localeCompare(b));
}

const base = process.argv[2];
const files = ['items.js', 'uberUniqueItems.js', 'normalUniqueItems.js', 'level55UberUniques.js'];

const oldSources = files.map(file => execFileSync('git', ['show', `${base}:${file}`], { encoding: 'utf8' }));
const currentSources = files.map(file => fs.readFileSync(file, 'utf8'));

const oldCatalog = buildCatalogFromSources(oldSources);
const currentCatalog = buildCatalogFromSources(currentSources);

const maxLength = Math.max(oldCatalog.length, currentCatalog.length);
const diffs = [];
for (let i = 0; i < maxLength; i++) {
    if (oldCatalog[i] !== currentCatalog[i]) {
        diffs.push({
            index: i + 1,
            old: oldCatalog[i] || null,
            current: currentCatalog[i] || null
        });
    }
}

console.log(JSON.stringify({
    oldCount: oldCatalog.length,
    currentCount: currentCatalog.length,
    diffCount: diffs.length,
    diffs,
    oldCatalog,
    currentCatalog
}, null, 2));