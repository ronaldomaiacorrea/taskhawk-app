import { z } from 'zod';

const createCategorySchema = z.object({
	name: z.string().min(1).max(50),
	icon: z.string().optional(),
	description: z.string().max(500).optional(),
});

export default createCategorySchema;
