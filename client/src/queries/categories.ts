import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CATEGORIES_API_URL, TASK_APP_QUERY_KEYS } from './constants';
import { Category } from '../../../shared/types';

const fetchCategories = async (url: string) => {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch categories: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
};

const fetchCategory = async (url: string, categoryId: number | null) => {
	try {
		const response = await fetch(`${url}/${categoryId}`);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch category: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
};

const deleteCategory = async (url: string, category: Category) => {
	try {
		const response = await fetch(`${url}/${category.id}`, {
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

const updateCategory = async (url: string, category: Category) => {
	try {
		const response = await fetch(`${url}/${category.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(category),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to update categories: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
};

const createCategory = async (url: string, category: Omit<Category, 'id'>) => {
	try {
		const response = await fetch(`${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(category),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to update categories: ${response.status} ${response.statusText}`
			);
		}

		return response.json();
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
};

export const useCategories = () =>
	useQuery<Category[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
		queryFn: () => fetchCategories(CATEGORIES_API_URL),
	});

export const useCategory = (categoryId: number | null) =>
	useQuery<Category, Error>({
		queryKey: [TASK_APP_QUERY_KEYS.CATEGORY, categoryId],
		queryFn: () => fetchCategory(CATEGORIES_API_URL, categoryId),
		enabled: !!categoryId,
	});

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, Category>({
		mutationFn: (category: Category) =>
			deleteCategory(CATEGORIES_API_URL, category),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
			});
		},
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, Category>({
		mutationFn: (category: Category) =>
			updateCategory(CATEGORIES_API_URL, category),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
			});
		},
	});
};

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<Category, Error, Omit<Category, 'id'>>({
		mutationFn: (category: Omit<Category, 'id'>) =>
			createCategory(CATEGORIES_API_URL, category),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
			});
		},
	});
};
