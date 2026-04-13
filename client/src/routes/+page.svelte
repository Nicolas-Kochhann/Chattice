<script lang="ts">
	import profilePicture from "$lib/assets/images/pfp.jpg"

	let chatSelected = $state(false);
</script>

<div class="h-screen w-full px-15">
	<div class="grid h-full grid-cols-[1fr_2fr]">
		<div class="contact-list flex flex-col border-x">
			<div class="flex justify-between items-center p-3 border-b">
				<h2 class="text-xl font-bold italic">Chattice</h2>
				<button class="border rounded p-2 cursor-pointer hover:bg-gray-100 transition">+ Add Contact</button>
			</div>
			<div class="contacts-container overflow-y-scroll flex-1 p-3 gap-3">
				<div class="contact flex w-full rounded hover:bg-gray-200">
					<img class="p-3 mr-2 aspect-square w-1/6 rounded-full" src={profilePicture} alt="_" />
					<div class="flex-1 flex flex-col justify-center gap-1">
						<p class="text-xl">Contact Name</p>
						<p class="text-gray-600">Last sent message</p>
					</div>
				</div>
			</div>
		</div>
		{#if !chatSelected}
			<div class="w-full h-full flex text-center items-center justify-center text-gray-600 text-3xl italic border-r">
				<p>Welcome to Chattice!</p>
			</div>
		{:else}
			<div class="chat-container bg-indigo-100">

			</div>
		{/if}
	</div>
</div>
