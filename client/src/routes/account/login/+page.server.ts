import { PUBLIC_SERVER_URL } from '$env/static/public';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		// Simulate delay
		const delay = new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});
		await delay;

		const data = await request.formData();

		if (!data.get('email') || !data.get('password')) {
			return fail(422, {
				error: 'Invalid credentials'
			});
		}

		const response = await fetch(`${PUBLIC_SERVER_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.get('email'),
				password: data.get('password')
			})
		});

		const responseData = await response.json();

		if (response.ok) {
			console.log(response);
			console.log(responseData);
			cookies.set('session', response.headers.get('x-api-token') ?? '', { path: '/' });
			cookies.set('refresh', response.headers.get('x-refresh-token') ?? '', { path: '/' });
			redirect(308, '/conversations');
		} else {
			console.log(responseData);
			switch (responseData.code) {
				case 'INVALID_CREDENTIALS':
					return fail(401, { error: 'The e-mail or password you entered is incorrect' });

				case 'FST_ERR_VALIDATION':
					return fail(401, { error: 'The e-mail or password you entered is incorrect' });

				default:
					return fail(400, { error: 'Something went wrong' });
			}
		}
	}
};
