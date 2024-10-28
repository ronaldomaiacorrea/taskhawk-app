const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const TASKS_API_URL = `${BASE_URL}/tasks`;
export const CATEGORIES_API_URL = `${BASE_URL}/categories`;
