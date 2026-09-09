import roadsideRaw from './events/roadside.json';
import { parseEvents, type GameEvent } from '../engine/schema';

/**
 * Content is validated at import time. A malformed event throws here, loudly,
 * rather than surfacing as a broken run three choices in.
 */
export const ROADSIDE_EVENTS: GameEvent[] = parseEvents(roadsideRaw);

export const ALL_EVENTS: GameEvent[] = [...ROADSIDE_EVENTS];
