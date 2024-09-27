import { z } from 'zod';
import { ICON } from '../../../shared/types';

const createCategorySchema = z.object({
	name: z.string().min(1).max(10),
	icon: z.nativeEnum(ICON),
	description: z.string().max(100).optional(),
});

export default createCategorySchema;
