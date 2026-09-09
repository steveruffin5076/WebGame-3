import { z } from 'zod';

/**
 * Event content schema.
 *
 * Events are data, never code. Adding event #400 must cost what event #40
 * cost — that is the architectural answer to the repetition complaint that
 * dogs this genre. Every file is validated at load time so a typo in one
 * event fails loudly instead of quietly producing a broken run.
 */

export const STATS = ['might', 'wits', 'heart'] as const;
export type StatName = (typeof STATS)[number];

const statName = z.enum(STATS);
const id = z.string().min(1).regex(/^[a-z0-9_]+$/, 'ids are lowercase, digits and underscores');

/** A single mutation applied to the run state. */
export const effectSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('hp'), amount: z.number().int() }),
  z.object({ kind: z.literal('maxHp'), amount: z.number().int() }),
  z.object({ kind: z.literal('coin'), amount: z.number().int() }),
  /** Wick: the light you travel by. It only ever falls, except when it doesn't. */
  z.object({ kind: z.literal('wick'), amount: z.number().int() }),
  z.object({ kind: z.literal('stat'), stat: statName, amount: z.number().int() }),
  z.object({ kind: z.literal('flag'), set: id.optional(), clear: id.optional() }),
  z.object({ kind: z.literal('item'), add: id.optional(), remove: id.optional() }),
  z.object({ kind: z.literal('end'), ending: id }),
  /** Starts a fight. Resolved round by round by the run engine, not content. */
  z.object({ kind: z.literal('combat'), enemy: id }),
]);
export type Effect = z.infer<typeof effectSchema>;

/** Gate on run state. All present fields must pass. */
export const conditionSchema = z
  .object({
    minDepth: z.number().int().nonnegative().optional(),
    maxDepth: z.number().int().nonnegative().optional(),
    minWick: z.number().int().optional(),
    maxWick: z.number().int().optional(),
    minCoin: z.number().int().optional(),
    minHp: z.number().int().optional(),
    /** Every flag must be set. */
    flags: z.array(id).optional(),
    /** No flag may be set. */
    notFlags: z.array(id).optional(),
    /** Every item must be held. */
    items: z.array(id).optional(),
    minStat: z
      .object({
        might: z.number().int().optional(),
        wits: z.number().int().optional(),
        heart: z.number().int().optional(),
      })
      .strict()
      .optional(),
  })
  .strict();
export type Condition = z.infer<typeof conditionSchema>;

export const outcomeSchema = z
  .object({
    /** Relative weight among the sibling outcomes of one choice. */
    weight: z.number().positive().default(1),
    /** Prose shown after the choice resolves. */
    text: z.string().min(1),
    effects: z.array(effectSchema).default([]),
  })
  .strict();
export type Outcome = z.infer<typeof outcomeSchema>;

export const choiceSchema = z
  .object({
    /**
     * What the player does — stated plainly. Vague choice wording is the
     * second-loudest complaint in this genre; a label must never mislead.
     */
    label: z.string().min(1),
    /**
     * The *nature* of the risk, never the result. "You will have to touch it."
     * is a hint. "You lose 5 HP." is a spoiler. Optional.
     */
    hint: z.string().optional(),
    requires: conditionSchema.optional(),
    /** When requires fails: hide the choice, or show it greyed with a reason. */
    whenLocked: z.enum(['hide', 'show']).default('show'),
    lockedReason: z.string().optional(),
    outcomes: z.array(outcomeSchema).min(1),
  })
  .strict();
export type Choice = z.infer<typeof choiceSchema>;

export const eventSchema = z
  .object({
    id,
    title: z.string().min(1),
    biome: id,
    /** Free-form tags used for weighting, theming and run variety. */
    tags: z.array(id).default([]),
    /** Base selection weight before contextual modifiers. */
    weight: z.number().positive().default(1),
    /** If true, may appear at most once per run. */
    once: z.boolean().default(false),
    requires: conditionSchema.optional(),
    /** Filename in the illustration set; absent means text-only. */
    illustration: z.string().optional(),
    body: z.string().min(1),
    choices: z.array(choiceSchema).min(1).max(4),
  })
  .strict();
export type GameEvent = z.infer<typeof eventSchema>;

export const eventFileSchema = z.array(eventSchema);

/**
 * An enemy: one tier for the vertical slice (Phase 4/6 spec). Combat itself
 * is engine logic (see run.ts) — this is only the numbers and flavor text
 * that make one enemy different from another.
 */
export const enemySchema = z
  .object({
    id,
    name: z.string().min(1),
    tier: z.number().int().positive().default(1),
    maxHp: z.number().int().positive(),
    might: z.number().int().nonnegative(),
    wits: z.number().int().nonnegative(),
    tags: z.array(id).default([]),
    /** Shown when the player successfully breaks off and runs. */
    fleeText: z.string().min(1),
    /** Shown when the enemy's hp reaches zero. */
    victoryText: z.string().min(1),
    /** Effects applied once, on victory only (loot, stat gain, flags). */
    rewardEffects: z.array(effectSchema).default([]),
  })
  .strict();
export type Enemy = z.infer<typeof enemySchema>;

export const enemyFileSchema = z.array(enemySchema);

/** Parses and validates raw enemy data, reporting the offending path. */
export function parseEnemies(raw: unknown): Enemy[] {
  const result = enemyFileSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  · ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Enemy content failed validation:\n${issues}`);
  }

  const seen = new Set<string>();
  for (const enemy of result.data) {
    if (seen.has(enemy.id)) throw new Error(`Duplicate enemy id: "${enemy.id}"`);
    seen.add(enemy.id);
  }
  return result.data;
}

/** Parses and validates raw event data, reporting the offending event id. */
export function parseEvents(raw: unknown): GameEvent[] {
  const result = eventFileSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  · ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Event content failed validation:\n${issues}`);
  }

  const seen = new Set<string>();
  for (const event of result.data) {
    if (seen.has(event.id)) throw new Error(`Duplicate event id: "${event.id}"`);
    seen.add(event.id);
  }
  return result.data;
}
