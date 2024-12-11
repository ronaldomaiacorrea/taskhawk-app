const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AUTH_API_URL = `${BASE_URL}/api/auth`;
export const TASKS_API_URL = `${BASE_URL}/api/tasks`;
export const CATEGORIES_API_URL = `${BASE_URL}/api/categories`;
