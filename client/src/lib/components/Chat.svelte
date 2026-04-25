<script lang="ts">
	import Message from '$lib/components/Message.svelte';

	let { messages } = $props();

	let messagesContainer: HTMLElement;

	$effect(() => {
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	})	
</script>

<div class="h-screen">
	<div class="overflow-y-scroll py-2 h-[calc(100%-56px)]" bind:this={messagesContainer}>
		{#each messages as message, i (i)}
			<Message text={message.text} isSender={message.isSender} />
		{/each}
	</div>
	<div class="sticky bottom-0 bg-white pb-2 px-5 pt-0 h-14">
		<form action="?/send" class="w-full h-full flex flex-row items-center gap-3">
			<input type="text" name="message" autocomplete="off" placeholder="type a message..." class="flex-1 h-full border rounded-full p-3">
			<button type="submit" class="bg-amber-200 aspect-square rounded-full p-1 px-2 cursor-pointer">send</button>
		</form>
	</div>
</div>
