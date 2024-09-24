import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CATEGORIES_API_URL, TASK_APP_QUERY_KEYS } from './constants';
import { Category } from '../../../shared/types';

const fetchCategories = async (url: string) => {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				'Failed to fetch categories: ${response.status} ${response.statusText}'
			);
		}

		return response.json();
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
};

const deleteCategory = async (category: Category) => {
	try {
		const response = await fetch(`${CATEGORIES_API_URL}/${category.id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			const errorMessage = `Failed to delete category with id ${category.id}: ${response.status} ${response.statusText}`;
			throw new Error(errorMessage);
		}

		return category;
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
};

export const useCategories = () =>
	useQuery<Category[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
		queryFn: () => fetchCategories(CATEGORIES_API_URL),
	});

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, Category>({
		mutationFn: (category: Category) => deleteCategory(category),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
			});
		},
	});
};
