import { Status } from '@shared/types';

export const backgroundColors: Record<Status, string> = {
	'To do': '#6B7280', // Tailwind gray-500
	Completed: '#4CAF50', // Tailwind green-500 (use Tailwind’s closest match: #4CAF50 is close to green-500)
	Blocked: '#F97316', // Tailwind orange-500
	Overdue: '#EF4444', // Tailwind red-500
	'In progress': '#3B82F6', // Tailwind blue-500
};
