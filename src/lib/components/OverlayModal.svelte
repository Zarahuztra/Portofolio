<script>
	export let onClose;
</script>

<div class="overlay-backdrop" on:click={onClose}>
	<div class="overlay-content" on:click|stopPropagation>
		<slot></slot>
	</div>
</div>

<style>
	.overlay-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.85);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999; /* over hovedmodalen */
	}

	.overlay-content {
		background: white;
		padding: 1rem;
		border-radius: 10px;
		max-width: 95%;
		max-height: 90%;
		overflow: auto;
	}
</style>
