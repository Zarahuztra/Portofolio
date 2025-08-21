<script lang="ts">
	// Komponenter
	import VideoShowreel from '$lib/components/VideoShowreel.svelte';
	import ImageShowreel from '$lib/components/ImageShowreel.svelte';
	import FrontendShowreel from '$lib/components/FrontendShowreel.svelte';
	import TextShowreel from '$lib/components/TextShowreel.svelte';
	import MusicShowreel from '$lib/components/MusicShowreel.svelte';

	// Data
	import { videoManifests as videos } from '$lib/data/videoManifest';
	import { imageManifests as images } from '$lib/data/imageManifest';
	import { frontendEyecandy as frontend } from '$lib/data/frontendEyecandyManifest';
	import { musicClips } from '$lib/data/musicManifest';

	export let playing: boolean = true;
	let isPlaying = playing;

	type StepKind =
		| 'videoShowreel'
		| 'imageShowreel'
		| 'frontendShowreel'
		| 'textShowreel'
		| 'musicShowreel';

	let i = 0;
	const steps: { kind: StepKind }[] = [
		{ kind: 'videoShowreel' },
		{ kind: 'imageShowreel' },
		{ kind: 'frontendShowreel' },
		{ kind: 'textShowreel' },
		{ kind: 'musicShowreel' }
	];

	function onCycleComplete() {
		i = (i + 1) % steps.length;
	}

	function prev() {
		i = (i - 1 + steps.length) % steps.length;
	}

	function next() {
		i = (i + 1) % steps.length;
	}

	function togglePlay() {
		isPlaying = !isPlaying;
	}
</script>

{#if steps[i].kind === 'videoShowreel'}
	<VideoShowreel
		manifests={videos}
		stripeWidth={400}
		speedPxPerSec={48}
		playing={isPlaying}
		on:cycleComplete={onCycleComplete}
	/>
{:else if steps[i].kind === 'imageShowreel'}
	<ImageShowreel
		manifests={images}
		stripeWidth={400}
		speedPxPerSec={48}
		playing={isPlaying}
		on:cycleComplete={onCycleComplete}
	/>
{:else if steps[i].kind === 'frontendShowreel'}
	<FrontendShowreel
		manifests={frontend}
		stripeWidth={400}
		speedPxPerSec={48}
		playing={isPlaying}
		on:cycleComplete={onCycleComplete}
	/>
{:else if steps[i].kind === 'textShowreel'}
	<TextShowreel
		stripeWidth={400}
		speedPxPerSec={48}
		repeatTarget={5}
		playing={isPlaying}
		on:cycleComplete={onCycleComplete}
	/>
{:else if steps[i].kind === 'musicShowreel'}
	<MusicShowreel
		items={musicClips}
		stripeWidth={400}
		speedPxPerSec={48}
		repeatTarget={3}
		playing={isPlaying}
		on:cycleComplete={onCycleComplete}
	/>
{/if}

<!-- ÉN knapperekke nederst -->
<div class="bottom-controls">
	<button class="chip" on:click={prev}>← Previous</button>
	<button class="chip primary" on:click={togglePlay}>
		{isPlaying ? 'Pause' : 'Spill'}
	</button>
	<button class="chip" on:click={next}>Next →</button>
</div>

<style>
	.bottom-controls {
		position: fixed;
		left: 50%;
		bottom: 20px;
		transform: translateX(-50%);
		display: flex;
		gap: 0.6rem;
		align-items: center;
		background: #eef2f7cc;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		padding: 0.5rem 0.7rem;
		box-shadow:
			0 12px 28px #1a24330f,
			0 2px 8px #1a24330a,
			inset 0 1px 0 #fff;
		backdrop-filter: blur(8px);
		z-index: 1000;
	}
	.chip {
		border: 1px solid #d6deea;
		background: #fff;
		border-radius: 12px;
		padding: 0.45rem 0.9rem;
		font: inherit;
		cursor: pointer;
		transition:
			transform 0.04s ease,
			box-shadow 0.14s ease;
		box-shadow: 0 1px 0 #fff inset;
	}
	.chip:hover {
		box-shadow: 0 6px 16px #24324a1a;
	}
	.chip:active {
		transform: translateY(1px);
	}
	.chip.primary {
		background: linear-gradient(180deg, #ffffff, #f6f9ff);
		border-color: #c8d7ff;
	}
</style>
