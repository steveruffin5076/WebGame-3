import roadsideRaw from './events/roadside.json';
import combatDemoRaw from './events/combat_demo.json';
import roadsideEnemiesRaw from './enemies/roadside.json';
import { parseEnemies, parseEvents, type Enemy, type GameEvent } from '../engine/schema';

/**
 * Content is validated at import time. A malformed event throws here, loudly,
 * rather than surfacing as a broken run three choices in.
 */
export const ROADSIDE_EVENTS: GameEvent[] = parseEvents(roadsideRaw);

/**
 * `a_shape_on_the_road` — a system-demo encounter that exercises the step 5
 * combat engine end to end. Not part of the director's five-event voice
 * gate; separated here so the gate content stays untouched. Will likely be
 * reworded or absorbed into the wider cast during the step 7 content pass.
 */
export const COMBAT_DEMO_EVENTS: GameEvent[] = parseEvents(combatDemoRaw);

export const ALL_EVENTS: GameEvent[] = [...ROADSIDE_EVENTS, ...COMBAT_DEMO_EVENTS];

export const ROADSIDE_ENEMIES: Enemy[] = parseEnemies(roadsideEnemiesRaw);

export const ALL_ENEMIES: Enemy[] = [...ROADSIDE_ENEMIES];
