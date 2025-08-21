<script lang="ts">
	import { modalOpen } from '$lib/stores/ui';
	export let mode: 'video' | 'frontend' = 'video';
	export let closeOnBackdrop = true;
	function close() {
		modalOpen.set(false);
	}
</script>

{#if $modalOpen}
	<div class="backdrop" on:click={() => closeOnBackdrop && close()} />
	<div class="wrap">
		<div class="box-3d" class:frontend-size={mode === 'frontend'}>
			<slot />
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: linear-gradient(120deg, #e3e6ec 0%, #c1c7d0 100%);
		opacity: 0.98;
		z-index: 30; /* add */
	}
	.wrap {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 48px 24px;
		z-index: 40; /* add */
	}
	.box-3d {
		width: 1000px;
		height: 350px;
		border-radius: 2.2em;
		background: linear-gradient(120deg, #e3e6ec 0%, #c1c7d0 100%);
		box-shadow:
			0 2px 30px 3px #a8b0ba2b,
			inset 0 2.5px 16px 2px #b7b7b933;
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			width 0.48s cubic-bezier(0.83, -0.01, 0.2, 1),
			height 0.48s cubic-bezier(0.83, -0.01, 0.2, 1);
	}
	.box-3d.frontend-size {
		width: 810px;
		height: 530px;
	}
</style>
