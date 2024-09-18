import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { tasksRoute } from './routes/tasks';
import { categoriesRoute } from './routes/categories';

const app = new Hono();

app.use(logger());

app.get('/test', (c) => {
	return c.json({ message: 'test' });
});

app.route('/api/tasks', tasksRoute);
app.route('/api/categories', categoriesRoute);

export default app;
