<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// item kan være bilde eller video (vi ser på filendelse i viewer)
	export type Item = { src: string; title?: string };
	export type Group = { category: string; items: Item[] };

	export let groups: Group[] = [];
	export let rows = 2;
	export let cols = 7;

	const dispatch = createEventDispatcher<{ openItem: { item: Item; group: string } }>();

	function clickItem(item: Item, group: string) {
		dispatch('openItem', { item, group });
	}
</script>

<div class="groupWrap">
	{#each groups as g}
		<section class="section">
			<div class="section-head">
				<h4>{g.category}</h4>
			</div>
			<div class="grid" style="--cols:{cols};--rows:{rows}">
				{#each Array(rows * cols) as _, i}
					{#if g.items[i % g.items.length]}
						<button
							class="cell"
							on:click={() => clickItem(g.items[i % g.items.length], g.category)}
							aria-label="Open item"
						>
							<img
								src={g.items[i % g.items.length].src}
								alt={g.items[i % g.items.length].title || ''}
							/>
						</button>
					{/if}
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.groupWrap {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.section {
		background: #fff;
		border: 1px solid #e8ecf3;
		border-radius: 16px;
		padding: 12px;
	}
	.section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	.grid {
		width: 100%;
		max-width: 1000px;
		height: 350px;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		gap: 0;
		position: relative;
	}
	.cell {
		border: 0;
		background: transparent;
		padding: 0;
		margin: 0;
		cursor: pointer;
		display: block;
		position: relative;
		overflow: hidden;
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
</style>
