import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { mockCategories } from '../data/_mockData';
import createCategorySchema from '../schemas/category';

export const categoriesRoute = new Hono();

// GET requests
categoriesRoute.get('/', (c) => c.json(mockCategories));

categoriesRoute.get('/:id', (c) => {
	const id = Number.parseInt(c.req.param('id'));
	const category = mockCategories.find((category) => category.id === id);

	if (!category) {
		// Built-in function that returns when it is not found
		return c.notFound();
	}

	return c.json(category);
});

// POST request
categoriesRoute.post(
	'/',
	zValidator('json', createCategorySchema),
	async (c) => {
		// get the data that was posted to this endpoint
		// const data = await c.req.json();

		// Adding valid here provide the type already in the data because of zValidator
		const category = await c.req.valid('json');

		// spread task into mockTasks and add an id with the new length
		mockCategories.push({ ...category, id: mockCategories.length + 1 });

		// validate it against the schema create in Zod
		// const task = taskSchema.parse(data);

		return c.json(category);
	}
);

// DELETE request
categoriesRoute.delete('/:id', (c) => {
	const id = Number.parseInt(c.req.param('id'));

	// find the index in the categories array of the category with the id
	const index = mockCategories.findIndex((category) => category.id === id);

	// findIndex returns -1 if the element is not found
	if (index === -1) {
		return c.notFound();
	}

	// splice creates a new array with the deleted element
	const deletedCategory = mockCategories.splice(index, 1);

	mockCategories.map((category) => category.id === mockCategories.length - 1);

	// Update the IDs of the remaining categories after deletion
	mockCategories.map((category, index) => {
		category.id === index + 1;
	});

	// It returns the deleted task in the only position of the array
	return c.json(deletedCategory[0]);
});
// TODO: put
