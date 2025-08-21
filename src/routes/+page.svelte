<script lang="ts">
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<!-- bruk base + relativ bane -->
	<link rel="icon" href={base + favicon} />
</svelte:head>

{@render children?.()}
