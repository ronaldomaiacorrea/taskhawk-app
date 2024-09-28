import 'dotenv/config';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import createCategorySchema from '../schemas/category';
import { supabase } from '../app';

export const categoriesRoute = new Hono();

// GET requests
categoriesRoute.get('/', async (c) => {
	const { data: categories, error } = await supabase
		.from('categories')
		.select('*');

	if (!categories || error) {
		return c.json({ error: error.message }, 500);
	}

	return c.json(categories);
});

categoriesRoute.get('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));
	const { data: category, error } = await supabase
		.from('categories')
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

		const { data: newCategory, error } = await supabase
			.from('categories')
			.insert([{ ...category }])
			.select();

		if (error) {
			return c.json({ error: error.message }, 500);
		}

		return c.json(
			{ message: 'Category created successfully', category: newCategory[0] },
			200
		);
	}
);

// DELETE request
categoriesRoute.delete('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));

	const { data: category, error } = await supabase
		.from('categories')
		.delete()
		.eq('id', id)
		.select();

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
// PATCH request
categoriesRoute.patch('/:id', async (c) => {
	const id = Number.parseInt(c.req.param('id'));

	const updates = await c.req.json();

	const { data: updatedCategory, error } = await supabase
		.from('categories')
		.update(updates)
		.eq('id', id)
		.select();

	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!updatedCategory || updatedCategory.length === 0) {
		return c.json({ error: 'Category not found' }, 404);
	}

	return c.json(
		{ message: 'Category updated successfully', category: updatedCategory[0] },
		200
	);
});
