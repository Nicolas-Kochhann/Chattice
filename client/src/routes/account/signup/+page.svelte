<script>
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Carrossel from '$lib/components/Carrossel.svelte';

	const messages = [
		"lebanon james",
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ipsum recusandae voluptatem provident, tempora illum, deserunt in libero aut eaque, minus perspiciatis dolorem consequatur suscipit minima maiores a consectetur ducimus!"
	]
</script>

<svelte:head>
	<title>Log in | Chattice</title>
</svelte:head>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="lg:w-1/2 grid grid-cols-2 rounded border">
		<div class="bg-blue-100 px-3 py-5 flex flex-col justify-between">
			<h2 class="text-center text-2xl font-bold">Welcome</h2>
			<Carrossel {messages} duration={7000} />
            <p class="text-center"><strong>Chattice™</strong></p>
		</div>
		<form action="?/signup" method="POST" class="px-3 py-5 shadow" use:enhance>
			<h2 class="text-center text-2xl font-bold mb-4">Sign Up</h2>
			<div class="flex flex-col m-2">
				<label class="text-gray-900 text-lg" for="username">Username</label>
				<input class="border rounded p-2" type="text" name="username" id="username" />
			</div>
			<div class="flex flex-col m-2">
				<label class="text-gray-900 text-lg" for="email">E-mail</label>
				<input class="border rounded p-2" type="email" name="email" id="email" />
			</div>
			<div class="flex flex-col m-2">
				<label class="text-gray-900 text-lg" for="password">Password</label>
				<input class="border rounded p-2" type="password" name="password" id="password" />
			</div>
			<div class="mt-4 mx-2 flex flex-col">
				<button class="bg-blue-200 p-2 rounded hover:bg-blue-300 transition cursor-pointer" type="submit">Sign Up</button>
				<p class="text-center mt-3">Already have an account? <a class="text-blue-500 underline cursor-pointer hover:text-blue-600" href={resolve('/account/login')}>Log In</a></p>
			</div>
		</form>
	</div>
</div>
