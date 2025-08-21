<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { MusicItem } from '$lib/data/musicManifest';

	// Props
	export let items: MusicItem[] = [];
	export let playing = true;
	export let stripeWidth = 400; // px per “kort” i stripen
	export let speedPxPerSec = 48; // scroll-hastighet
	export let repeatTarget = 3; // hvor mange fulle runder før vi signaliserer “ferdig”

	// “Flytende” nisje-ord + gitar-bakgrunn
	const genres = [
		'prog metal',
		'prog rock',
		'minimalist drum and bass',
		'atmospheric drum and bass',
		'heavy psych',
		'halftime',
		'neurofunk',
		'neurohop',
		'atmospheric black metal',
		'atmospheric death metal',
		'avant-garde jazz',
		'post-minimalism',
		'colour bass',
		'ambient dub',
		'downtempo',
		'glitch hop',
		'experimental hip hop',
		'industrial',
		'IDM',
		'EDM',
		'EBM',
		'electronica',
		'ambient',
		'djent',
		'deep house',
		'world music',
		'flamenco',
		'tango',
		'jazz fusion'
	];
	const guitarBg = [
		'played guitar for 40 years',
		'technical guitarist',
		'all-round guitarist',
		'classical guitar',
		'AI Music Production'
	];
	const wordPool = [...genres, ...guitarBg];

	const dispatch = createEventDispatcher<{ cycleComplete: void }>();

	/* ---------- stripe-scroll ---------- */
	let pos = 0,
		last = 0,
		raf = 0;
	let rotations = 0,
		loops = 0;

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
			const slider = document.getElementById('musicStripe');
			if (slider && slider.firstElementChild) {
				slider.appendChild(slider.firstElementChild);
				rotations++;
				if (rotations % items.length === 0) {
					loops++;
					if (loops >= repeatTarget) {
						stopStripe();
						stopTags();
						dispatch('cycleComplete');
					}
				}
			}
			pos -= stripeWidth;
		}

		const el = document.getElementById('musicStripe') as HTMLElement | null;
		if (el) el.style.transform = `translateX(${-pos}px)`;
		raf = requestAnimationFrame(tickFrame);
	}

	function startStripe() {
		stopStripe();
		raf = requestAnimationFrame(tickFrame);
	}
	function stopStripe() {
		if (raf) cancelAnimationFrame(raf);
		raf = 0;
	}

	/* ---------- flytende tags m/ kollisjonsunngåelse + anti-duplikat ---------- */
	type Tag = {
		id: number;
		text: string;
		topPct: number;
		leftPct: number;
		w: number;
		h: number;
		lifeMs: number;
	};

	export let maxTags = 5;
	export let spawnEveryMs = 900;
	export let minLifeMs = 2000;
	export let maxLifeMs = 4000;

	let tagId = 1;
	let tags: Tag[] = [];
	let lastWord: string | null = null;
	let spawnTimer: number | null = null;

	let containerEl: HTMLDivElement | null = null;
	let cw = 0,
		ch = 0;
	function updateDims() {
		const r = containerEl?.getBoundingClientRect();
		cw = r?.width ?? 0;
		ch = r?.height ?? 0;
	}

	// grov størrelsesestimering for chips
	const FONT_PX = 22.4,
		CHAR_W = 0.62 * FONT_PX,
		PAD_X = 0.8 * 16 * 2,
		PAD_Y = 0.25 * 16 + 0.32 * 16,
		LINE_H = 1.15 * FONT_PX;

	function estimateSizePx(text: string) {
		const w = Math.max(60, Math.round(PAD_X + CHAR_W * text.length));
		const h = Math.round(LINE_H + PAD_Y);
		return { w, h };
	}

	function overlaps(a: Tag, b: Tag) {
		const ax = (a.leftPct / 100) * cw,
			ay = (a.topPct / 100) * ch;
		const bx = (b.leftPct / 100) * cw,
			by = (b.topPct / 100) * ch;
		return Math.abs(ax - bx) < (a.w + b.w) / 2 + 6 && Math.abs(ay - by) < (a.h + b.h) / 2 + 6;
	}

	function tryPlaceTag(text: string, attempts = 24): Tag | null {
		if (!cw || !ch) updateDims();
		const { w, h } = estimateSizePx(text);
		for (let i = 0; i < attempts; i++) {
			const leftPct = 10 + Math.random() * 80;
			const topPct = 10 + Math.random() * 80;
			const t: Tag = { id: tagId, text, topPct, leftPct, w, h, lifeMs: 0 };
			if (!tags.some((ex) => overlaps(t, ex))) return t;
		}
		return null;
	}

	function spawnTag() {
		if (!playing || tags.length >= maxTags) return;

		// Velg et ord som ikke er synlig og ikke er lik forrige ord
		let text = '';
		let attempts = 20;
		do {
			text = wordPool[Math.floor(Math.random() * wordPool.length)];
			attempts--;
			if (attempts <= 0) break;
		} while (text === lastWord || tags.some((t) => t.text === text));
		lastWord = text;

		const placed = tryPlaceTag(text);
		if (!placed) return;

		placed.id = tagId++;
		placed.lifeMs = Math.random() * (maxLifeMs - minLifeMs) + minLifeMs;

		tags = [...tags, placed];
		window.setTimeout(() => {
			tags = tags.filter((x) => x.id !== placed.id);
		}, placed.lifeMs);
	}

	function startTags() {
		stopTags();
		updateDims();
		for (let i = 0; i < Math.min(3, maxTags); i++) spawnTag();
		spawnTimer = window.setInterval(spawnTag, spawnEveryMs);
		window.addEventListener('resize', updateDims);
	}
	function stopTags() {
		if (spawnTimer) {
			clearInterval(spawnTimer);
			spawnTimer = null;
		}
		tags = [];
		window.removeEventListener('resize', updateDims);
	}

	$: if (playing) {
		startStripe();
		startTags();
	} else {
		stopStripe();
		stopTags();
	}

	onMount(() => {
		updateDims();
		if (playing) {
			startStripe();
			startTags();
		}
	});
	onDestroy(() => {
		stopStripe();
		stopTags();
	});
</script>

<div class="showreel" bind:this={containerEl}>
	<!-- Stripe med musikk-videoer -->
	<div id="musicStripe" class="stripe" style="--stripe-w:{stripeWidth}px">
		{#each items as it}
			<div class="tile">
				<video src={it.src} autoplay muted loop playsinline preload="metadata"></video>
			</div>
		{/each}
	</div>

	<!-- Flytende sjangre/kompetanse -->
	<div class="tags-layer">
		{#each tags as t (t.id)}
			<span
				class="tag"
				style="top:{t.topPct}%; left:{t.leftPct}%;"
				in:fly={{ y: 18, duration: 220, opacity: 0 }}
				out:fly={{ y: -18, duration: 220, opacity: 0 }}
			>
				{t.text}
			</span>
		{/each}
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
		position: relative;
		overflow: hidden;
		background: #000;
		border: none;
		border-radius: 0;
		box-shadow: none;
	}
	.tile video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		background: #000;
	}

	.tags-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	.tag {
		position: absolute;
		transform: translate(-50%, -50%);
		font-family: 'Bangers', system-ui, sans-serif;
		font-weight: 800;
		letter-spacing: 0.01em;
		font-size: 1.25rem;
		color: #0f172a;
		background: linear-gradient(120deg, #ffffffd9, #eaf2ffcc 70%);
		border-radius: 0.9rem;
		padding: 0.25rem 0.8rem 0.32rem;
		box-shadow:
			0 6px 24px #1b2a4226,
			0 1px 0 #ffffffcc inset;
		backdrop-filter: blur(6px);
		white-space: nowrap;
	}
</style>
