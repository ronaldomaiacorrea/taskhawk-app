import { z } from 'zod';

const taskSchema = z.object({
	id: z.number().int().positive().min(1),
	title: z.string().min(1).max(100),
	description: z.string().optional(),
	creationDate: z.coerce.date(),
	dueDate: z.coerce.date(),
	priority: z.enum(['Low', 'Medium', 'High']),
	status: z.enum(['Pending', 'In progress', 'Completed', 'Blocked']),
	assignedTo: z.string(),
});

type Task = z.infer<typeof taskSchema>;

const createTaskSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().optional(),
	creationDate: z.coerce.date(),
	dueDate: z.coerce.date(),
	priority: z.enum(['Low', 'Medium', 'High']),
	status: z.enum(['Pending', 'In progress', 'Completed', 'Blocked']),
	assignedTo: z.string(),
});

export default createTaskSchema;
