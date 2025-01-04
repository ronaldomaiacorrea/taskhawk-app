import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import createTaskSchema from '../schemas/task';
import type { Task, TaskWithCategory } from '../../../shared/types';
import { supabase } from '../app';

export const tasksRoute = new Hono();

let categoriesCache: Record<number, string> | null = null;

const loadCategories = async () => {
	if (!categoriesCache) {
		const { data: categories, error } = await supabase
			.from('categories')
			.select('id, name');

		if (error) {
			console.error('Error loading categories:', error.message);
			return;
		}

		categoriesCache = categories.reduce((acc, category) => {
			acc[category.id] = category.name;
			return acc;
		}, {} as Record<number, string>);
	}
	return categoriesCache;
};

const mergeTasksWithCategories = async (
	task: Task
): Promise<TaskWithCategory> => {
	const categories = await loadCategories();

	if (!categories) {
		throw new Error('Failed to load categories');
	}

	const categoryName = task.category_id ? categories[task.category_id]: undefined;

	return { ...task, categoryName };
};

// GET requests
tasksRoute.get('/', async (c) => {
	const { data: tasks, error } = await supabase.from('tasks').select('*');

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!tasks) {
		return c.json({ error: 'No tasks found' }, 404);
	}

	try {
		const tasksWithCategories = await Promise.all(
			tasks.map((task) => mergeTasksWithCategories(task))
		);
		return c.json(tasksWithCategories);
	} catch (err) {
		return c.json({ error: 'Error processing tasks' }, 500);
	}
});

tasksRoute.get('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));
	const { data: task, error } = await supabase
		.from('tasks')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!task) {
		return c.json({ error: 'Task not found' }, 404);
	}

	try {
		const taskWithCategory = await mergeTasksWithCategories(task);
		return c.json(taskWithCategory);
	} catch (err) {
		return c.json({ error: 'Error processing task' }, 500);
	}
});

// POST request
tasksRoute.post('/', zValidator('json', createTaskSchema), async (c) => {
	const task = await c.req.valid('json');

	const { data, error } = await supabase.from('tasks').insert([task]).select();

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!data || data.length === 0) {
		return c.json({ error: 'Failed to create task' }, 500);
	}

	try {
		const taskWithCategory = await mergeTasksWithCategories(data[0]);
		return c.json(taskWithCategory, 201);
	} catch (err) {
		return c.json({ error: 'Error processing created task' }, 500);
	}
});

// DELETE request
tasksRoute.delete('/batch-delete', async (c) => {
	const { ids } = await c.req.json(); 

	if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return c.json({ error: 'Invalid or missing IDs' }, 400);
    }

	const { data: deletedTasks, error } = await supabase
        .from('tasks')
        .delete()
        .in('id', ids)
        .select();

    if (error) {
        return c.json({ error: error.message }, 500);
    }

	if (!deletedTasks || deletedTasks.length === 0) {
        return c.json({ error: 'Tasks not found or already deleted' }, 404);
    }

    return c.json({ message: 'Tasks deleted successfully', tasks: deletedTasks }, 200);
});
// TODO: put
