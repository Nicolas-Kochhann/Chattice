<script>
	import Contact from "$lib/components/Contact.svelte";
	import Chat from "$lib/components/Chat.svelte";

	let chatSelected = $state(true);

	const messages = [
		{
			text: "hello",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "We are born of one breath, one spark. The Sun must become one with us. Heed your mind, heed your soul. Put you brains in a cereal bowl.",
			isSender: false
		},
		{
			text: "aaaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
		{
			text: "wassup man",
			isSender: true
		},
		{
			text: "wassup man",
			isSender: false
		},
	]
</script>

<title>Chattice</title>

<div class="w-screen h-screen grid grid-cols-[3fr_7fr]">
	<div class="flex flex-col w-full h-screen border-r min-w-0">
		<header class="h-15 flex items-center justify-between px-3 border-b">
			<h1 class="text-2xl font-bold italic">Chattice</h1>
			<button class="p-2 border rounded cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition">+ Add Contact</button>
		</header>
		<div class="flex-1 flex flex-col overflow-y-scroll gap-2 p-2">
			<Contact lastMessage="something" contactName="xerão"/>
		</div>
	</div>
	<div>
		{#if !chatSelected}
			<div class="flex items-center justify-center h-screen">
				<h3 class="text-gray-500 text-3xl italic">Welcome to Chattice</h3>
			</div>
		{:else}
			<Chat messages={messages} />
		{/if}
	</div>
</div>