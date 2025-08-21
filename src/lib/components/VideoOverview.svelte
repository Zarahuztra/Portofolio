<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export type Vid = { src: string; poster?: string; muted?: boolean; loop?: boolean };

	// input
	export let videos: Vid[] = []; // flate eller manuelt utvalg
	export let texts: string[] = []; // overlagt roterende tekstlinjer
	export let stripeWidth = 400; // bredde per celle (match test)
	export let height = 350; // høyde på boksen
	export let pxPerSec = 48; // scrollhastighet
	export let roundedBox = true; // beholde “box-3d”-feelen?

	let sliderEl: HTMLDivElement;
	let pos = 0,
		last = 0,
		raf = 0;
	let hIdx = 0;
	let hEl: HTMLHeadingElement;

	function loop(ts: number) {
		if (!last) last = ts;
		const dt = (ts - last) / 1000;
		last = ts;
		pos += pxPerSec * dt;

		if (pos >= stripeWidth) {
			const first = sliderEl.children[0] as HTMLElement | undefined;
			if (first) sliderEl.appendChild(first);
			pos -= stripeWidth;
		}
		sliderEl.style.transform = `translateX(${-pos}px)`;
		raf = requestAnimationFrame(loop);
	}

	function cycleHeadline() {
		if (!hEl || texts.length === 0) return;
		hEl.textContent = texts[hIdx % texts.length] ?? '';
		// restart anim
		hEl.style.animation = 'none'; // reset
		// @ts-ignore
		void hEl.offsetWidth;
		hEl.style.animation = 'slideInOut 6s cubic-bezier(.65,1.4,.33,1.05) forwards';
		hIdx = (hIdx + 1) % texts.length;
		setTimeout(cycleHeadline, 6000);
	}

	onMount(() => {
		raf = requestAnimationFrame(loop);
		cycleHeadline();
	});
	onDestroy(() => cancelAnimationFrame(raf));
</script>

<div class="wrap" class:rounded={roundedBox} style="height:{height}px">
	<div class="slider" bind:this={sliderEl} style="height:{height}px">
		{#each videos as v}
			<div class="cell" style="width:{stripeWidth}px;height:{height}px">
				<video src={v.src} autoplay loop muted playsinline poster={v.poster} />
			</div>
		{/each}
	</div>

	{#if texts.length}
		<div class="headline">
			<h3 class="h3" bind:this={hEl}></h3>
		</div>
	{/if}
</div>

<style>
	.wrap {
		position: relative;
		width: 1000px; /* som testfila */
		margin: 0 auto;
		background: linear-gradient(120deg, #e3e6ec 0%, #c1c7d0 100%);
		box-shadow:
			0 2px 30px 3px #a8b0ba2b,
			inset 0 2.5px 16px 2px #b7b7b933;
		overflow: hidden;
	}
	.wrap.rounded {
		border-radius: 2.2em;
	}
	.slider {
		display: flex;
		align-items: center;
		gap: 0;
		will-change: transform;
	}
	.cell {
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
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

	.headline {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
	.h3 {
		font-weight: 800;
		font-size: 2.2rem;
		letter-spacing: 0.01em;
		color: #1a2433;
		background: linear-gradient(90deg, #fff8, #eef5fc 60%, #bcd8ffcc);
		border-radius: 0.6em;
		box-shadow: 0 2px 18px 1px #c1d6eb49;
		padding: 0.2em 1.4em 0.26em 1.3em;
		opacity: 0;
		transform: translateX(-110%) scale(0.8);
		text-align: center;
		min-width: 12em;
	}
	@keyframes slideInOut {
		0% {
			opacity: 0;
			transform: translateX(-110%) scale(0.8) rotate(-7deg);
		}
		12% {
			opacity: 1;
			transform: translateX(0%) scale(1.05) rotate(0.9deg);
		}
		18% {
			opacity: 1;
			transform: translateX(0%) scale(1) rotate(0deg);
		}
		79% {
			opacity: 1;
			transform: translateX(0%) scale(1) rotate(0deg);
		}
		100% {
			opacity: 0;
			transform: translateX(100%) scale(1) rotate(0deg);
		}
	}
</style>
