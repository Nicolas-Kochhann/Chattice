import { PUBLIC_SERVER_URL } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/conversations')) {
		if (!event.cookies.get('session')) {
			throw redirect(308, '/account/login');
		} else {
			const response = await fetch(`${PUBLIC_SERVER_URL}/auth/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${event.cookies.get('session')}`
				}
			});

			if (response.ok) {
				return await resolve(event);
			} else {
				const refreshResponse = await fetch(`${PUBLIC_SERVER_URL}/auth/refresh`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${event.cookies.get('session')}`
					}
				});

				if (refreshResponse.ok) {
					console.log(await refreshResponse.json());
				} else {
					event.cookies.delete('session', { path: '/' });
					throw redirect(303, '/account/login?message=You have been logged out');
				}
			}
		}
	}

	return await resolve(event);
};
