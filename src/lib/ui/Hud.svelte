<script lang="ts">
  interface Props {
    depth: number;
    hp: number;
    maxHp: number;
    wick: number;
    coin: number;
    might: number;
    wits: number;
    heart: number;
  }
  const { depth, hp, maxHp, wick, coin, might, wits, heart }: Props = $props();
</script>

<div class="hud pixel">
  <span class="stat">DEPTH <b>{depth}</b></span>
  <span class="stat" class:low={hp <= 3}>HP <b>{hp}/{maxHp}</b></span>
  <span class="stat" class:low={wick <= 3}>WICK <b>{wick}</b></span>
  <span class="stat">COIN <b>{coin}</b></span>
  <span class="stat muted">M{might} W{wits} H{heart}</span>
</div>

<style>
  .hud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--ink-3);
  }
  .stat {
    font-size: 0.6rem;
    letter-spacing: 0.03em;
    color: var(--cool-4);
    white-space: nowrap;
  }
  .stat b { color: var(--ui-text); font-weight: normal; }
  .stat.low b { color: var(--ui-critical); }
  .stat.muted { color: var(--ui-text-muted); }
</style>
