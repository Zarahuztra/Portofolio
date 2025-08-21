<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { EyecandyManifest } from '$lib/data/frontendEyecandyManifest';

	export let manifests: EyecandyManifest[] = [];
	export let playing = true;
	export let stripeWidth = 400;
	export let speedPxPerSec = 48;

	// korte headlines for frontend-delen (juster som du vil)
	export let headlines: string[] = [
		'WebGL / Canvas',
		'Coding with Natural Language',
		'Scroll, parallax og shapes',
		'Animations and Interaction',
		'React, Svelte, Three.js'
	];

	// én “kategori” med mange items
	const items = manifests.flatMap((g) => g.items);

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
			const slider = document.getElementById('frontendStripe');
			if (slider && slider.firstElementChild) {
				slider.appendChild(slider.firstElementChild);
				rotations++;
				if (rotations % items.length === 0) {
					dispatch('cycleComplete'); // én full runde
				}
			}
			pos -= stripeWidth;
		}

		const slider = document.getElementById('frontendStripe') as HTMLElement | null;
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
	<div id="frontendStripe" class="stripe" style="--stripe-w:{stripeWidth}px">
		{#each items as it}
			<div class="tile">
				<!-- iframes peker på /static/frontend/eyecandy/*.html -->
				<iframe
					src={it.src}
					loading="lazy"
					title={it.title || 'eyecandy'}
					allowfullscreen
					referrerpolicy="no-referrer"
				></iframe>
			</div>
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
		position: relative;
	}
	.tile iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		display: block;
		overflow: hidden; /* hindrer scrollbars inni iframe */
		scrollbar-width: none; /* Firefox */
	}
	.tile iframe::-webkit-scrollbar {
		display: none; /* Chrome/Safari/Edge */
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
