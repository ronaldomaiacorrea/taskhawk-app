import 'dotenv/config';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import userSchema from '../schemas/user';
import { UserService } from '../services/userService';

export const authRoute = new Hono();

// Sign up route
authRoute.post(
	'/signup',
	zValidator('json', userSchema),
	async (c) => {
		try {
			const { email, password, displayName } = await c.req.valid('json');
			const { user } = await UserService.signUp(email, password, displayName);
			return c.json({ message: 'User signed up successfully', user }, 200);
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	}
);

// Sign in route
authRoute.post(
	'/signin',
	zValidator('json', userSchema),
	async (c) => {
		try {
			const { email, password } = await c.req.valid('json');
			const data = await UserService.signIn(email, password);
			return c.json({ message: 'User signed in successfully', data }, 200);
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	}
);

// Sign out route
authRoute.post('/signout', async (c) => {
	try {
		await UserService.signOut();
		return c.json({ message: 'User signed out successfully' }, 200);
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

// Forgot password route
const forgotPasswordSchema = userSchema.pick({ email: true });

authRoute.post(
	'/forgot-password',
	zValidator('json', forgotPasswordSchema),
	async (c) => {
		try {
			const { email } = await c.req.valid('json');
			await UserService.resetPasswordForEmail(email);
			return c.json({ message: 'Password reset email sent' }, 200);
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
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
		try {
			const { newPassword } = await c.req.valid('json');
			await UserService.updatePassword(newPassword);
			return c.json({ message: 'Password changed successfully' }, 200);
		} catch (error: any) {
			return c.json({ error: error.message }, 500);
		}
	}
);

// Delete auth user
authRoute.delete('/delete/:id', async (c) => {
	try {
		const id = c.req.param('id');
		if (!id) {
			return c.json({ error: 'User ID is required' }, 400);
		}
		await UserService.deleteUser(id);
		return c.json({ message: 'User deleted successfully' }, 200);
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});

// Get user profile
authRoute.get('/profile', async (c) => {
	try {
		const data = await UserService.getUserProfile();
		if (!data) {
			return c.json({ error: 'User not found' }, 404);
		}
		return c.json({ data }, 200);
	} catch (error: any) {
		return c.json({ error: error.message }, 500);
	}
});
