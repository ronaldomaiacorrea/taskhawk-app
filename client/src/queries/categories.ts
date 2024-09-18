import { useQuery } from '@tanstack/react-query';
import { CATEGORIES_API_URL, TASK_APP_QUERY_KEYS } from './constants';
import { Category } from '../utils/types';

const fetchCategories = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response failed');
	}

	return await response.json();
};

export const useCategories = () =>
	useQuery<Category[], Error>({
		queryKey: [TASK_APP_QUERY_KEYS.CATEGORIES],
		queryFn: () => fetchCategories(CATEGORIES_API_URL),
	});
