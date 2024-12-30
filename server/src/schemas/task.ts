import { z } from 'zod';
import { Status } from '../../../shared/types';

const createTaskSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().optional(),
	creationDate: z.coerce.date(),
	dueDate: z.coerce.date(),
	priority: z.enum(['Low', 'Medium', 'High']),
	status: z.enum(Object.values(Status) as [Status, ...Status[]]),
	category_id: z.number().int().positive().min(1),
});

export default createTaskSchema;
