<script lang="ts">
	import { onMount } from 'svelte';
	import { modalOpen } from '$lib/stores/ui';
	import Box3DModal from '$lib/components/Box3DModal.svelte';
	import ShowcaseFlow from '$lib/components/ShowcaseFlow.svelte';

	let flow: ShowcaseFlow; // bind:this
	let playing = false;

	onMount(() => modalOpen.set(true));

	function handlePlayingChange(e: CustomEvent<boolean>) {
		playing = e.detail;
	}

	function openModal() {
		modalOpen.set(true);
	}
</script>

<section class="intro">
	<h1>Creative Technologist</h1>
	<p>AI Video & Image · Frontend</p>

	<div class="actions">
		<button on:click={openModal}>Video</button>
		<button on:click={openModal}>Bilder</button>
		<button on:click={openModal}>Frontend</button>
	</div>
</section>

<!-- Modalen med innholdet -->
<Box3DModal mode="video">
	<ShowcaseFlow bind:this={flow} on:playingChange={handlePlayingChange} />
</Box3DModal>

<style>
	.intro {
		padding: 24px;
		text-align: center;
	}
	.actions {
		display: flex;
		gap: 0.6rem;
		justify-content: center;
		margin-top: 0.6rem;
	}
	.actions button {
		border: 1px solid #ccd;
		background: #fff;
		border-radius: 10px;
		padding: 0.4rem 0.9rem;
		cursor: pointer;
	}

	.page-controls {
		position: fixed;
		bottom: 24px;
		left: 0;
		right: 0;
		display: flex;
		gap: 0.6rem;
		justify-content: center;
		z-index: 60; /* above modal */
		pointer-events: auto;
	}
	.btn {
		border: 1px solid #d6dbe6;
		background: #fff;
		border-radius: 12px;
		padding: 0.5rem 0.9rem;
		box-shadow: 0 2px 8px #0001;
		cursor: pointer;
	}
	.btn:hover {
		box-shadow: 0 4px 14px #0002;
	}
</style>
