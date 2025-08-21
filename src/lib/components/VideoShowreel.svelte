<!-- src/lib/components/VideoShowreel.svelte -->
<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import type { VideoManifest } from '$lib/data/videoManifest';
	import { fly } from 'svelte/transition';

	// Props
	export let manifests: VideoManifest[] = [];
	export let playing = true; // styrt utenfra
	export let stripeWidth = 400; // px per stripe “kort”
	export let speedPxPerSec = 48; // scroll-fart

	// Headline-tekster
	export let headlines: string[] = [
		'Text-to-video expert using cutting-edge AI',
		'Skilled in animating images with generative tools',
		'Creative prompt designer for original video results',
		'Experienced in AI voiceover and narration workflows',
		'Advanced AI video editing and seamless clip merging',
		'Proficient at creating extended AI clips',
		'Style, mood and color grading with AI',
		'Building storyboards and concepts with AI assistance',
		'AI video for web, advertising, and social media'
	];

	const items = manifests.flatMap((g) => g.items.slice(0, 2));
	const dispatch = createEventDispatcher<{ cycleComplete: void }>();

	// stripe-scroll state
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

		// flytt én stripe bakerst når vi passerer stripeWidth
		if (pos >= stripeWidth) {
			const slider = document.getElementById('videoStripe');
			if (slider && slider.firstElementChild) {
				slider.appendChild(slider.firstElementChild);
				rotations++;
				// én full runde = flyttet like mange ganger som det er items
				if (rotations % items.length === 0) dispatch('cycleComplete');
			}
			pos -= stripeWidth;
		}

		const slider = document.getElementById('videoStripe') as HTMLElement | null;
		if (slider) slider.style.transform = `translateX(${-pos}px)`;

		raf = requestAnimationFrame(tickFrame);
	}

	// headline via intervall (bruker Svelte transitions, ikke CSS keyframes)
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
	<!-- Stripe med videoer -->
	<div id="videoStripe" class="video-slider" style="--stripe-w:{stripeWidth}px">
		{#each items as v}
			<div class="tile">
				<video src={v.src} autoplay muted loop playsinline></video>
			</div>
		{/each}
	</div>

	<!-- Overliggende headline -->
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

<!-- ← denne manglet -->

<style>
	.showreel {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.video-slider {
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
		position: relative;
		overflow: hidden;
		background: #f7f8fa;
		border-radius: 0;
		box-shadow: none;
	}
	.tile video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
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
