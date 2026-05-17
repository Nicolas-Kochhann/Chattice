<script>
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Log in | Chattice</title>
</svelte:head>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="lg:w-1/2 grid grid-cols-2 rounded border">
		<div class="bg-amber-100 px-3 py-5 flex flex-col justify-between">
			<h2 class="text-center text-2xl font-bold">Welcome</h2>
            <p class="text-justify mx-3 my-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum quisquam nisi unde eos ullam ut doloribus eum in mollitia at vero itaque commodi ad esse excepturi, illum, nobis architecto blanditiis?</p>
            <p class="text-center"><strong>Chattice™</strong></p>
		</div>
		<form action="?/login" method="POST" class="px-3 py-5 shadow" use:enhance>
			<h2 class="text-center text-2xl font-bold mb-4">Log in</h2>
			<div class="flex flex-col m-2">
				<label class="text-gray-900 text-lg" for="email">E-mail</label>
				<input class="border rounded p-2" type="email" name="email" id="email" />
			</div>
			<div class="flex flex-col m-2">
				<label class="text-gray-900 text-lg" for="password">Password</label>
				<input class="border rounded p-2" type="password" name="password" id="password" />
			</div>
			<div class="mt-4 mx-2 flex flex-col">
				<button class="bg-amber-200 p-2 rounded hover:bg-amber-300 transition cursor-pointer" type="submit">Log In</button>
				<p class="text-center mt-3">Don't have an account yet? <a class="text-blue-500 underline cursor-pointer hover:text-blue-600" href={resolve('/account/signup')}>Sign Up</a></p>
			</div>
		</form>
	</div>
</div>
