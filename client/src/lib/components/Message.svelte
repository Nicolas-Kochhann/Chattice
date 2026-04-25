<script>
	let { text, isSender } = $props();
</script>

{#if isSender}
	<div class="mr-10 my-1 flex flex-row-reverse">
		<div class="w-fit max-w-2/5 rounded bg-amber-200 px-3 py-2 wrap-break-word">
			<p>{text}</p>
			<div class="pt-2 text-right text-sm text-gray-600">12:34</div>
		</div>
	</div>
{:else}
	<div class="ml-10 my-1">
		<div class="w-fit max-w-2/5 rounded bg-blue-200 px-3 py-2 wrap-break-word">
			<p>{text}</p>
			<div class="pt-2 min-w-15 text-right text-sm text-gray-600">12:34</div>
		</div>
	</div>
{/if}
