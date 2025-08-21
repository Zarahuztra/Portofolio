<script lang="ts">
	export let src = '';
	export let title = '';

	const isVideo = /\.(mp4|webm|ogg)$/i.test(src);
</script>

<div class="viewer">
	{#if isVideo}
		<video
			{src}
			controls
			autoplay
			playsinline
			style="max-width:100%;max-height:80vh;border-radius:16px;"
		></video>
	{:else}
		<img {src} alt={title} style="max-width:100%;max-height:80vh;border-radius:16px;" />
	{/if}
</div>

<style>
	.viewer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
	}
</style>
