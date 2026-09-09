<script lang="ts">
  interface Props {
    label: string;
    hint?: string | undefined;
    locked?: boolean;
    lockedReason?: string | undefined;
    shortcut?: number | undefined;
    onSelect: () => void;
  }
  const { label, hint, locked = false, lockedReason, shortcut, onSelect }: Props = $props();
</script>

<button class="choice" disabled={locked} onclick={onSelect}>
  {#if shortcut !== undefined}
    <span class="key pixel" aria-hidden="true">{shortcut}</span>
  {/if}
  <span class="text">
    <span class="label">{label}</span>
    {#if locked && lockedReason}
      <span class="hint locked">{lockedReason}</span>
    {:else if hint}
      <span class="hint">{hint}</span>
    {/if}
  </span>
</button>

<style>
  .choice {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    width: 100%;
    min-height: 56px;
    padding: 0.7rem 1rem;
    text-align: left;
    background: var(--ink-2);
    color: var(--ui-text);
    border: 1px solid var(--ink-3);
    border-radius: 2px;
    font: inherit;
    cursor: pointer;
    touch-action: manipulation;
  }
  .choice:hover:not(:disabled) { border-color: var(--warm-4); }
  .choice:focus-visible { outline: 2px solid var(--accent-torch); outline-offset: 2px; }
  .choice:disabled { opacity: 0.45; cursor: not-allowed; }

  .key {
    flex: none;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    margin-top: 0.15rem;
    font-size: 0.65rem;
    color: var(--cool-4);
    border: 1px solid var(--ink-3);
    border-radius: 2px;
  }

  .text { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
  .label { font-size: 1rem; }
  .hint { font-size: 0.8rem; color: var(--ui-text-muted); font-style: italic; }
  .hint.locked { color: var(--ui-critical); }
</style>
