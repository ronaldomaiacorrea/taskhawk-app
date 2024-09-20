import 'dotenv/config';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { tasksRoute } from './routes/tasks';
import { categoriesRoute } from './routes/categories';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPA_BASE_URL!;
const supabaseKey = process.env.SUPA_BASE_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

const app = new Hono();

app.use(logger());

app.route('/api/tasks', tasksRoute);
app.route('/api/categories', categoriesRoute);

export default app;
