/**
 * Deterministic seeded RNG.
 *
 * The Daily Delve requires that one seed produce an identical run on every
 * device, forever. `Math.random()` cannot be seeded, so it is never used
 * anywhere in the run engine. mulberry32 is small, fast and well-distributed
 * enough for game content selection.
 */

export interface Rng {
  /** Raw float in [0, 1). */
  next(): number;
  /** Integer in [min, max] inclusive. */
  int(min: number, max: number): number;
  /** Uniform pick. Throws on an empty list rather than returning undefined. */
  pick<T>(items: readonly T[]): T;
  /** Weighted pick. Non-positive weights are skipped. */
  weightedPick<T>(items: readonly T[], weightOf: (item: T) => number): T;
  /** True with probability p. */
  chance(p: number): boolean;
  /** Fisher-Yates, returns a new array. */
  shuffle<T>(items: readonly T[]): T[];
  /** How many numbers have been drawn. Useful for asserting determinism. */
  readonly draws: number;
}

/** Turns any string into a 32-bit seed. Used for date-based daily seeds. */
export function hashSeed(input: string): number {
  // FNV-1a, 32-bit.
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** The seed string for a given UTC day, e.g. "daily-2026-09-09". */
export function dailySeedString(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `daily-${y}-${m}-${d}`;
}

export function createRng(seed: number | string): Rng {
  let state = (typeof seed === 'string' ? hashSeed(seed) : seed >>> 0) || 1;
  let draws = 0;

  const next = (): number => {
    draws++;
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const rng: Rng = {
    next,
    int(min, max) {
      if (max < min) throw new Error(`rng.int: max (${max}) < min (${min})`);
      return min + Math.floor(next() * (max - min + 1));
    },
    pick(items) {
      if (items.length === 0) throw new Error('rng.pick: empty list');
      return items[Math.floor(next() * items.length)]!;
    },
    weightedPick(items, weightOf) {
      if (items.length === 0) throw new Error('rng.weightedPick: empty list');
      let total = 0;
      for (const item of items) {
        const w = weightOf(item);
        if (w > 0) total += w;
      }
      if (total <= 0) throw new Error('rng.weightedPick: all weights are zero or negative');
      let roll = next() * total;
      for (const item of items) {
        const w = weightOf(item);
        if (w <= 0) continue;
        roll -= w;
        if (roll < 0) return item;
      }
      // Floating-point tail: return the last positively-weighted item.
      for (let i = items.length - 1; i >= 0; i--) {
        if (weightOf(items[i]!) > 0) return items[i]!;
      }
      throw new Error('rng.weightedPick: unreachable');
    },
    chance(p) {
      return next() < p;
    },
    shuffle(items) {
      const out = [...items];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const a = out[i]!;
        const b = out[j]!;
        out[i] = b;
        out[j] = a;
      }
      return out;
    },
    get draws() {
      return draws;
    },
  };

  return rng;
}
