<script lang="ts">
  export let demos: {file:string; desc:string}[] = [];
  let i=0;
  function prev(){ i=(i-1+demos.length)%demos.length; }
  function next(){ i=(i+1)%demos.length; }
</script>

<div class="wrap">
  <div class="controls">
    <button on:click={prev}>←</button>
    <div class="desc">{demos[i]?.desc}</div>
    <button on:click={next}>→</button>
  </div>
  <iframe title="demo" src={demos[i]?.file} />
</div>

<style>
  .wrap{position:relative;background:#222;border-radius:14px;box-shadow:0 10px 40px #10131a50}
  .controls{position:absolute;inset:12px 12px auto 12px;display:flex;gap:.6rem;align-items:center;z-index:2}
  iframe{display:block;width:min(100%,900px);height:520px;border:0;border-radius:14px}
  .desc{color:#fff;background:#0007;padding:.2rem .6rem;border-radius:10px}
  button{border:0;border-radius:10px;padding:.3rem .7rem}
</style>
