import { describe, expect, it } from 'vitest';
import { ROADSIDE_EVENTS } from '../src/lib/content';
import {
  CLASSES,
  advance,
  choose,
  isOver,
  scoreRun,
  startRun,
  transcript,
  visibleChoices,
  type RunState,
} from '../src/lib/engine/run';

/** Plays a run by always taking the first available choice. */
function playRun(seed: string, steps: number, classId = 'lampwright'): RunState {
  const state = startRun({ seed, classId, events: ROADSIDE_EVENTS });
  for (let i = 0; i < steps && !isOver(state); i++) {
    const options = visibleChoices(state).filter((o) => !o.locked);
    expect(options.length).toBeGreaterThan(0);
    choose(state, options[0]!.index);
    if (!isOver(state)) advance(state, ROADSIDE_EVENTS);
  }
  return state;
}

describe('run determinism', () => {
  it('reproduces an identical run from the same seed', () => {
    const a = playRun('daily-2026-09-09', 25);
    const b = playRun('daily-2026-09-09', 25);
    expect(transcript(a)).toEqual(transcript(b));
    expect(a.hp).toBe(b.hp);
    expect(a.coin).toBe(b.coin);
    expect(a.wick).toBe(b.wick);
    expect(a.depth).toBe(b.depth);
    expect(scoreRun(a)).toBe(scoreRun(b));
    expect([...a.flags].sort()).toEqual([...b.flags].sort());
  });

  it('produces a different run from a different seed', () => {
    const a = playRun('daily-2026-09-09', 25);
    const b = playRun('daily-2026-09-10', 25);
    expect(transcript(a)).not.toEqual(transcript(b));
  });

  it('is unaffected by how many runs were played before it', () => {
    playRun('noise-a', 30);
    playRun('noise-b', 30);
    const late = playRun('daily-2026-09-09', 25);
    const fresh = playRun('daily-2026-09-09', 25);
    expect(transcript(late)).toEqual(transcript(fresh));
  });
});

describe('run rules', () => {
  it('starts every class at full health with its own kit', () => {
    for (const cls of CLASSES) {
      const state = startRun({ seed: 'kit', classId: cls.id, events: ROADSIDE_EVENTS });
      expect(state.hp).toBe(cls.maxHp);
      expect(state.wick).toBe(cls.wick);
      expect(state.coin).toBe(cls.coin);
      expect([...state.items]).toEqual(cls.startingItems);
      expect(state.currentEvent).not.toBeNull();
    }
  });

  it('rejects an unknown class rather than defaulting silently', () => {
    expect(() => startRun({ seed: 'x', classId: 'nobody', events: ROADSIDE_EVENTS })).toThrow();
  });

  it('burns exactly one wick per step deeper', () => {
    // Measured after the choice resolves, since outcomes may grant wick too.
    const state = startRun({ seed: 'wick', events: ROADSIDE_EVENTS });
    choose(state, visibleChoices(state).filter((o) => !o.locked)[0]!.index);
    expect(isOver(state)).toBe(false);
    const wickAfterChoice = state.wick;
    const depthBefore = state.depth;
    advance(state, ROADSIDE_EVENTS);
    expect(state.depth).toBe(depthBefore + 1);
    expect(state.wick).toBe(wickAfterChoice - 1);
  });

  it('costs health once the wick is spent', () => {
    const state = startRun({ seed: 'guttered', events: ROADSIDE_EVENTS });
    state.wick = 1;
    choose(state, visibleChoices(state).filter((o) => !o.locked)[0]!.index);
    expect(isOver(state)).toBe(false);
    state.wick = 1; // ignore whatever the outcome granted; we want the dark
    advance(state, ROADSIDE_EVENTS);
    expect(state.wick).toBe(0);
    const hpInTheDark = state.hp;
    state.phase = 'outcome';
    advance(state, ROADSIDE_EVENTS);
    expect(state.hp).toBe(hpInTheDark - 1);
  });

  it('never lets hp exceed maxHp or fall below zero', () => {
    const state = playRun('bounds-check', 40);
    expect(state.hp).toBeGreaterThanOrEqual(0);
    expect(state.hp).toBeLessThanOrEqual(state.maxHp);
    expect(state.coin).toBeGreaterThanOrEqual(0);
    expect(state.wick).toBeGreaterThanOrEqual(0);
  });

  it('records a cause of death when the run ends badly', () => {
    const state = playRun('a-bad-night', 200);
    if (state.hp <= 0) {
      expect(state.causeOfDeath).not.toBeNull();
      expect(isOver(state)).toBe(true);
    }
  });

  it('refuses out-of-phase calls instead of corrupting state', () => {
    const state = startRun({ seed: 'phase', events: ROADSIDE_EVENTS });
    expect(() => advance(state, ROADSIDE_EVENTS)).toThrow();
    choose(state, visibleChoices(state).filter((o) => !o.locked)[0]!.index);
    if (!isOver(state)) {
      expect(() => choose(state, 0)).toThrow();
    }
  });

  it('never offers a locked choice as playable', () => {
    const state = startRun({ seed: 'locks', classId: 'ditchguard', events: ROADSIDE_EVENTS });
    for (const option of visibleChoices(state)) {
      if (option.locked) {
        expect(() => choose(state, option.index)).toThrow();
      }
    }
  });

  it('does not repeat a once-only event within a run', () => {
    const state = playRun('once-only', 60);
    const onceIds = ROADSIDE_EVENTS.filter((e) => e.once).map((e) => e.id);
    for (const id of onceIds) {
      const appearances = state.log.filter((entry) => entry.eventId === id).length;
      expect(appearances).toBeLessThanOrEqual(1);
    }
  });

  it('never shows the same event twice in a row', () => {
    const state = playRun('no-doubles', 60);
    for (let i = 1; i < state.log.length; i++) {
      expect(state.log[i]!.eventId).not.toBe(state.log[i - 1]!.eventId);
    }
  });

  it('spreads events across the pool rather than fixating on one', () => {
    const state = playRun('variety', 60);
    const distinct = new Set(state.log.map((entry) => entry.eventId));
    expect(distinct.size).toBeGreaterThanOrEqual(3);
  });
});
