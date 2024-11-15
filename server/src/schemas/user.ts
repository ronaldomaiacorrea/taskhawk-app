import { z } from 'zod';

const userSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	displayName: z.string().min(2).max(50).optional(),
});

export default userSchema;
