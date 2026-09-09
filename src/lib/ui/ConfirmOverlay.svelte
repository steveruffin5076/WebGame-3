<script lang="ts">
  interface Props {
    message: string;
    confirmLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  const { message, confirmLabel, onConfirm, onCancel }: Props = $props();
</script>

<button class="backdrop" aria-label="Close" onclick={onCancel}></button>
<div class="box" role="alertdialog" aria-modal="true" tabindex="-1">
  <p>{message}</p>
  <div class="row">
    <button class="ghost" onclick={onCancel}>Never mind</button>
    <button class="danger" onclick={onConfirm}>{confirmLabel}</button>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgb(11 10 12 / 0.75);
    border: none;
    padding: 0;
    z-index: 10;
    cursor: default;
  }
  .box {
    position: fixed;
    inset: 0;
    margin: auto;
    z-index: 11;
    background: var(--ink-2);
    border: 1px solid var(--ink-3);
    border-radius: 2px;
    padding: 1.25rem;
    max-width: 40ch;
    width: calc(100% - 3rem);
    height: fit-content;
  }
  .box p { margin: 0 0 1rem; }
  .row { display: flex; gap: 12px; }
  .row button {
    flex: 1;
    min-height: 48px;
    font: inherit;
    border-radius: 2px;
    cursor: pointer;
  }
  .ghost { background: var(--ink-1); color: var(--ui-text); border: 1px solid var(--ink-3); }
  .danger { background: var(--ink-1); color: var(--ui-critical); border: 1px solid var(--ui-critical); }
</style>
