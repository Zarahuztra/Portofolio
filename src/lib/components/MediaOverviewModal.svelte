<!-- src/lib/components/MediaOverviewModal.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let kind: 'video' | 'image' | 'feature' = 'video';
	export let groups: any[] = []; // grupper med media (fra manifest)
	export let perCategory = 2; // antall som vises per gruppe
	export let onOpenCategory: () => void; // kall fra ShowcaseFlow

	const dispatch = createEventDispatcher();
	let active: any = null; // for overlayvisning

	function open(item: any) {
		active = item;
		dispatch('openCategory', item);
	}

	function close() {
		active = null;
	}
</script>

<!-- Grid-visning -->
<div class="grid">
	{#each groups as g}
		<div class="group">
			<!-- endret: bruker category i stedet for title -->
			<h4>{g.category}</h4>
			<div class="items">
				{#each g.items.slice(0, perCategory) as item}
					<div class="thumb" on:click={() => open(item)}>
						{#if kind === 'video'}
							<video src={item.src} muted autoplay loop playsinline></video>
						{:else if kind === 'image'}
							<img src={item.src} alt={item.alt || ''} />
						{:else if kind === 'feature'}
							<button class="feature-btn">{item.label}</button>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<!-- Overlay (popup inne i modalen) -->
{#if active}
	<div class="overlay">
		<div class="overlay-content">
			<button class="close" on:click={close}>✕</button>

			{#if kind === 'video'}
				<video src={active.src} controls autoplay></video>
			{:else if kind === 'image'}
				<img src={active.src} alt={active.alt || ''} />
			{:else if kind === 'feature'}
				<div class="feature-content">
					<h3>{active.label}</h3>
					<p>{active.description || 'Ingen beskrivelse ennå.'}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.grid {
		display: grid;
		gap: 1.2rem;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		padding: 1rem;
	}
	.group h4 {
		margin-bottom: 0.5rem;
	}
	.items {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}
	.thumb {
		flex: 1 1 120px;
		cursor: pointer;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 6px #0002;
	}
	.thumb video,
	.thumb img {
		width: 100%;
		height: auto;
		display: block;
	}
	.feature-btn {
		width: 100%;
		padding: 0.8rem;
		border: 1px solid #ccd;
		border-radius: 8px;
		background: #f8f8f8;
		cursor: pointer;
	}

	.overlay {
		position: fixed;
		inset: 0;
		background: #000a;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
	}
	.overlay-content {
		background: #fff;
		padding: 1rem;
		border-radius: 16px;
		max-width: 80%;
		max-height: 80%;
		overflow: auto;
		position: relative;
	}
	.overlay-content video,
	.overlay-content img {
		max-width: 100%;
		max-height: 70vh;
	}
	.close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: none;
		border: none;
		font-size: 1.4rem;
		cursor: pointer;
	}
</style>
