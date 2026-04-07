// STATUS EFFECTS / BUFFS / DEBUFFS SYSTEM
// 20 Status Effects implemented as requested

const STATUS_EFFECTS = {
    // ------------------------------
    // DAMAGE OVER TIME EFFECTS
    // ------------------------------
    'burn': {
        id: 'burn',
        name: 'Burning',
        type: 'debuff',
        category: 'dot',
        description: 'Deals fixed fire damage each turn',
        damageType: 'fixed',
        baseDamage: 15,
        duration: 3,
        icon: '🔥',
        color: '#ff4444'
    },

    'poison': {
        id: 'poison',
        name: 'Poisoned',
        type: 'debuff',
        category: 'dot',
        description: 'Deals percentage of MAX HP damage each turn',
        damageType: 'percentage',
        baseDamage: 3, // 3% of max HP per turn
        duration: 4,
        icon: '☠️',
        color: '#2ecc71'
    },

    'bleed': {
        id: 'bleed',
        name: 'Bleeding',
        type: 'debuff',
        category: 'dot',
        description: 'Deals increasing damage each turn until healed',
        damageType: 'stacking',
        baseDamage: 8,
        stackIncrease: 4,
        duration: 5,
        icon: '🩸',
        color: '#c0392b'
    },

    'frostbite': {
        id: 'frostbite',
        name: 'Frostbite',
        type: 'debuff',
        category: 'dot',
        description: 'Deals cold damage and reduces defense each turn',
        damageType: 'fixed',
        baseDamage: 10,
        defReduction: 10,
        duration: 3,
        icon: '❄️',
        color: '#3498db'
    },

    // ------------------------------
    // CONTROL EFFECTS
    // ------------------------------
    'paralysis': {
        id: 'paralysis',
        name: 'Paralyzed',
        type: 'debuff',
        category: 'control',
        description: 'Attacks always miss and items cannot be used this turn',
        missChance: 100,
        cannotUseItems: true,
        duration: 1,
        icon: '⚡',
        color: '#f1c40f'
    },

    'freeze': {
        id: 'freeze',
        name: 'Frozen',
        type: 'debuff',
        category: 'control',
        description: 'Cannot move or attack, take 50% extra damage',
        skipTurn: true,
        damageTakenMultiplier: 1.5,
        duration: 1,
        icon: '🧊',
        color: '#74b9ff'
    },

    'stun': {
        id: 'stun',
        name: 'Stunned',
        type: 'debuff',
        category: 'control',
        description: 'Dazed - your next attack misses, enemy next hit is a guaranteed crit, DEF reduced by 20%',
        missChance: 100,
        enemyGuaranteedCrit: true,
        defenseMultiplier: 0.8,
        duration: 1,
        icon: '💫',
        color: '#9b59b6'
    },

    'root': {
        id: 'root',
        name: 'Rooted',
        type: 'debuff',
        category: 'control',
        description: 'Cannot move or escape, but can still attack normally',
        cannotEscape: true,
        dodgeChanceReduction: 75,
        duration: 2,
        icon: '🌿',
        color: '#27ae60'
    },

    'silence': {
        id: 'silence',
        name: 'Silenced',
        type: 'debuff',
        category: 'control',
        description: 'Cannot use items, scrolls or special abilities',
        cannotUseItems: true,
        cannotUseAbilities: true,
        duration: 2,
        icon: '🔇',
        color: '#636e72'
    },

    // ------------------------------
    // STAT MODIFIER DEBUFFS
    // ------------------------------
    'slow': {
        id: 'slow',
        name: 'Slowed',
        type: 'debuff',
        category: 'stat',
        description: '40% chance attack will miss completely',
        missChance: 40,
        atkMultiplier: 0.7,
        duration: 3,
        icon: '🐌',
        color: '#74b9ff'
    },

    'weakness': {
        id: 'weakness',
        name: 'Weakened',
        type: 'debuff',
        category: 'stat',
        description: 'Deal 50% less damage with all attacks',
        damageDealtMultiplier: 0.5,
        duration: 3,
        icon: '😔',
        color: '#6c5ce7'
    },

    'curse': {
        id: 'curse',
        name: 'Cursed',
        type: 'debuff',
        category: 'stat',
        description: 'Receive 50% more damage, critical hits always land',
        damageTakenMultiplier: 1.5,
        critImmunity: false,
        duration: 4,
        icon: '👻',
        color: '#2d3436'
    },

    'vulnerability': {
        id: 'vulnerability',
        name: 'Vulnerable',
        type: 'debuff',
        category: 'stat',
        description: 'Defense is reduced by 50% when taking damage',
        defenseMultiplier: 0.5,
        duration: 2,
        icon: '💔',
        color: '#e17055'
    },

    'exhaustion': {
        id: 'exhaustion',
        name: 'Exhausted',
        type: 'debuff',
        category: 'stat',
        description: 'Dodge chance and Critical hit chance reduced by 50%',
        dodgeMultiplier: 0.5,
        critMultiplier: 0.5,
        duration: 3,
        icon: '😫',
        color: '#fdcb6e'
    },

    // ------------------------------
    // POSITIVE BUFFS
    // ------------------------------
    'strength': {
        id: 'strength',
        name: 'Strength',
        type: 'buff',
        category: 'stat',
        description: 'Deal 35% extra damage with all attacks',
        damageDealtMultiplier: 1.35,
        duration: 3,
        icon: '💪',
        color: '#e74c3c'
    },

    'shield': {
        id: 'shield',
        name: 'Shielded',
        type: 'buff',
        category: 'defense',
        description: 'Absorbs incoming damage until broken',
        absorbDamage: 150,
        duration: 4,
        icon: '🛡️',
        color: '#3498db'
    },

    'regeneration': {
        id: 'regeneration',
        name: 'Regeneration',
        type: 'buff',
        category: 'heal',
        description: 'Restores percentage health each turn',
        healType: 'percentage',
        healAmount: 5, // 5% max HP
        duration: 4,
        icon: '💚',
        color: '#00b894'
    },

    'haste': {
        id: 'haste',
        name: 'Haste',
        type: 'buff',
        category: 'stat',
        description: 'Attack twice every turn, +25% dodge chance',
        attackTwice: true,
        dodgeBonus: 25,
        duration: 2,
        icon: '⚡',
        color: '#fdcb6e'
    },

    'berserk': {
        id: 'berserk',
        name: 'Berserk',
        type: 'buff',
        category: 'offense',
        description: 'Double attack damage, receive 50% more damage',
        damageDealtMultiplier: 2.0,
        damageTakenMultiplier: 1.5,
        duration: 3,
        icon: '😡',
        color: '#d63031'
    },

    'invulnerability': {
        id: 'invulnerability',
        name: 'Invulnerable',
        type: 'buff',
        category: 'defense',
        description: 'Completely immune to all damage and debuffs',
        immuneToDamage: true,
        immuneToDebuffs: true,
        duration: 1,
        icon: '✨',
        color: '#ffeaa7'
    }
};

// Effect stacking rules
const STATUS_RULES = {
    // Effects that can stack multiple times
    stackable: ['poison', 'bleed', 'burn'],
    // Effects that refresh duration when reapplied
    refreshable: ['slow', 'weakness', 'strength', 'haste', 'shield'],
    // Effects that cannot be reapplied while active
    unique: ['paralysis', 'freeze', 'invulnerability', 'stun']
};

// Effect resistance definitions
const STATUS_RESISTANCES = {
    'fire_immune': ['burn'],
    'cold_immune': ['freeze', 'frostbite'],
    'poison_immune': ['poison'],
    'stun_immune': ['stun', 'paralysis'],
    'control_immune': ['paralysis', 'freeze', 'stun', 'root', 'silence']
};

module.exports = {
    STATUS_EFFECTS,
    STATUS_RULES,
    STATUS_RESISTANCES
};