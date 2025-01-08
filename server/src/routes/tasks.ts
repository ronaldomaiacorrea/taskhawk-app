import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import taskSchema from '../schemas/task';
import { supabase } from '../app';

export const tasksRoute = new Hono();

// GET requests
tasksRoute.get('/', async (c) => {
	const { data: tasks, error } = await supabase.from('tasks').select('*');

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	return c.json(tasks);

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

	return c.json(task);
});

// POST request
tasksRoute.post('/', zValidator('json', taskSchema), async (c) => {
	const task = await c.req.valid('json');

	const { data: newTask, error } = await supabase.from('tasks').insert([task]).select();

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!newTask || newTask.length === 0) {
		return c.json({ error: 'Failed to create task' }, 500);
	}

	return c.json(newTask[0])
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

// PATCH request
tasksRoute.patch(
	'/:id',
	zValidator('json', taskSchema),
	async (c) => {
		const id = c.req.param('id');

		const updates = await c.req.json();

		const { data: updatedTask, error } = await supabase
			.from('tasks')
			.update(updates)
			.eq('id', id)
			.select();

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		if (!updatedTask || updatedTask.length === 0) {
			return c.json({ error: 'Task not found' }, 404);
		}

		return c.json(
			{
				message: 'Task updated successfully',
				category: updatedTask[0],
			},
			200
		);
	}
);
