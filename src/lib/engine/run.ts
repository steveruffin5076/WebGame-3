import { createRng, type Rng } from './rng';
import { STATS, type Choice, type Condition, type Effect, type GameEvent, type Outcome, type StatName } from './schema';

/**
 * The run state machine.
 *
 * Every random decision goes through the seeded Rng, so a seed fully
 * determines a run. Nothing here reads the clock, the DOM or Math.random().
 */

export type Stats = Record<StatName, number>;

export interface CharacterClass {
  id: string;
  name: string;
  blurb: string;
  maxHp: number;
  wick: number;
  coin: number;
  stats: Stats;
  startingItems: string[];
}

export const CLASSES: readonly CharacterClass[] = [
  {
    id: 'lampwright',
    name: 'Lampwright',
    blurb: 'You kept the road-lamps lit for twenty years. You know what the dark costs.',
    maxHp: 10,
    wick: 14,
    coin: 6,
    stats: { might: 1, wits: 3, heart: 2 },
    startingItems: ['spare_wick'],
  },
  {
    id: 'ditchguard',
    name: 'Ditchguard',
    blurb: 'Hired muscle for a village that could not afford better. They were kind about it.',
    maxHp: 14,
    wick: 10,
    coin: 3,
    stats: { might: 3, wits: 1, heart: 2 },
    startingItems: ['notched_blade'],
  },
  {
    id: 'bonesetter',
    name: 'Bonesetter',
    blurb: 'You have put more people back together than you have buried. Only just.',
    maxHp: 11,
    wick: 12,
    coin: 5,
    stats: { might: 1, wits: 2, heart: 3 },
    startingItems: ['splint_kit'],
  },
];

export type Phase = 'event' | 'outcome' | 'over';

export interface LogEntry {
  depth: number;
  eventId: string;
  eventTitle: string;
  choiceLabel: string;
  outcomeText: string;
}

export interface RunState {
  readonly seed: string;
  readonly mode: 'daily' | 'free';
  readonly classId: string;
  rng: Rng;
  phase: Phase;
  depth: number;
  hp: number;
  maxHp: number;
  coin: number;
  wick: number;
  stats: Stats;
  flags: Set<string>;
  items: Set<string>;
  seenEventIds: Set<string>;
  /** Tags from the last few events, used to push the next pick somewhere new. */
  recentTags: string[];
  currentEvent: GameEvent | null;
  pendingOutcome: Outcome | null;
  ending: string | null;
  causeOfDeath: string | null;
  log: LogEntry[];
}

export interface RunConfig {
  seed: string | number;
  mode?: 'daily' | 'free';
  classId?: string;
  events: readonly GameEvent[];
  biome?: string;
}

const RECENT_TAG_MEMORY = 6;
/** Each matching recent tag multiplies an event's weight by this. */
const REPEAT_TAG_PENALTY = 0.45;
/** Wick burned per step into the dark. */
const WICK_PER_DEPTH = 1;

export class NoEligibleEventError extends Error {}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function meetsCondition(state: RunState, condition: Condition | undefined): boolean {
  if (!condition) return true;
  if (condition.minDepth !== undefined && state.depth < condition.minDepth) return false;
  if (condition.maxDepth !== undefined && state.depth > condition.maxDepth) return false;
  if (condition.minWick !== undefined && state.wick < condition.minWick) return false;
  if (condition.maxWick !== undefined && state.wick > condition.maxWick) return false;
  if (condition.minCoin !== undefined && state.coin < condition.minCoin) return false;
  if (condition.minHp !== undefined && state.hp < condition.minHp) return false;
  if (condition.flags?.some((f) => !state.flags.has(f))) return false;
  if (condition.notFlags?.some((f) => state.flags.has(f))) return false;
  if (condition.items?.some((i) => !state.items.has(i))) return false;
  if (condition.minStat) {
    for (const stat of STATS) {
      const required = condition.minStat[stat];
      if (required !== undefined && state.stats[stat] < required) return false;
    }
  }
  return true;
}

/** Weight for one event given what the run has already shown. */
function weightFor(state: RunState, event: GameEvent): number {
  let weight = event.weight;
  for (const tag of event.tags) {
    if (state.recentTags.includes(tag)) weight *= REPEAT_TAG_PENALTY;
  }
  return Math.max(weight, 0.0001);
}

function eligibleEvents(state: RunState, events: readonly GameEvent[], biome: string): GameEvent[] {
  return events.filter((event) => {
    if (event.biome !== biome) return false;
    if (event.once && state.seenEventIds.has(event.id)) return false;
    if (event.id === state.currentEvent?.id) return false;
    return meetsCondition(state, event.requires);
  });
}

export function applyEffect(state: RunState, effect: Effect): void {
  switch (effect.kind) {
    case 'hp':
      state.hp = clamp(state.hp + effect.amount, 0, state.maxHp);
      break;
    case 'maxHp':
      state.maxHp = Math.max(1, state.maxHp + effect.amount);
      state.hp = clamp(state.hp, 0, state.maxHp);
      break;
    case 'coin':
      state.coin = Math.max(0, state.coin + effect.amount);
      break;
    case 'wick':
      state.wick = Math.max(0, state.wick + effect.amount);
      break;
    case 'stat':
      state.stats[effect.stat] = Math.max(0, state.stats[effect.stat] + effect.amount);
      break;
    case 'flag':
      if (effect.set) state.flags.add(effect.set);
      if (effect.clear) state.flags.delete(effect.clear);
      break;
    case 'item':
      if (effect.add) state.items.add(effect.add);
      if (effect.remove) state.items.delete(effect.remove);
      break;
    case 'end':
      state.ending = effect.ending;
      break;
  }
}

/** Choices the player can actually see, with their locked state resolved. */
export function visibleChoices(
  state: RunState,
): { choice: Choice; index: number; locked: boolean }[] {
  const event = state.currentEvent;
  if (!event) return [];
  const out: { choice: Choice; index: number; locked: boolean }[] = [];
  event.choices.forEach((choice, index) => {
    const ok = meetsCondition(state, choice.requires);
    if (!ok && choice.whenLocked === 'hide') return;
    out.push({ choice, index, locked: !ok });
  });
  return out;
}

function pickNextEvent(state: RunState, events: readonly GameEvent[], biome: string): void {
  const pool = eligibleEvents(state, events, biome);
  if (pool.length === 0) {
    throw new NoEligibleEventError(
      `No eligible event at depth ${state.depth} in biome "${biome}". ` +
        `Content needs a fallback event with no requires.`,
    );
  }
  const event = state.rng.weightedPick(pool, (e) => weightFor(state, e));
  state.currentEvent = event;
  state.seenEventIds.add(event.id);
  state.recentTags = [...event.tags, ...state.recentTags].slice(0, RECENT_TAG_MEMORY);
  state.phase = 'event';
}

export function startRun(config: RunConfig): RunState {
  const classId = config.classId ?? CLASSES[0]!.id;
  const characterClass = CLASSES.find((c) => c.id === classId);
  if (!characterClass) throw new Error(`Unknown class: "${classId}"`);

  const seed = String(config.seed);
  const state: RunState = {
    seed,
    mode: config.mode ?? 'free',
    classId,
    rng: createRng(seed),
    phase: 'event',
    depth: 1,
    hp: characterClass.maxHp,
    maxHp: characterClass.maxHp,
    coin: characterClass.coin,
    wick: characterClass.wick,
    stats: { ...characterClass.stats },
    flags: new Set(),
    items: new Set(characterClass.startingItems),
    seenEventIds: new Set(),
    recentTags: [],
    currentEvent: null,
    pendingOutcome: null,
    ending: null,
    causeOfDeath: null,
    log: [],
  };

  pickNextEvent(state, config.events, config.biome ?? 'roadside');
  return state;
}

/** Resolve a choice. Moves to the 'outcome' phase; call advance() to continue. */
export function choose(state: RunState, choiceIndex: number): void {
  if (state.phase !== 'event') throw new Error(`choose() called during phase "${state.phase}"`);
  const event = state.currentEvent;
  if (!event) throw new Error('choose() called with no current event');

  const choice = event.choices[choiceIndex];
  if (!choice) throw new Error(`No choice at index ${choiceIndex} in event "${event.id}"`);
  if (!meetsCondition(state, choice.requires)) {
    throw new Error(`Choice "${choice.label}" in "${event.id}" is locked`);
  }

  const outcome = state.rng.weightedPick(choice.outcomes, (o) => o.weight);
  for (const effect of outcome.effects) applyEffect(state, effect);

  state.pendingOutcome = outcome;
  state.log.push({
    depth: state.depth,
    eventId: event.id,
    eventTitle: event.title,
    choiceLabel: choice.label,
    outcomeText: outcome.text,
  });

  if (state.hp <= 0) {
    state.causeOfDeath = event.title;
    state.phase = 'over';
  } else if (state.ending) {
    state.phase = 'over';
  } else {
    state.phase = 'outcome';
  }
}

/** Step deeper: burn wick, then draw the next event. */
export function advance(state: RunState, events: readonly GameEvent[], biome = 'roadside'): void {
  if (state.phase !== 'outcome') throw new Error(`advance() called during phase "${state.phase}"`);
  state.pendingOutcome = null;
  state.depth++;
  state.wick = Math.max(0, state.wick - WICK_PER_DEPTH);

  // The dark does not negotiate.
  if (state.wick === 0) {
    applyEffect(state, { kind: 'hp', amount: -1 });
    if (state.hp <= 0) {
      state.causeOfDeath = 'The dark';
      state.phase = 'over';
      return;
    }
  }

  pickNextEvent(state, events, biome);
}

export function isOver(state: RunState): boolean {
  return state.phase === 'over';
}

export function scoreRun(state: RunState): number {
  const statTotal = STATS.reduce((sum, stat) => sum + state.stats[stat], 0);
  const survivalBonus = state.ending ? 100 : 0;
  return state.depth * 10 + state.coin * 2 + statTotal * 5 + survivalBonus;
}

/** A compact, comparable transcript. Used by tests to prove determinism. */
export function transcript(state: RunState): string {
  return state.log
    .map((entry) => `${entry.depth}|${entry.eventId}|${entry.choiceLabel}`)
    .join('\n');
}
