<script lang="ts">
	import type { GalleryCategory } from '$lib/data/galleryManifest';

	export let categories: GalleryCategory[] = [];
	export let initialCategoryId: string | null = null;

	// 7x2 layout – juster om du vil
	const COLS = 7;
	const ROWS = 2;
	const COUNT = COLS * ROWS;

	let activeId = initialCategoryId ?? categories[0]?.id ?? '';
	let visible: string[] = []; // absolute src-er for grid
	let showOverlay = false;
	let overlaySrc = '';

	function pick(set: string[], n: number) {
		// shuffle uten å mutere original
		const arr = [...set];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr.slice(0, n);
	}

	function rebuild() {
		const cat = categories.find((c) => c.id === activeId);
		if (!cat) {
			visible = [];
			return;
		}
		const chosen =
			cat.files.length <= COUNT ? repeatFill(cat.files, COUNT) : pick(cat.files, COUNT);
		visible = chosen.map((name) => `${cat.base}/${name}`);
	}

	function repeatFill(files: string[], target: number) {
		const out: string[] = [];
		let i = 0;
		while (out.length < target && files.length) {
			out.push(files[i % files.length]);
			i++;
		}
		return out;
	}

	function shuffle() {
		rebuild();
	}

	function openFull(src: string) {
		overlaySrc = src;
		showOverlay = true;
	}
	function closeFull() {
		showOverlay = false;
		overlaySrc = '';
	}

	$: (activeId, rebuild());
</script>

<div class="wrap">
	<!-- Tabs / kategori-velger -->
	<div class="tabs" role="tablist" aria-label="Kategorier">
		{#each categories as c}
			<button
				class="tab"
				class:active={c.id === activeId}
				on:click={() => (activeId = c.id)}
				role="tab"
				aria-selected={c.id === activeId}
			>
				{c.title}
			</button>
		{/each}

		<div class="spacer" />
		<button class="shuffle" on:click={shuffle} title="Bytt bilder">Bytt bilder</button>
	</div>

	<!-- 7x2 grid -->
	<div class="grid" style={`--cols:${COLS}; --rows:${ROWS};`}>
		{#each visible as src (src + Math.random())}
			<div class="cell" on:click={() => openFull(src)}>
				<img {src} alt="" />
			</div>
		{/each}
	</div>

	<!-- Full visning -->
	{#if showOverlay}
		<div class="overlay" on:click={closeFull}>
			<img class="full" src={overlaySrc} alt="Full visning" />
		</div>
	{/if}
</div>

<style>
	.wrap {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden; /* ingen scroll i modalen */
		display: flex;
		flex-direction: column;
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.8rem;
	}
	.tab {
		border: 1px solid #d8dee9;
		background: #f7f8fb;
		border-radius: 0.75rem;
		padding: 0.35rem 0.75rem;
		cursor: pointer;
		font-size: 0.9rem;
	}
	.tab.active {
		background: #e9eefc;
		border-color: #bfd0ff;
		box-shadow: 0 1px 8px #bfd0ff66;
	}
	.spacer {
		flex: 1;
	}
	.shuffle {
		border: 1px solid #d8dee9;
		background: #fff;
		border-radius: 0.8rem;
		padding: 0.4rem 0.9rem;
		cursor: pointer;
	}

	.grid {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		gap: 0;
		padding: 0 8px 10px;
		overflow: visible;
	}
	.cell {
		position: relative;
		overflow: visible;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: zoom-in;
		z-index: 1;
	}
	.cell img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition:
			transform 0.22s cubic-bezier(0.77, 2.1, 0.2, 0.97),
			box-shadow 0.22s cubic-bezier(0.73, 1.6, 0.23, 1.02),
			filter 0.18s;
		will-change: transform, filter;
	}
	.cell:hover {
		z-index: 30;
	}
	.cell:hover img {
		transform: scale(1.45);
		filter: brightness(1.06) contrast(1.08);
		box-shadow:
			0 14px 72px 8px #2c34464d,
			0 2px 16px #fff8;
		border-radius: 1rem;
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: #daded9ee;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		cursor: zoom-out;
	}
	.full {
		max-width: 96%;
		max-height: 92%;
		object-fit: contain;
		border-radius: 1.6rem;
		box-shadow:
			0 12px 72px 12px #2d374850,
			0 3px 22px #fff9;
		animation: pop 0.22s cubic-bezier(0.64, 1.55, 0.18, 0.95);
	}
	@keyframes pop {
		from {
			transform: scale(0.85);
		}
		to {
			transform: scale(1);
		}
	}
</style>
