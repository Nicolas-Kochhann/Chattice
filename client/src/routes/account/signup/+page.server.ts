import { PUBLIC_SERVER_URL } from '$env/static/public';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	signup: async ({ request }) => {
		// Simulate delay
		const delay = new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});
		await delay;

		const data = await request.formData();

		if (!data.get('email') || !data.get('password') || !data.get('username')) {
			return fail(422, {
				error: 'One or more of the fields were missing'
			});
		}

		const response = await fetch(`${PUBLIC_SERVER_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.get('username'),
				email: data.get('email'),
				password: data.get('password')
			})
		});

		if (response.ok) {
			throw redirect(303, '/account/login?message=Account created');
		} else {
			const responseData = await response.json();
			console.log(responseData);
			switch (responseData.code) {
				case 'FST_ERR_VALIDATION':
					if (responseData.message.startsWith('body/name')) {
						return fail(422, { error: 'The username you typed is too short' });
					} else if (responseData.message.startsWith('body/password')) {
						return fail(422, { error: 'The password you typed is too weak' });
					} else {
						return fail(400, { error: 'Something went wrong'})
					}

				case 'EMAIL_ALREADY_EXISTS':
					return fail(422, { error: 'This e-mail address has already been registered' });

				default:
					return fail(400, { error: 'Something went wrong' });
			}
		}
	}
};
