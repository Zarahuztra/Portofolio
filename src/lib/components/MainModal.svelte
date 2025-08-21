<script>
	import OverlayModal from '$lib/components/OverlayModal.svelte';

	export let onClose;

	let overlayOpen = false;
	let overlayContent = null;

	function openOverlay(content) {
		overlayContent = content;
		overlayOpen = true;
	}

	function closeOverlay() {
		overlayOpen = false;
		overlayContent = null;
	}
</script>

<div class="modal-backdrop" on:click={onClose}>
	<div class="modal-content" on:click|stopPropagation>
		<h1>Hovedmodal</h1>
		<button on:click={() => openOverlay('<video src="/video.mp4" controls autoplay></video>')}>
			Åpne video i overlay
		</button>

		<!-- Her kan vi senere legge inn videoslideren -->
	</div>

	{#if overlayOpen}
		<OverlayModal on:close={closeOverlay}>
			{@html overlayContent}
		</OverlayModal>
	{/if}
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		max-width: 900px;
		width: 90%;
		min-height: 500px;
	}
</style>
