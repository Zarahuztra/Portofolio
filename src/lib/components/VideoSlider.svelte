<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let sources: string[] = [];      // videofiler (absolute eller /video/…)
  export let captions: string[] = [];     // h3-tekster som rullerer
  export let pxPerSec = 48;               // hastighet
  export let stripeW = 400;               // bredde per stripe (må matche CSS/video)

  let sliderEl: HTMLDivElement;
  let req = 0, pos = 0, last = 0;

  function loop(ts: number) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000;
    last = ts;
    pos += pxPerSec * dt;
    if (pos >= stripeW && sliderEl?.children.length) {
      sliderEl.appendChild(sliderEl.children[0]);
      pos -= stripeW;
    }
    sliderEl.style.transform = `translateX(${-pos}px)`;
    req = requestAnimationFrame(loop);
  }

  onMount(() => { req = requestAnimationFrame(loop); });
  onDestroy(() => cancelAnimationFrame(req));

  // h3 caption-rotasjon
  let i = 0;
  let h3El: HTMLHeadingElement;
  let captionTimer: number;

  function showNext() {
    if (!h3El || captions.length === 0) return;
    h3El.textContent = captions[i];
    h3El.style.animation = 'none';
    // force reflow
    void h3El.offsetWidth;
    h3El.style.animation = "slideInOut 6s cubic-bezier(.65,1.4,.33,1.05) forwards";
    i = (i + 1) % captions.length;
    captionTimer = window.setTimeout(showNext, 6000);
  }

  onMount(() => { showNext(); return () => clearTimeout(captionTimer); });
</script>

<div class="box-3d">
  <div class="video-slider" bind:this={sliderEl}>
    {#each sources as src}
      <div class="masked-video">
        <video src={src} autoplay loop muted playsinline></video>
      </div>
    {/each}
  </div>

  <div class="slider-h3-container">
    <h3 class="slider-h3" bind:this={h3El}></h3>
  </div>
</div>

<style>
  .box-3d{
    width:1000px;height:350px;border-radius:2.2em;
    background:linear-gradient(120deg,#e3e6ec 0%,#c1c7d0 100%);
    box-shadow:0 2px 30px 3px #a8b0ba2b,inset 0 2.5px 16px 2px #b7b7b933;
    overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;
  }
  .video-slider{display:flex;align-items:center;height:100%;position:absolute;left:0;top:0;gap:0;will-change:transform;transition:transform 0s;}
  .masked-video{width:400px;height:350px;background:#f7f8fa;overflow:hidden;flex-shrink:0;display:flex;align-items:stretch;justify-content:center;position:relative;}
  .masked-video video{width:100%;height:100%;object-fit:cover;position:absolute;left:0;top:0;display:block}

  .slider-h3-container{position:absolute;inset:0;z-index:9;display:flex;align-items:center;justify-content:center;pointer-events:none;}
  .slider-h3{
    font-family:"Bangers",sans-serif;font-weight:800;font-size:2.5rem;letter-spacing:.01em;color:#1a2433;
    background:linear-gradient(90deg,#fff8,#eef5fc 60%,#bcd8ffcc);
    border-radius:.6em;box-shadow:0 2px 18px 1px #c1d6eb49;padding:.2em 1.4em .26em 1.3em;min-width:12em;text-align:center;opacity:0;
    transform:translateX(-110%) scale(.8);
    animation:slideInOut 6s cubic-bezier(.65,1.4,.33,1.05) forwards;
  }
  @keyframes slideInOut{
    0%{opacity:0;transform:translateX(-110%) scale(.8) rotate(-7deg)}
    12%{opacity:1;transform:translateX(0%) scale(1.05) rotate(.9deg)}
    18%,79%{opacity:1;transform:translateX(0%) scale(1) rotate(0)}
    100%{opacity:0;transform:translateX(100%) scale(1)}
  }
</style>
