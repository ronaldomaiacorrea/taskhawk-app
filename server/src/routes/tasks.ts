import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import createTaskSchema from '../schemas/task';
import { mockTasks } from '../data/_mockData';
import type { Task, TaskWithCategory } from '../../../shared/types';
import { supabase } from '../app';

export const tasksRoute = new Hono();

let cachedCategories: { [key: string]: string } = {};

const loadCategories = async () => {
	if (Object.keys(cachedCategories).length === 0) {
		const { data: categories, error } = await supabase
			.from('Category')
			.select('id, name');

		if (error) {
			console.error('Error loading categories:', error.message);
			return;
		}

		categories?.forEach((category) => {
			cachedCategories[category.id] = category.name;
		});
	}
};

const mergeTasksWithCategories = async (
	task: Task
): Promise<TaskWithCategory> => {
	await loadCategories();

	const categoryName = cachedCategories[task.categoryId];

	return { ...task, categoryName };
};

// GET requests
tasksRoute.get('/', async (c) => {
	const { data: tasks, error } = await supabase.from('Task').select('*');

	if (!tasks || error) {
		return c.json({ error: error.message }, 500);
	}

	console.log(tasks);

	const tasksWithCategories = tasks.map((task) =>
		mergeTasksWithCategories(task)
	);
	return c.json(tasksWithCategories);
});

tasksRoute.get('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));
	const { data: task, error } = await supabase
		.from('Tasks')
		.select('*')
		.eq('id', id)
		.single();

	if (!task || error) {
		return c.json({ error: error?.message }, 500);
	}

	return c.json(task);
});

// POST request
tasksRoute.post('/', zValidator('json', createTaskSchema), async (c) => {
	const task = await c.req.valid('json');

	const { data, error } = await supabase.from('Task').insert([{ ...task }]);

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	return c.json(data, 201);
});

// DELETE request
tasksRoute.delete('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));

	const { data: task, error } = await supabase
		.from('Task')
		.delete()
		.eq('id', id);

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!task) {
		return c.json({ error: 'Task not found or already deleted' }, 404);
	}

	return c.json(
		{ message: 'Category deleted successfully', task: task[0] },
		200
	);
});

// TODO: put
