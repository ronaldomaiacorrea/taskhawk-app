export async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`);
	}
	return response.json();
}
