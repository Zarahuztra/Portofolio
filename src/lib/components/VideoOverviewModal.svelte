<script lang="ts">
  import type { VideoManifest } from '$lib/types/video';
  import { createEventDispatcher } from 'svelte';

  export let manifests: VideoManifest[] = [];
  export let perCategory = 2; // vis 1–2 klipp per kategori

  const dispatch = createEventDispatcher();

  function openCategory(cat: string) {
    // La parent vite at vi vil “gå dypere” på denne kategorien
    dispatch('openCategory', { category: cat });
  }
</script>

<div class="wrap">
  {#each manifests as m}
    <section class="cat">
      <header>
        <h3>{m.category}</h3>
        <button class="seeall" on:click={() => openCategory(m.category)}>
          Se alle
        </button>
      </header>

      <div class="row">
        {#each m.items.slice(0, perCategory) as v}
          <figure class="tile">
            <video
              src={v.src}
              { ...{ muted: v.muted ?? true, loop: v.loop ?? true } }
              playsinline
              preload="none"
              poster={v.poster}
              on:mouseenter={(e)=> (e.currentTarget as HTMLVideoElement).play()}
              on:mouseleave={(e)=> { const el = e.currentTarget as HTMLVideoElement; el.pause(); el.currentTime = 0; }}
            />
            {#if v.title}<figcaption>{v.title}</figcaption>{/if}
          </figure>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  .wrap { display: grid; gap: 22px; }
  .cat { background: #fff; border: 1px solid #e5e9f1; border-radius: 16px; padding: 14px 14px 16px; }
  header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  h3 { margin: 0; font-size: 1.1rem; }
  .seeall { border: 1px solid #ccd; background: #f9fafc; border-radius: 999px; padding: .3rem .75rem; }
  .row { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
  .tile { margin: 0; display: grid; gap: 6px; }
  video { width: 100%; aspect-ratio: 16/9; background: #111; border-radius: 12px; display: block; }
  figcaption { font-size: .9rem; color: #3a455c; }
</style>
