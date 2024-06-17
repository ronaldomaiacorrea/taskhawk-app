import { z } from 'zod';

const taskSchema = z.object({
	id: z.number().int().positive().min(1),
	title: z.string().min(1).max(100),
	description: z.string().optional(),
	creationDate: z.coerce.date(),
	dueDate: z.coerce.date(),
	priority: z.enum(['low', 'medium', 'high']),
	status: z.enum(['pending', 'in-progress', 'completed', 'blocked']),
	assignedTo: z.string(),
});

type Task = z.infer<typeof taskSchema>;

const createTaskSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().optional(),
	creationDate: z.coerce.date(),
	dueDate: z.coerce.date(),
	priority: z.enum(['low', 'medium', 'high']),
	status: z.enum(['pending', 'in-progress', 'completed', 'blocked']),
	assignedTo: z.string(),
});

export default createTaskSchema;
