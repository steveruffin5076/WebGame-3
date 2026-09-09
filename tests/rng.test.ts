import { describe, expect, it } from 'vitest';
import { createRng, dailySeedString, hashSeed } from '../src/lib/engine/rng';

describe('seeded rng', () => {
  it('produces an identical sequence for the same seed', () => {
    const a = createRng('wickmarrow');
    const b = createRng('wickmarrow');
    const seqA = Array.from({ length: 500 }, () => a.next());
    const seqB = Array.from({ length: 500 }, () => b.next());
    expect(seqA).toEqual(seqB);
  });

  it('produces different sequences for different seeds', () => {
    const a = Array.from({ length: 50 }, () => createRng('seed-a').next());
    const b = Array.from({ length: 50 }, () => createRng('seed-b').next());
    expect(a).not.toEqual(b);
  });

  it('accepts numeric and string seeds interchangeably in shape', () => {
    expect(() => createRng(0)).not.toThrow();
    expect(createRng(12345).next()).toBe(createRng(12345).next());
  });

  it('stays within [0, 1)', () => {
    const rng = createRng('bounds');
    for (let i = 0; i < 10_000; i++) {
      const value = rng.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('respects int bounds inclusively', () => {
    const rng = createRng('ints');
    const seen = new Set<number>();
    for (let i = 0; i < 5_000; i++) {
      const value = rng.int(1, 6);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
      seen.add(value);
    }
    expect(seen.size).toBe(6);
  });

  it('rejects an inverted int range', () => {
    expect(() => createRng('x').int(5, 2)).toThrow();
  });

  it('honours weights, and never picks a zero-weight item', () => {
    const rng = createRng('weights');
    const items = [
      { id: 'common', w: 9 },
      { id: 'rare', w: 1 },
      { id: 'never', w: 0 },
    ];
    const counts: Record<string, number> = { common: 0, rare: 0, never: 0 };
    for (let i = 0; i < 10_000; i++) {
      counts[rng.weightedPick(items, (x) => x.w).id]!++;
    }
    expect(counts.never).toBe(0);
    expect(counts.common).toBeGreaterThan(counts.rare! * 4);
  });

  it('throws rather than guessing on empty or all-zero pools', () => {
    const rng = createRng('empty');
    expect(() => rng.pick([])).toThrow();
    expect(() => rng.weightedPick([{ w: 0 }], (x) => x.w)).toThrow();
  });

  it('shuffles deterministically without losing or duplicating items', () => {
    const source = [1, 2, 3, 4, 5, 6, 7, 8];
    const a = createRng('shuffle').shuffle(source);
    const b = createRng('shuffle').shuffle(source);
    expect(a).toEqual(b);
    expect([...a].sort((x, y) => x - y)).toEqual(source);
    expect(source).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('hashes seeds stably and builds a UTC daily seed string', () => {
    expect(hashSeed('daily-2026-09-09')).toBe(hashSeed('daily-2026-09-09'));
    expect(hashSeed('daily-2026-09-09')).not.toBe(hashSeed('daily-2026-09-10'));
    expect(dailySeedString(new Date(Date.UTC(2026, 8, 9, 23, 59)))).toBe('daily-2026-09-09');
    // Same UTC day regardless of the local hour it is read at.
    expect(dailySeedString(new Date(Date.UTC(2026, 8, 9, 0, 1)))).toBe('daily-2026-09-09');
  });
});
