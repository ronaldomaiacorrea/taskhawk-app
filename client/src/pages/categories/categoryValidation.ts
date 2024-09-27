import * as yup from 'yup';

export const categoryValidationSchema = yup.object({
	name: yup
		.string()
		.required('Please provide a category name.')
		.max(10, 'Category name must not exceed 10 characters.'),
	description: yup
		.string()
		.max(100, 'Category description must not exceed 100 characters.'),
});
