<!-- src/lib/components/ImageShowreel.svelte -->
<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import type { MediaManifest } from '$lib/types/media';
	import { fly } from 'svelte/transition';

	export let manifests: MediaManifest[] = [];
	export let playing = true;
	export let stripeWidth = 400;
	export let speedPxPerSec = 48;

	export let headlines: string[] = [
		'Generative Image Generation',
		'Retouch og Production for web',
		'Designvariants, assets og logos',
		'Style og Mood Exploration with AI',
		'Advanced Prompt Design'
	];

	const items = manifests.flatMap((g) => g.items.slice(0, 2));

	const dispatch = createEventDispatcher<{ cycleComplete: void }>();

	let pos = 0,
		last = 0,
		raf = 0,
		rotations = 0;

	function tickFrame(t: number) {
		if (!playing) {
			last = t;
			raf = requestAnimationFrame(tickFrame);
			return;
		}
		if (!last) last = t;
		const dt = (t - last) / 1000;
		last = t;
		pos += speedPxPerSec * dt;

		if (pos >= stripeWidth) {
			const slider = document.getElementById('imageStripe');
			if (slider && slider.firstElementChild) {
				slider.appendChild(slider.firstElementChild);
				rotations++;
				if (rotations % items.length === 0) {
					dispatch('cycleComplete');
				}
			}
			pos -= stripeWidth;
		}
		const slider = document.getElementById('imageStripe') as HTMLElement | null;
		if (slider) slider.style.transform = `translateX(${-pos}px)`;

		raf = requestAnimationFrame(tickFrame);
	}

	let headlineIndex = 0;
	let timer: number | null = null;
	function startHeadlines() {
		stopHeadlines();
		timer = window.setInterval(() => {
			headlineIndex = (headlineIndex + 1) % headlines.length;
		}, 6000);
	}
	function stopHeadlines() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	onMount(() => {
		raf = requestAnimationFrame(tickFrame);
		startHeadlines();
	});
	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
		stopHeadlines();
	});
</script>

<div class="showreel">
	<div id="imageStripe" class="stripe" style="--stripe-w:{stripeWidth}px">
		{#each items as it}
			<div class="tile"><img src={it.src} alt={it.title || ''} loading="lazy" /></div>
		{/each}
	</div>

	<div class="headline">
		{#key headlineIndex}
			<h3
				class="title"
				in:fly={{ x: -140, duration: 550, opacity: 0 }}
				out:fly={{ x: 140, duration: 420, opacity: 0 }}
			>
				{headlines[headlineIndex]}
			</h3>
		{/key}
	</div>
</div>

<style>
	.showreel {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.stripe {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: stretch;
		will-change: transform;
		transition: transform 0s;
	}
	.tile {
		width: var(--stripe-w, 400px);
		height: 100%;
		flex-shrink: 0;
		overflow: hidden;
		background: #f7f8fa;
		border-radius: 0;
		box-shadow: none;
	}
	.tile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.headline {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 5;
	}
	.title {
		font-family: 'Bangers', system-ui, sans-serif;
		font-weight: 800;
		font-size: 2.2rem;
		letter-spacing: 0.01em;
		color: #1a2433;
		background: linear-gradient(90deg, #fff8, #eef5fc 60%, #bcd8ffcc);
		border-radius: 0.6em;
		box-shadow: 0 2px 18px 1px #c1d6eb49;
		padding: 0.2em 1.4em 0.26em 1.3em;
		text-align: center;
	}
</style>
