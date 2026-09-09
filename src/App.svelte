<script lang="ts">
  import { ALL_EVENTS } from './lib/content';
  import {
    CLASSES,
    advance,
    choose,
    isOver,
    scoreRun,
    startRun,
    visibleChoices,
    type RunState,
  } from './lib/engine/run';
  import { dailySeedString } from './lib/engine/rng';

  let seed = $state(dailySeedString());
  let classId = $state(CLASSES[0]!.id);
  let run = $state<RunState | null>(null);
  let tick = $state(0);

  const options = $derived(run && run.phase === 'event' ? visibleChoices(run) : []);

  function begin() {
    run = startRun({ seed, classId, events: ALL_EVENTS, mode: 'daily' });
    tick++;
  }

  function take(index: number) {
    if (!run) return;
    choose(run, index);
    tick++;
  }

  function next() {
    if (!run) return;
    advance(run, ALL_EVENTS);
    tick++;
  }
</script>

<header>
  <h1>Wickmarrow</h1>
  <p class="sub">Scaffold reader — engine and content only. No art, no designed UI yet.</p>
</header>

{#if !run}
  <section class="setup">
    <label>
      Seed
      <input bind:value={seed} spellcheck="false" />
    </label>
    <label>
      Character
      <select bind:value={classId}>
        {#each CLASSES as cls (cls.id)}
          <option value={cls.id}>{cls.name}</option>
        {/each}
      </select>
    </label>
    <p class="blurb">{CLASSES.find((c) => c.id === classId)?.blurb}</p>
    <button class="primary" onclick={begin}>Set out</button>
  </section>
{:else}
  {#key tick}
    <section class="hud">
      <span>Depth {run.depth}</span>
      <span class:low={run.hp <= 3}>Health {run.hp}/{run.maxHp}</span>
      <span class:low={run.wick <= 3}>Wick {run.wick}</span>
      <span>Coin {run.coin}</span>
      <span>M{run.stats.might} · W{run.stats.wits} · H{run.stats.heart}</span>
    </section>

    {#if run.phase === 'event' && run.currentEvent}
      <article>
        <h2>{run.currentEvent.title}</h2>
        {#each run.currentEvent.body.split('\n\n') as para}
          <p>{para}</p>
        {/each}
      </article>
      <nav>
        {#each options as option (option.index)}
          <button
            class="choice"
            disabled={option.locked}
            onclick={() => take(option.index)}
          >
            <span class="label">{option.choice.label}</span>
            {#if option.locked && option.choice.lockedReason}
              <span class="hint locked">{option.choice.lockedReason}</span>
            {:else if option.choice.hint}
              <span class="hint">{option.choice.hint}</span>
            {/if}
          </button>
        {/each}
      </nav>
    {:else if run.phase === 'outcome' && run.pendingOutcome}
      <article class="outcome">
        {#each run.pendingOutcome.text.split('\n\n') as para}
          <p>{para}</p>
        {/each}
      </article>
      <nav>
        <button class="choice" onclick={next}><span class="label">Go on.</span></button>
      </nav>
    {:else if isOver(run)}
      <article class="outcome">
        {#if run.pendingOutcome}
          {#each run.pendingOutcome.text.split('\n\n') as para}
            <p>{para}</p>
          {/each}
        {/if}
        <hr />
        <h2>{run.ending ? 'The road ends.' : 'You do not get up.'}</h2>
        <p class="epitaph">
          {CLASSES.find((c) => c.id === run?.classId)?.name} ·
          depth {run.depth} ·
          {run.causeOfDeath ?? 'survived'} ·
          score {scoreRun(run)}
        </p>
        <p class="epitaph muted">{run.log.length} choices made · seed “{run.seed}”</p>
      </article>
      <nav>
        <button class="choice" onclick={() => (run = null)}><span class="label">Again.</span></button>
      </nav>
    {/if}
  {/key}
{/if}

<style>
  header { border-bottom: 1px solid var(--ink-3); padding-bottom: 0.75rem; margin-bottom: 1.5rem; }
  h1 { font-size: 1.6rem; margin: 0; letter-spacing: 0.02em; }
  .sub { color: var(--text-muted); font-size: 0.85rem; margin: 0.35rem 0 0; font-style: italic; }
  h2 { font-size: 1.15rem; margin: 0 0 0.75rem; color: var(--warm-4); }

  .setup { display: flex; flex-direction: column; gap: 1rem; }
  label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: var(--text-muted); }
  input, select {
    background: var(--ink-0); color: var(--text); border: 1px solid var(--ink-3);
    padding: 0.6rem; font: inherit; font-size: 1rem; border-radius: 2px; min-height: 48px;
  }
  .blurb { color: var(--text-muted); font-style: italic; margin: 0; }

  .hud {
    display: flex; flex-wrap: wrap; gap: 0.35rem 1rem;
    font-family: ui-monospace, monospace; font-size: 0.8rem;
    color: var(--cool-4); border-bottom: 1px solid var(--ink-2);
    padding-bottom: 0.6rem; margin-bottom: 1.25rem;
  }
  .low { color: var(--accent-blood); }

  article p { margin: 0 0 1rem; }
  .outcome p { color: var(--text-muted); }
  hr { border: none; border-top: 1px solid var(--ink-3); margin: 1.5rem 0; }
  .epitaph { font-family: ui-monospace, monospace; font-size: 0.8rem; color: var(--accent-torch); }
  .epitaph.muted { color: var(--text-muted); }

  nav { display: flex; flex-direction: column; gap: 12px; margin-top: 1.5rem; }
  .choice {
    display: flex; flex-direction: column; gap: 0.2rem; align-items: flex-start;
    width: 100%; min-height: 56px; padding: 0.75rem 1rem; text-align: left;
    background: var(--ink-2); color: var(--text);
    border: 1px solid var(--ink-3); border-radius: 2px;
    font: inherit; cursor: pointer;
  }
  .choice:hover:not(:disabled) { border-color: var(--warm-4); }
  .choice:disabled { opacity: 0.45; cursor: not-allowed; }
  .label { font-size: 1rem; }
  .hint { font-size: 0.8rem; color: var(--text-muted); font-style: italic; }
  .hint.locked { color: var(--accent-blood); }

  .primary { min-height: 56px; background: var(--ink-3); color: var(--text); border: 1px solid var(--warm-4); font: inherit; font-size: 1rem; border-radius: 2px; cursor: pointer; }
</style>
