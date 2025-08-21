<script lang="ts">
	import { modalOpen } from '$lib/stores/ui';
	export let content: any = null; // komponent
	export let contentProps: any = {}; // props til komponenten
</script>

{#if $modalOpen}
	<div class="backdrop" on:click={() => modalOpen.set(false)} />
	<div class="modal" role="dialog" aria-modal="true">
		{#if content}
			<svelte:component this={content} {...contentProps} />
		{:else}
			<slot />
		{/if}
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: saturate(1.1) blur(2px);
	}
	.modal {
		position: fixed;
		inset: auto 5% 5% 5%;
		background: #fff;
		border-radius: 16px;
		box-shadow: 0 20px 80px #0003;
		max-width: 1100px;
		margin: auto;
		left: 50%;
		transform: translateX(-50%);
		padding: 16px;
		overflow: auto;
		max-height: 85vh;
	}
</style>
