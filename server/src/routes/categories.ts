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

	if (error) {
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

	if (error || !category) {
		return c.notFound();
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
		.select('*')
		.eq('id', id)
		.single();

	// findIndex returns -1 if the element is not found
	if (error) {
		return c.json({ error: error.message }, 500);
	}

	if (!category) {
		return c.json({ error: 'Category not found' }, 404);
	}

	const { data, error: deleteError } = await supabase
		.from('Category')
		.delete()
		.eq('id', id);

	if (deleteError) {
		return c.json({ error: deleteError.message }, 500); // Handle deletion error
	}

	if (!data) {
		return c.json({ error: 'No category was deleted' }, 404);
	}

	// It returns the deleted task in the only position of the array
	return c.json(
		{ message: 'Category deleted successfully', deletedCategory: data[0] },
		200
	);
});
// TODO: put
