import 'dotenv/config';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import createCategorySchema from '../schemas/category';
import { supabase } from '../app';
import { Category } from '../../../shared/types';

export const categoriesRoute = new Hono();

// GET requests
categoriesRoute.get('/', async (c) => {
	const { data: categories, error } = await supabase
		.from('Category')
		.select('*');

	if (!categories || error) {
		return c.json({ error: error.message }, 500);
	}

	return c.json(categories);
});

categoriesRoute.get('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));
	const { data: category, error } = await supabase
		.from('Category')
		.select('*')
		.eq('id', id)
		.single();

	if (!category || error) {
		return c.json({ error: error?.message }, 500);
	}

	return c.json(category);
});

// POST request
categoriesRoute.post(
	'/',
	zValidator('json', createCategorySchema),
	async (c) => {
		const category = await c.req.valid('json');

		const { data, error } = await supabase
			.from('Category')
			.insert([{ ...category }]);

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		return c.json(data, 201);
	}
);

// DELETE request
categoriesRoute.delete('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));

	const { data: category, error } = await supabase
		.from('Category')
		.delete()
		.eq('id', id);

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!category) {
		return c.json({ error: 'Category not found or already deleted' }, 404);
	}

	return c.json(
		{ message: 'Category deleted successfully', category: category[0] },
		200
	);
});
// TODO: put
