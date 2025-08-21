<script>
  export let logoText = 'LOGO'; // bytt til SVG senere
</script>

<header class="hdr">
  <a class="logo" href="/">{logoText}</a>
  <nav><a href="/kontakt">Kontakt</a></nav>
</header>

<style>
  .hdr{
    position:sticky;top:0;z-index:50;
    display:flex;align-items:center;justify-content:space-between;
    padding:12px 20px;background:var(--app-bg);border-bottom:1px solid #dfe3ea;
    backdrop-filter: blur(6px);
  }
  .logo{font-weight:800;text-decoration:none;letter-spacing:.02em}
  nav a{text-decoration:none;font-weight:600}
</style>
