import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import createTaskSchema from '../schemas/task';

type Task = {
	id: number;
	title: string;
	description?: string;
	creationDate: Date;
	dueDate: Date;
	priority: 'Low' | 'Medium' | 'High';
	status: 'Pending' | 'In progress' | 'Completed' | 'Blocked';
	assignedTo: string;
	// TODO: add TAG type and link
	// tag: string;
};

const mockTasks: Task[] = [
	{
		id: 1,
		title: 'Task 1',
		description: 'This is task 1',
		creationDate: new Date(),
		dueDate: new Date(),
		priority: 'Low',
		status: 'Pending',
		assignedTo: 'John Doe',
	},
	{
		id: 2,
		title: 'Task 2',
		description: 'This is task 2',
		creationDate: new Date(),
		dueDate: new Date(),
		priority: 'Medium',
		status: 'In progress',
		assignedTo: 'Jane Smith',
	},
	{
		id: 3,
		title: 'Task 3',
		description: 'This is task 3',
		creationDate: new Date(),
		dueDate: new Date(),
		priority: 'High',
		status: 'Completed',
		assignedTo: 'Mike Johnson',
	},
];

export const tasksRoute = new Hono();

// GET requests
tasksRoute.get('/', (c) => c.json(mockTasks));
tasksRoute.get('/:id{[0-9]+}', (c) => {
	const id = Number.parseInt(c.req.param('id'));
	const task = mockTasks.find((task) => task.id === id);

	if (!task) {
		// Built-in function that returns when it is not found
		return c.notFound();
	}

	return c.json(task);
});

// POST request
tasksRoute.post('/', zValidator('json', createTaskSchema), async (c) => {
	// get the data that was posted to this endpoint
	// const data = await c.req.json();

	// Adding valid here provide the type already in the data because of zValidator
	const task = await c.req.valid('json');

	// spread task into mockTasks and add an id with the new length
	mockTasks.push({ ...task, id: mockTasks.length + 1 });

	// validate it against the schema create in Zod
	// const task = taskSchema.parse(data);

	return c.json(task);
});

// DELETE request
tasksRoute.delete('/:id{[0-9]+}', (c) => {
	const id = Number.parseInt(c.req.param('id'));

	// find the index in the Tasks array of the task with the id
	const index = mockTasks.findIndex((task) => task.id === id);

	// findIndex returns -1 if the element is not found
	if (index === -1) {
		return c.notFound();
	}

	// splice creates a new array with the deleted element
	const deletedTask = mockTasks.splice(index, 1);

	mockTasks.map((task) => task.id === mockTasks.length + 1);

	// Update the IDs of the remaining tasks after deletion
	mockTasks.forEach((task, index) => {
		task.id === index + 1;
	});

	// It returns the deleted task in the only position of the array
	return c.json(deletedTask[0]);
});
// TODO: put
