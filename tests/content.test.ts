import { describe, expect, it } from 'vitest';
import { ROADSIDE_EVENTS } from '../src/lib/content';
import { parseEvents } from '../src/lib/engine/schema';

describe('event content', () => {
  it('loads and validates the roadside set', () => {
    expect(ROADSIDE_EVENTS.length).toBe(5);
  });

  it('gives every event at least one choice with no requirements', () => {
    // Otherwise a run can reach an event it cannot answer.
    for (const event of ROADSIDE_EVENTS) {
      const alwaysAvailable = event.choices.filter((c) => c.requires === undefined);
      expect(alwaysAvailable.length, `"${event.id}" has no unconditional choice`).toBeGreaterThan(0);
    }
  });

  it('keeps at least one event with no entry requirement, as a fallback', () => {
    expect(ROADSIDE_EVENTS.some((e) => e.requires === undefined && !e.once)).toBe(true);
  });

  it('caps choices at four so the touch layout holds', () => {
    for (const event of ROADSIDE_EVENTS) {
      expect(event.choices.length).toBeLessThanOrEqual(4);
    }
  });

  it('never states an outcome inside a choice hint', () => {
    // Hints describe the nature of a risk, never its result.
    const spoilers = /\b(you (will )?(lose|gain)|hp|\d+\s*(damage|health))\b/i;
    for (const event of ROADSIDE_EVENTS) {
      for (const choice of event.choices) {
        if (choice.hint) {
          expect(spoilers.test(choice.hint), `"${choice.label}" hint spoils its outcome`).toBe(false);
        }
      }
    }
  });

  it('rejects an unknown field rather than ignoring it', () => {
    expect(() =>
      parseEvents([
        {
          id: 'bad_event',
          title: 'Bad',
          biome: 'roadside',
          body: 'text',
          typoedField: true,
          choices: [{ label: 'go', outcomes: [{ text: 'gone' }] }],
        },
      ]),
    ).toThrow();
  });

  it('rejects duplicate ids', () => {
    const one = {
      id: 'twin',
      title: 'Twin',
      biome: 'roadside',
      body: 'text',
      choices: [{ label: 'go', outcomes: [{ text: 'gone' }] }],
    };
    expect(() => parseEvents([one, { ...one }])).toThrow(/Duplicate event id/);
  });

  it('rejects a malformed id', () => {
    expect(() =>
      parseEvents([
        {
          id: 'Bad Id',
          title: 'Bad',
          biome: 'roadside',
          body: 'text',
          choices: [{ label: 'go', outcomes: [{ text: 'gone' }] }],
        },
      ]),
    ).toThrow();
  });
});
