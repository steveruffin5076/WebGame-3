<script lang="ts">
  /**
   * Combat panel — enemy sprite frame, HP bars, and the impact animations
   * the Phase 6 spec calls out: enemy lunge, hit-flash, damage numbers,
   * screen shake. Real enemy sprites are step 6; this uses the same
   * placeholder-frame approach as IllustrationPanel so nothing here needs
   * to change once art exists.
   */
  interface Props {
    enemyName: string;
    enemyHp: number;
    enemyMaxHp: number;
    playerHp: number;
    playerMaxHp: number;
    /** Present only on the tick a round just resolved — drives the animation. */
    impact: { toEnemy: number; toPlayer: number } | null;
  }
  const { enemyName, enemyHp, enemyMaxHp, playerHp, playerMaxHp, impact }: Props = $props();

  const enemyPct = $derived(Math.max(0, Math.min(100, (enemyHp / enemyMaxHp) * 100)));
  const playerPct = $derived(Math.max(0, Math.min(100, (playerHp / playerMaxHp) * 100)));
</script>

<div class="frame" class:shake={impact && impact.toPlayer > 0}>
  <div class="scene">
    <div class="sprite" class:lunge={impact && impact.toPlayer > 0} class:hurt={impact && impact.toEnemy > 0}></div>
    {#if impact && impact.toEnemy > 0}
      {#key impact}
        <span class="dmg dmg-enemy">−{impact.toEnemy}</span>
      {/key}
    {/if}
    {#if impact && impact.toPlayer > 0}
      {#key impact}
        <span class="dmg dmg-player">−{impact.toPlayer}</span>
      {/key}
    {/if}
  </div>

  <div class="bars">
    <div class="bar-row">
      <span class="bar-label pixel">{enemyName.toUpperCase()}</span>
      <div class="bar"><div class="fill enemy" style:width="{enemyPct}%"></div></div>
    </div>
    <div class="bar-row">
      <span class="bar-label pixel">YOU</span>
      <div class="bar"><div class="fill player" style:width="{playerPct}%"></div></div>
    </div>
  </div>
</div>

<style>
  .frame {
    padding: 8px;
    background: var(--ink-0);
    border: 2px solid var(--ink-3);
    box-shadow: inset 0 0 0 2px var(--ink-1), inset 0 0 0 4px var(--warm-1);
    border-radius: 2px;
  }
  .frame.shake { animation: screenshake 200ms ease-in-out; }

  .scene {
    position: relative;
    aspect-ratio: 4 / 3;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    overflow: hidden;
    background: radial-gradient(circle at 50% 60%, var(--warm-1) 0%, var(--ink-0) 75%);
    display: grid;
    place-items: center;
  }

  /* Placeholder "sprite" — a simple mark standing in for a 64x64 enemy
     sprite sheet until step 6 supplies real art and animation frames. */
  .sprite {
    width: 25%;
    aspect-ratio: 1;
    background: var(--ink-4);
    border: 2px solid var(--cool-3);
    border-radius: 2px;
    transform: translateX(0);
  }
  .sprite.lunge { animation: lunge 250ms ease-out; }
  .sprite.hurt { animation: hurtflash 250ms ease-out; }

  .dmg {
    position: absolute;
    font-family: var(--font-pixel);
    font-size: 0.75rem;
    pointer-events: none;
    animation: rise-fade 600ms ease-out forwards;
  }
  .dmg-enemy { top: 35%; right: 20%; color: var(--accent-torch); }
  .dmg-player { bottom: 30%; left: 20%; color: var(--ui-critical); }

  .bars { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .bar-row { display: flex; align-items: center; gap: 0.6rem; }
  .bar-label { font-size: 0.55rem; color: var(--cool-4); width: 4.5rem; flex: none; }
  .bar { flex: 1; height: 10px; background: var(--ink-2); border: 1px solid var(--ink-3); border-radius: 1px; overflow: hidden; }
  .fill { height: 100%; transition: width 300ms ease-out; }
  .fill.enemy { background: var(--accent-blood); }
  .fill.player { background: var(--accent-torch); }

  @keyframes screenshake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-3px); }
    40% { transform: translateX(3px); }
    60% { transform: translateX(-2px); }
    80% { transform: translateX(2px); }
  }
  @keyframes lunge {
    0% { transform: translateX(0); }
    40% { transform: translateX(14%); }
    100% { transform: translateX(0); }
  }
  @keyframes hurtflash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
  @keyframes rise-fade {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-24px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .frame.shake,
    .sprite.lunge,
    .sprite.hurt,
    .dmg {
      animation: none;
    }
    .fill { transition: none; }
  }
</style>
