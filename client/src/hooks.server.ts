import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/conversations')) {
		if (!event.cookies.get('session') || !event.cookies.get('refresh')) {
			throw redirect(307, '/account/login');
		}
	}

	return await resolve(event);
};
