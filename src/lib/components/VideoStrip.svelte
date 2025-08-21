<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export type VideoItem = { src: string; poster?: string; muted?: boolean; loop?: boolean };
	export let items: VideoItem[] = [];
	export let stripeWidth = 400; // tilsvarer .masked-video width
	export let height = 350;
	export let pxPerSec = 48;

	let sliderEl: HTMLDivElement;
	let pos = 0,
		last = 0,
		raf = 0;

	function tick(ts: number) {
		if (!last) last = ts;
		const dt = (ts - last) / 1000;
		last = ts;

		pos += pxPerSec * dt;
		if (pos >= stripeWidth) {
			// flytt første “stripe” bakerst for evig scroll
			const first = sliderEl.children[0];
			if (first) sliderEl.appendChild(first);
			pos -= stripeWidth;
		}
		sliderEl.style.transform = `translateX(${-pos}px)`;
		raf = requestAnimationFrame(tick);
	}

	onMount(() => {
		raf = requestAnimationFrame(tick);
	});
	onDestroy(() => cancelAnimationFrame(raf));
</script>

<div class="strip" bind:this={sliderEl} style="height:{height}px">
	{#each items as v}
		<div class="cell" style="width:{stripeWidth}px;height:{height}px">
			<video src={v.src} {height} autoplay loop muted playsinline poster={v.poster} />
		</div>
	{/each}
</div>

<style>
	.strip {
		position: relative;
		display: flex;
		align-items: center;
		will-change: transform;
		gap: 0;
		overflow: hidden; /* selve containeren ligger i modalen */
	}
	.cell {
		flex-shrink: 0;
		position: relative;
		overflow: hidden;
		background: #f7f8fa;
	}
	.cell video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
