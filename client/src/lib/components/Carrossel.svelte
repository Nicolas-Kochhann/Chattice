<script lang="ts">
	import { fade } from 'svelte/transition';

	let { messages, duration }: { messages: Array<string>; duration: number } = $props();
	let counter = $state(0);
	let currentMessage = $derived(messages[counter]);

	$effect(() => {
		const intervalId = setInterval(() => {
			counter++;
			if (counter === messages.length) {
				counter = 0;
			}
		}, duration);

		return () => clearInterval(intervalId);
	});
</script>

<div class="relative flex items-center justify-center min-h-8 w-full text-center">
    {#key counter}
        <p 
            in:fade={{ delay: 750 }} 
            out:fade 
            class="absolute inset-0 flex items-center justify-center"
        >
            {currentMessage}
        </p>
    {/key}
</div>
