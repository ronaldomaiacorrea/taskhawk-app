import { z } from 'zod';
import { ICON } from '../../../shared/types';

const createCategorySchema = z.object({
	name: z.string().min(1).max(50),
	icon: z.nativeEnum(ICON),
	description: z.string().max(500).optional(),
});

export default createCategorySchema;
