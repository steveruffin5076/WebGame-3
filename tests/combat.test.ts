import { describe, expect, it } from 'vitest';
import { createRng, type Rng } from '../src/lib/engine/rng';
import type { Enemy, GameEvent } from '../src/lib/engine/schema';
import {
  advance,
  choose,
  combatActions,
  continueCombat,
  isOver,
  resolveCombat,
  startRun,
  type Phase,
  type RunState,
} from '../src/lib/engine/run';

/** Reads phase through a function boundary so a prior direct assignment
 * elsewhere in the same scope can't leave TS narrowed to a stale literal. */
function phaseOf(state: RunState): Phase {
  return state.phase;
}
import { ALL_ENEMIES, ALL_EVENTS, ROADSIDE_EVENTS } from '../src/lib/content';

/** Drops a fresh run straight onto a specific event, bypassing the weighted
 * picker so combat-entry tests don't depend on which event the seed drew.
 * A plain function boundary, rather than a direct `state.phase = 'event'`
 * assignment at the call site — kept out of line so TS doesn't narrow
 * `state.phase` to the literal `'event'` for the rest of the caller. */
function forcePendingEvent(state: RunState, event: GameEvent): void {
  state.currentEvent = event;
  state.phase = 'event';
}

/**
 * A scripted Rng for exact, non-flaky combat assertions. Combat only ever
 * calls `chance()` and `int()`; anything else throws, so an unexpected
 * extra roll fails loudly instead of silently drawing real randomness.
 */
function scriptedRng(chances: boolean[], ints: number[] = []): Rng {
  let ci = 0;
  let ii = 0;
  const fail = (name: string): never => {
    throw new Error(`scriptedRng: unscripted call to ${name}()`);
  };
  return {
    next: () => fail('next'),
    int: () => {
      if (ii >= ints.length) return fail('int (script exhausted)');
      return ints[ii++]!;
    },
    pick: () => fail('pick'),
    weightedPick: () => fail('weightedPick'),
    chance: () => {
      if (ci >= chances.length) return fail('chance (script exhausted)');
      return chances[ci++]!;
    },
    shuffle: () => fail('shuffle'),
    get draws() {
      return ci + ii;
    },
  };
}

const testEnemy: Enemy = {
  id: 'test_enemy',
  name: 'the test enemy',
  tier: 1,
  maxHp: 6,
  might: 2,
  wits: 1,
  tags: [],
  fleeText: 'You get clear of it.',
  victoryText: 'It goes down.',
  rewardEffects: [{ kind: 'coin', amount: 5 }],
};

/** Starts a run and drops it straight into combat with the given enemy,
 * bypassing event selection so combat tests are isolated from content RNG. */
function inCombat(enemy: Enemy, rng: Rng): RunState {
  const state = startRun({ seed: 'combat-test', classId: 'ditchguard', events: ROADSIDE_EVENTS });
  state.enemy = enemy;
  state.enemyHp = enemy.maxHp;
  state.phase = 'combat';
  state.rng = rng;
  return state;
}

describe('combat: entering a fight', () => {
  it('a combat effect sets the enemy without ending the run', () => {
    const state = startRun({ seed: 'entry', classId: 'ditchguard', events: ALL_EVENTS });
    const demo = ALL_EVENTS.find((e) => e.id === 'a_shape_on_the_road');
    expect(demo).toBeDefined();

    forcePendingEvent(state, demo!);
    choose(state, 0, ALL_ENEMIES);

    expect(state.phase).toBe('outcome');
    expect(state.enemy?.id).toBe('lean_wolf');
    expect(state.enemyHp).toBe(state.enemy!.maxHp);
  });

  it('advance() opens combat instead of drawing the next event when a fight is pending', () => {
    const state = startRun({ seed: 'entry-2', classId: 'ditchguard', events: ALL_EVENTS });
    const demo = ALL_EVENTS.find((e) => e.id === 'a_shape_on_the_road')!;
    forcePendingEvent(state, demo);
    choose(state, 0, ALL_ENEMIES);
    const depthBefore = state.depth;

    advance(state, ALL_EVENTS);

    expect(state.phase).toBe('combat');
    expect(state.depth).toBe(depthBefore); // wick/depth only burn once the fight ends
  });

  it('exposes exactly four fixed actions', () => {
    const ids = combatActions().map((a) => a.id).sort();
    expect(ids).toEqual(['attack', 'feint', 'flee', 'guard']);
  });
});

describe('combat: resolving a round', () => {
  it('a killing blow ends the fight, applies rewards, and skips the enemy reply', () => {
    const state = inCombat(testEnemy, scriptedRng([true], [6])); // hit, 6 damage >= 6 hp
    const coinBefore = state.coin;

    resolveCombat(state, 'attack');

    expect(state.phase).toBe('combatOutcome');
    expect(state.enemy).toBeNull();
    expect(state.coin).toBe(coinBefore + 5); // reward effect applied
    expect(state.combatText).toContain('goes down');
    expect(state.lastCombatDamage).toEqual({ toEnemy: 6, toPlayer: 0, fled: false });
  });

  it('a miss lets the enemy answer for its rolled damage plus its might bonus', () => {
    const state = inCombat(testEnemy, scriptedRng([false, true], [3]));
    const hpBefore = state.hp;

    resolveCombat(state, 'attack');

    // might 2 -> bonus floor(2/2) = 1; rolled 3 -> total 4
    expect(state.hp).toBe(hpBefore - 4);
    expect(state.enemy).not.toBeNull();
    expect(state.phase).toBe('combatOutcome');
    expect(state.lastCombatDamage).toEqual({ toEnemy: 0, toPlayer: 4, fled: false });
  });

  it('guarding halves the enemy\'s damage, rounded down', () => {
    const state = inCombat(testEnemy, scriptedRng([true], [3])); // enemy hits for 3 + 1 = 4
    const hpBefore = state.hp;

    resolveCombat(state, 'guard');

    expect(state.hp).toBe(hpBefore - 2); // floor(4 * 0.5)
  });

  it('a successful flee ends the fight with no reward and no retaliation', () => {
    const state = inCombat(testEnemy, scriptedRng([true]));
    const hpBefore = state.hp;
    const coinBefore = state.coin;

    resolveCombat(state, 'flee');

    expect(state.enemy).toBeNull();
    expect(state.hp).toBe(hpBefore);
    expect(state.coin).toBe(coinBefore); // no reward — this wasn't a win
    expect(state.combatText).toBe(testEnemy.fleeText);
    expect(state.lastCombatDamage).toEqual({ toEnemy: 0, toPlayer: 0, fled: true });
  });

  it('a failed flee still costs a hit from the enemy', () => {
    const state = inCombat(testEnemy, scriptedRng([false, true], [2]));
    const hpBefore = state.hp;

    resolveCombat(state, 'flee');

    expect(state.enemy).not.toBeNull();
    expect(state.hp).toBe(hpBefore - 3); // 2 rolled + might-2 bonus of 1
  });

  it('a fatal enemy reply ends the run with the enemy as cause of death', () => {
    const state = inCombat(testEnemy, scriptedRng([false, true], [20]));
    state.hp = 1;

    resolveCombat(state, 'attack');

    expect(isOver(state)).toBe(true);
    expect(state.causeOfDeath).toBe(testEnemy.name);
  });

  it('refuses to resolve combat outside the combat phase', () => {
    const state = inCombat(testEnemy, scriptedRng([]));
    state.phase = 'event';
    expect(() => resolveCombat(state, 'attack')).toThrow();
  });
});

describe('combat: continuing after a round', () => {
  it('an ongoing fight returns to the combat phase for the next round', () => {
    const state = inCombat(testEnemy, scriptedRng([false, true], [1]));
    resolveCombat(state, 'attack');
    expect(state.phase).toBe('combatOutcome');

    continueCombat(state, ROADSIDE_EVENTS);

    expect(state.phase).toBe('combat');
    expect(state.enemy).not.toBeNull();
    expect(state.combatText).toBeNull();
    expect(state.lastCombatDamage).toBeNull();
  });

  it('a resolved fight steps the run forward exactly like a normal advance', () => {
    const state = inCombat(testEnemy, scriptedRng([true], [10]));
    resolveCombat(state, 'attack'); // kills it
    const depthBefore = state.depth;
    const wickBefore = state.wick;

    // Ending combat draws the next event, which needs real weighted-pick
    // randomness — the scripted rng only knows about the fight itself.
    state.rng = createRng('post-combat');
    continueCombat(state, ROADSIDE_EVENTS);

    expect(state.depth).toBe(depthBefore + 1);
    expect(state.wick).toBe(wickBefore - 1);
    expect(state.phase).toBe('event');
    expect(state.currentEvent).not.toBeNull();
  });

  it('refuses to continue outside the combatOutcome phase', () => {
    const state = inCombat(testEnemy, scriptedRng([]));
    expect(() => continueCombat(state, ROADSIDE_EVENTS)).toThrow();
  });
});

describe('combat: determinism', () => {
  it('reproduces an identical fight from the same seed', () => {
    function fight(seed: string) {
      const state = startRun({ seed, classId: 'ditchguard', events: ALL_EVENTS });
      const demo = ALL_EVENTS.find((e) => e.id === 'a_shape_on_the_road')!;
      forcePendingEvent(state, demo);
      choose(state, 0, ALL_ENEMIES);
      advance(state, ALL_EVENTS);

      const actions = combatActions();
      let rounds = 0;
      while (phaseOf(state) === 'combat' && rounds < 50) {
        rounds++;
        resolveCombat(state, actions[0]!.id); // always attack
        if (phaseOf(state) === 'combatOutcome') continueCombat(state, ALL_EVENTS);
      }
      return { hp: state.hp, coin: state.coin, phase: state.phase, causeOfDeath: state.causeOfDeath };
    }

    const a = fight('daily-2026-09-09');
    const b = fight('daily-2026-09-09');
    expect(a).toEqual(b);
  });
});
