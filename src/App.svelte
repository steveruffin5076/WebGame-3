<script lang="ts">
  import { ALL_ENEMIES, ALL_EVENTS } from './lib/content';
  import {
    CLASSES,
    advance,
    choose,
    combatActions,
    continueCombat,
    isOver,
    resolveCombat,
    scoreRun,
    startRun,
    visibleChoices,
    type CombatActionId,
    type RunState,
  } from './lib/engine/run';
  import { dailySeedString } from './lib/engine/rng';
  import IllustrationPanel from './lib/ui/IllustrationPanel.svelte';
  import CombatPanel from './lib/ui/CombatPanel.svelte';
  import Hud from './lib/ui/Hud.svelte';
  import ChoiceButton from './lib/ui/ChoiceButton.svelte';
  import ConfirmOverlay from './lib/ui/ConfirmOverlay.svelte';

  let seed = $state(dailySeedString());
  let classId = $state(CLASSES[0]!.id);
  let run = $state<RunState | null>(null);
  let tick = $state(0);
  let confirmingAbandon = $state(false);

  const options = $derived(run && run.phase === 'event' ? visibleChoices(run) : []);

  function begin() {
    run = startRun({ seed, classId, events: ALL_EVENTS, mode: 'daily' });
    tick++;
  }

  function take(index: number) {
    if (!run) return;
    choose(run, index, ALL_ENEMIES);
    tick++;
  }

  function next() {
    if (!run) return;
    advance(run, ALL_EVENTS);
    tick++;
  }

  function act(actionId: CombatActionId) {
    if (!run) return;
    resolveCombat(run, actionId);
    tick++;
  }

  function nextRound() {
    if (!run) return;
    continueCombat(run, ALL_EVENTS);
    tick++;
  }

  function abandon() {
    run = null;
    confirmingAbandon = false;
  }

  /**
   * Keyboard support (Phase 6 spec): 1-9 select choices, Space/Enter
   * advance, Esc opens the abandon-run menu. Ignored while a form field
   * has focus so typing a seed never triggers a shortcut.
   */
  function onKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement | null;
    if (target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
    if (!run) return;

    if (e.key === 'Escape') {
      confirmingAbandon = !confirmingAbandon;
      e.preventDefault();
      return;
    }
    if (confirmingAbandon) return;

    if (run.phase === 'event') {
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= options.length) {
        const option = options[n - 1]!;
        if (!option.locked) {
          take(option.index);
          e.preventDefault();
        }
      }
      return;
    }

    if (run.phase === 'combat') {
      const n = Number(e.key);
      const actions = combatActions();
      if (Number.isInteger(n) && n >= 1 && n <= actions.length) {
        act(actions[n - 1]!.id);
        e.preventDefault();
      }
      return;
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (run.phase === 'outcome') next();
      else if (run.phase === 'combatOutcome') nextRound();
      else if (isOver(run)) run = null;
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header>
  <h1 class="pixel">WICKMARROW</h1>
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
    <Hud
      depth={run.depth}
      hp={run.hp}
      maxHp={run.maxHp}
      wick={run.wick}
      coin={run.coin}
      might={run.stats.might}
      wits={run.stats.wits}
      heart={run.stats.heart}
    />

    <main>
      {#if run.phase === 'event' && run.currentEvent}
        <IllustrationPanel biome={run.currentEvent.biome} tags={run.currentEvent.tags} />
        <article>
          <h2>{run.currentEvent.title}</h2>
          {#each run.currentEvent.body.split('\n\n') as para}
            <p>{para}</p>
          {/each}
        </article>
      {:else if run.phase === 'outcome' && run.pendingOutcome}
        <article class="outcome">
          {#each run.pendingOutcome.text.split('\n\n') as para}
            <p>{para}</p>
          {/each}
        </article>
      {:else if run.phase === 'combat' && run.enemy}
        <CombatPanel
          enemyName={run.enemy.name}
          enemyHp={run.enemyHp}
          enemyMaxHp={run.enemy.maxHp}
          playerHp={run.hp}
          playerMaxHp={run.maxHp}
          impact={null}
        />
      {:else if run.phase === 'combatOutcome'}
        <CombatPanel
          enemyName={run.enemy?.name ?? 'the fight'}
          enemyHp={run.enemyHp}
          enemyMaxHp={run.enemy?.maxHp ?? 1}
          playerHp={run.hp}
          playerMaxHp={run.maxHp}
          impact={run.lastCombatDamage}
        />
        {#if run.combatText}
          <article class="outcome">
            {#each run.combatText.split('\n\n') as para}
              <p>{para}</p>
            {/each}
          </article>
        {/if}
      {:else if isOver(run)}
        <article class="outcome">
          {#if run.pendingOutcome}
            {#each run.pendingOutcome.text.split('\n\n') as para}
              <p>{para}</p>
            {/each}
          {:else if run.combatText}
            {#each run.combatText.split('\n\n') as para}
              <p>{para}</p>
            {/each}
          {/if}
          <hr />
          <h2>{run.ending ? 'The road ends.' : 'You do not get up.'}</h2>
          <p class="epitaph pixel">
            {CLASSES.find((c) => c.id === run?.classId)?.name} ·
            depth {run.depth} ·
            {run.causeOfDeath ?? 'survived'} ·
            score {scoreRun(run)}
          </p>
          <p class="epitaph muted">{run.log.length} choices made · seed “{run.seed}”</p>
        </article>
      {/if}
    </main>

    <nav>
      {#if run.phase === 'event'}
        {#each options as option, i (option.index)}
          <ChoiceButton
            label={option.choice.label}
            hint={option.choice.hint}
            locked={option.locked}
            lockedReason={option.choice.lockedReason}
            shortcut={i + 1}
            onSelect={() => take(option.index)}
          />
        {/each}
      {:else if run.phase === 'outcome'}
        <ChoiceButton label="Go on." onSelect={next} />
      {:else if run.phase === 'combat'}
        {#each combatActions() as action, i (action.id)}
          <ChoiceButton
            label={action.label}
            hint={action.hint}
            shortcut={i + 1}
            onSelect={() => act(action.id)}
          />
        {/each}
      {:else if run.phase === 'combatOutcome'}
        <ChoiceButton label="Continue." onSelect={nextRound} />
      {:else if isOver(run)}
        <ChoiceButton label="Again." onSelect={() => (run = null)} />
      {/if}
    </nav>
  {/key}

  {#if confirmingAbandon}
    <ConfirmOverlay
      message="Abandon this run? Depth and progress will be lost."
      confirmLabel="Abandon"
      onConfirm={abandon}
      onCancel={() => (confirmingAbandon = false)}
    />
  {/if}
{/if}

<style>
  header { border-bottom: 1px solid var(--ink-3); padding-bottom: 0.75rem; margin-bottom: 1rem; }
  h1 { font-size: 1rem; margin: 0; letter-spacing: 0.04em; color: var(--ui-text); }
  h2 { font-size: 1.15rem; margin: 1rem 0 0.75rem; color: var(--warm-5); }

  .setup { display: flex; flex-direction: column; gap: 1rem; }
  label { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.85rem; color: var(--ui-text-muted); }
  input, select {
    background: var(--ink-0); color: var(--ui-text); border: 1px solid var(--ink-3);
    padding: 0.6rem; font: inherit; font-size: 1rem; border-radius: 2px;
  }
  .blurb { color: var(--ui-text-muted); font-style: italic; margin: 0; }

  main {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  article p { margin: 0 0 1rem; }
  .outcome p { color: var(--ui-text-muted); }
  hr { border: none; border-top: 1px solid var(--ink-3); margin: 1.5rem 0; }
  .epitaph { font-size: 0.7rem; color: var(--accent-torch); line-height: 1.8; }
  .epitaph.muted { font-family: var(--font-serif); font-size: 0.85rem; color: var(--ui-text-muted); }

  nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 1rem;
    flex: none;
  }

  .primary {
    min-height: 56px; background: var(--ink-3); color: var(--ui-text);
    border: 1px solid var(--warm-4); font: inherit; font-size: 1rem;
    border-radius: 2px; cursor: pointer;
  }
</style>
