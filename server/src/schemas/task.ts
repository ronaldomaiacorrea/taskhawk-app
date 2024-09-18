import { z } from 'zod';
import { Status } from '../routes/_mockData';

// const taskSchema = z.object({
// 	id: z.number().int().positive().min(1),
// 	title: z.string().min(1).max(100),
// 	description: z.string().optional(),
// 	creationDate: z.coerce.date(),
// 	dueDate: z.coerce.date(),
// 	priority: z.enum(['Low', 'Medium', 'High']),
// 	status: z.enum(Object.values(Status) as [Status, ...Status[]]),
// });

const createTaskSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().optional(),
	creationDate: z.coerce.date(),
	dueDate: z.coerce.date(),
	priority: z.enum(['Low', 'Medium', 'High']),
	status: z.enum(Object.values(Status) as [Status, ...Status[]]),
	categoryId: z.number().int().positive().min(1),
});

export default createTaskSchema;
