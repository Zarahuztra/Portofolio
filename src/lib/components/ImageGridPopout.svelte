<script lang="ts">
	export type ImgItem = { src: string; title?: string };
	export let images: ImgItem[] = [];
	export let rows = 2;
	export let cols = 7;

	let overlayOpen = false;
	let overlaySrc = '';

	function open(src: string) {
		overlaySrc = src;
		overlayOpen = true;
	}
	function close() {
		overlayOpen = false;
	}
</script>

<div class="grid" style="--cols:{cols};--rows:{rows}">
	{#each Array(rows * cols) as _, i}
		{#if images[i % images.length]}
			<div class="cell" on:click={() => open(images[i % images.length].src)} tabindex="0">
				<img src={images[i % images.length].src} alt={images[i % images.length].title || ''} />
			</div>
		{/if}
	{/each}
</div>

{#if overlayOpen}
	<div class="overlay" on:click={close} role="dialog" aria-modal="true">
		<img class="big" src={overlaySrc} alt="" />
	</div>
{/if}

<style>
	.grid {
		width: 100%;
		max-width: 1000px;
		height: 350px;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		gap: 0;
		position: relative;
		overflow: visible;
	}
	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
	}
	.cell img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition:
			transform 0.2s cubic-bezier(0.77, 2.1, 0.2, 0.97),
			filter 0.18s,
			box-shadow 0.21s cubic-bezier(0.73, 1.6, 0.23, 1.02);
	}
	.cell:hover {
		z-index: 33;
	}
	.cell:hover img {
		transform: scale(1.48);
		filter: brightness(1.08) contrast(1.11);
		box-shadow:
			0 12px 72px 7px #272b374f,
			0 2px 16px #fff8;
		border-radius: 1.2em;
	}

	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(218, 221, 230, 0.93);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}
	.big {
		max-width: 97vw;
		max-height: 91vh;
		object-fit: contain;
		border-radius: 2.1em;
		box-shadow:
			0 12px 72px 15px #2c374950,
			0 3px 22px #fff9;
		animation: pop 0.24s cubic-bezier(0.64, 1.55, 0.18, 0.95);
	}
	@keyframes pop {
		from {
			transform: scale(0.81);
		}
		to {
			transform: scale(1);
		}
	}
</style>
