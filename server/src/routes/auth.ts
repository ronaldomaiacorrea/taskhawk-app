import 'dotenv/config';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { supabase } from '../app';
import { z } from 'zod';
import userSchema from '../schemas/user';

export const authRoute = new Hono();


// Sign up route
authRoute.post(
	'/signup',
	zValidator('json', userSchema),
	async (c) => {
		const { email, password } = await c.req.valid('json');

		const { data: { user }, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		return c.json({ message: 'User signed up successfully', user }, 200);
	}
);


//Sign in route
authRoute.post(
	'/signin',
	zValidator('json', userSchema),
	async (c) => {
		const { email, password } = await c.req.valid('json');

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		return c.json({ message: 'User signed in successfully', data }, 200);
	}
);


//Sign out route
authRoute.post('/signout', async (c) => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	return c.json({ message: 'User signed out successfully' }, 200);
});


// Forgot password route
const forgotPasswordSchema = userSchema.pick({
	email: true,
});

authRoute.post(
	'/forgot-password',
	zValidator('json', forgotPasswordSchema),
	async (c) => {
		const { email } = await c.req.valid('json');

		const { error } = await supabase.auth.resetPasswordForEmail(email);

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		return c.json({ message: 'Password reset email sent' }, 200);
	}
);


// Change password route
const changePasswordSchema = z.object({
	newPassword: userSchema.shape.password,
});

authRoute.post(
	'/change-password',
	zValidator('json', changePasswordSchema),
	async (c) => {
		const { newPassword } = await c.req.valid('json');

		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		});

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		return c.json({ message: 'Password changed successfully' }, 200);
	}
);


// delete auth user
authRoute.delete('/delete/:id', async (c) => {

	const id = c.req.param('id');

	if (!id) {
		return c.json({ error: 'User ID is required' }, 400);
	}

	const { error } = await supabase.auth.admin.deleteUser(id, true);

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	return c.json({ message: 'User deleted successfully' }, 200);
});


// Get user profile
authRoute.get('/profile', async (c) => {
	const { data } = await supabase.auth.getUserIdentities();

	if (!data) {
		return c.json({ error: 'User not found' }, 404);
	}

	return c.json({ data }, 200);
});
