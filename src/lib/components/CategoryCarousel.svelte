<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  export let categories: string[] = [];
  export let autoAdvanceSec = 8;
  export let renderCategory: (c:string)=>any;

  let idx = 0, playing = true, t=0, last=0, raf=0;
  const dispatch = createEventDispatcher();

  function next(){ idx=(idx+1)%categories.length; reset(); dispatch('change',{idx}); }
  function prev(){ idx=(idx-1+categories.length)%categories.length; reset(); dispatch('change',{idx}); }
  function reset(){ t=0; last=0; }
  function pause(){ playing=false; cancelAnimationFrame(raf); }
  function play(){ if(!playing){ playing=true; raf=requestAnimationFrame(loop);} }
  function loop(ts:number){ if(!playing) return; if(!last) last=ts; t+=(ts-last)/1000; last=ts; if(t>=autoAdvanceSec) next(); raf=requestAnimationFrame(loop); }
  function interact(){ pause(); }
  onMount(()=>{ raf=requestAnimationFrame(loop);});
  onDestroy(()=> cancelAnimationFrame(raf));
  $: pct=Math.min(100,(t/autoAdvanceSec)*100);
</script>

<div class="bar" on:mouseenter={interact}>
  {#each categories as c,i}
    <button class:selected={i===idx} on:click={()=>{idx=i;interact();dispatch('change',{idx});}}>{c}</button>
  {/each}
  <div class="spacer"></div>
  <button on:click={prev}>←</button>
  <button on:click={playing?pause:play}>{playing?'Pause':'Play'}</button>
  <button on:click={next}>→</button>
</div>
<div class="progress"><div style={`width:${pct}%`}/></div>

<div class="panel" on:click={interact} on:wheel={interact}>
  {@html renderCategory(categories[idx])}
</div>

<style>
  .bar{display:flex;gap:.5rem;align-items:center}
  .bar button{padding:.35rem .8rem;border:1px solid #ccd;background:#fff;border-radius:999px}
  .bar button.selected{background:#111;color:#fff}
  .spacer{flex:1}
  .progress{height:4px;background:#0001;border-radius:2px;margin:.5rem 0}
  .progress>div{height:4px;background:#111;border-radius:2px;transition:width .2s}
  .panel{margin-top:.5rem}
</style>
