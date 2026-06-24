<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Carrossel from '$lib/components/Carrossel.svelte';
	import eyeIcon from '$lib/assets/icons/eye.svg';
	import crossedEyeIcon from '$lib/assets/icons/eye-crossed.svg';
	import type { PageProps } from './$types';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { form }: PageProps = $props();

	let showPassword = $state(false);
	let warningVisible = $state(true);
	let submitting = $state(false);
	let passwordContent = $state('');

	const messages = [
		'lebanon james',
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ipsum recusandae voluptatem provident, tempora illum, deserunt in libero aut eaque, minus perspiciatis dolorem consequatur suscipit minima maiores a consectetur ducimus!'
	];

	function toggleShowPassword() {
		showPassword = !showPassword;
	}

	function hideError() {
		warningVisible = false;
	}
</script>

<svelte:head>
	<title>Sign up | Chattice</title>
</svelte:head>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="grid grid-cols-2 rounded border shadow-md lg:w-1/2">
		<div class="flex flex-col justify-between bg-blue-100 px-3 py-5">
			<h2 class="text-center text-2xl font-bold">Welcome</h2>
			<Carrossel {messages} duration={7000} />
			<p class="text-center"><strong>Chattice™</strong></p>
		</div>
		<form
			action="?/signup"
			method="POST"
			class="flex flex-col px-3 py-5 shadow"
			use:enhance={() => {
				submitting = true;

				return async ({ update }) => {
					await update();
					submitting = false;
					warningVisible = true;
					passwordContent = '';
				};
			}}
		>
			<h2 class="mb-4 text-center text-2xl font-bold">Sign Up</h2>
			{#if form?.error && warningVisible && !submitting}
				<div
					in:slide
					out:slide={{ easing: cubicOut }}
					class="m-2 flex flex-row items-center rounded border border-amber-600 bg-yellow-50 p-2 text-amber-600"
				>
					{form.error}
					<button type="button" onclick={hideError} class="ml-auto cursor-pointer">X</button>
				</div>
			{/if}
			<div class="m-2 flex flex-col">
				<label class="text-lg text-gray-900" for="username">Username</label>
				<input class="rounded border p-2" type="text" name="username" id="username" required />
				<p class="pt-1 text-sm text-gray-600 italic">Must have at least 3 characters</p>
			</div>
			<div class="m-2 flex flex-col">
				<label class="text-lg text-gray-900" for="email">E-mail</label>
				<input
					class="rounded border p-2"
					type="email"
					name="email"
					id="email"
					placeholder="example@example.com"
					required
				/>
			</div>
			<div class="m-2 flex flex-col">
				<label class="text-lg text-gray-900" for="password">Password</label>
				<div class="relative flex">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						id="password"
						required
						class="w-full rounded border p-2"
						bind:value={passwordContent}
					/>
					<button
						type="button"
						onclick={toggleShowPassword}
						class="absolute right-0 h-full cursor-pointer p-2"
					>
						<img
							src={showPassword ? crossedEyeIcon : eyeIcon}
							alt="show"
							class="h-full"
						/>
					</button>
				</div>
				<p class="pt-1 text-sm text-gray-600 italic">Must have at least 6 characters</p>
			</div>
			<div class="mx-2 mt-4 flex flex-col">
				<button
					class="cursor-pointer rounded bg-blue-200 p-2 transition border border-transparent disabled:border-blue-300 hover:bg-blue-300 disabled:text-blue-300 disabled:bg-transparent disabled:cursor-default"
					type="submit"
					disabled={submitting}>{submitting ? "..." : "Sign up"}</button
				>
				<p class="mt-3 text-center">
					Already have an account? <a
						class="cursor-pointer text-blue-500 underline hover:text-blue-600"
						href={resolve('/account/login')}>Log In</a
					>
				</p>
			</div>
		</form>
	</div>
</div>
