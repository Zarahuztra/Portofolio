<script lang="ts">
  export let demos: { file: string; desc: string }[] = [];
  let i = 0;

  function prev(){ i = (i - 1 + demos.length) % demos.length; }
  function next(){ i = (i + 1) % demos.length; }
</script>

<div class="wrap">
  <div class="controls">
    <button on:click={prev} aria-label="Forrige">‹</button>
    <button on:click={next} aria-label="Neste">›</button>
  </div>
  <iframe class="frame" title="demo" src={demos[i]?.file}></iframe>
  <div class="desc-top-left">{demos[i]?.desc}</div>
</div>

<style>
  .wrap{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
  .controls{position:absolute;top:24px;left:0;right:0;width:100%;display:flex;justify-content:space-between;z-index:10}
  .controls button{font-size:2em;border:none;border-radius:.45em;background:#ffe1e1;color:#233;padding:.12em 1.1em .18em;box-shadow:0 3px 12px #0002}
  .frame{width:100%;height:100%;border:none;background:#222;border-radius:1.1em;box-shadow:0 6px 40px #10131a5c}
  .desc-top-left{
    position:absolute;top:16px;left:32px;font-size:1.1em;color:#2a3549;background:#dae7faea;border-radius:.9em;
    padding:.27em 1.3em .19em;box-shadow:0 1px 8px #0002;font-weight:500;z-index:11
  }
</style>
