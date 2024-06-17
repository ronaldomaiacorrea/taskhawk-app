import app from './app';

Bun.serve({
	port: 3030,
	fetch: app.fetch,
});

console.log('Server listening at 3030...');
