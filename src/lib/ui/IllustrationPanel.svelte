<script lang="ts">
  /**
   * Illustration panel — Phase 6 spec, art not yet produced (step 6).
   *
   * Until real 160x120 pixel art exists, this renders a framed placeholder:
   * a biome-toned gradient with a single accent-colour torch flicker, so the
   * "framed panel" half of Phase 4's 3-second-legibility requirement is in
   * place before the art pipeline runs. Swap in an <img> here once step 6
   * ships without touching any caller.
   */
  interface Props {
    biome: string;
    tags: string[];
  }
  const { biome, tags }: Props = $props();

  /** One accent per illustration — Phase 6 palette rule. */
  const accent = $derived(tags.includes('danger') || tags.includes('wolves') ? 'var(--accent-blood)' : 'var(--accent-torch)');
</script>

<div class="frame" data-biome={biome}>
  <div class="scene">
    <div class="flicker" style:--accent={accent}></div>
  </div>
</div>

<style>
  .frame {
    aspect-ratio: 4 / 3;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 8px;
    background: var(--ink-0);
    border: 2px solid var(--ink-3);
    box-shadow:
      inset 0 0 0 2px var(--ink-1),
      inset 0 0 0 4px var(--warm-1);
    border-radius: 2px;
  }

  .scene {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom, var(--cool-1) 0%, var(--ink-0) 70%);
  }

  .flicker {
    position: absolute;
    inset: -20%;
    background: radial-gradient(circle at 50% 65%, var(--accent) 0%, transparent 55%);
    opacity: 0.22;
    animation: torch 3.6s ease-in-out infinite;
  }

  @keyframes torch {
    0%, 100% { opacity: 0.16; }
    35% { opacity: 0.26; }
    50% { opacity: 0.19; }
    72% { opacity: 0.25; }
  }

  @media (prefers-reduced-motion: reduce) {
    .flicker { animation: none; opacity: 0.2; }
  }
</style>
