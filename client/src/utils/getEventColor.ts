import { Task } from '@shared/types';

/**
 * Returns a color code based on the given priority level.
 *
 * @param {string} priority - The priority level of the event.
 *                            Expected values are 'High', 'Medium', or 'Low'.
 * @returns {string} - The corresponding color code in hexadecimal format.
 *                     - 'High' returns Tailwind's "red-500" (#ef4444).
 *                     - 'Medium' returns Tailwind's "orange-500" (#f97316).
 *                     - 'Low' returns Tailwind's "green-500" (#10b981).
 *                     - Any other value returns Tailwind's "gray-400" (#9ca3af).
 */
export const getEventColor = (priority: Task['priority']) => {
	switch (priority) {
		case 'High':
			return '#ef4444'; // Tailwind's "red-500"
		case 'Medium':
			return '#f97316'; // Tailwind's "orange-500"
		case 'Low':
			return '#10b981'; // Tailwind's "green-500"
		default:
			return '#9ca3af'; // Tailwind's "gray-400" as default
	}
};
