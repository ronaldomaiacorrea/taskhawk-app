
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { settingsSchema, updateSettingsSchema } from '../schemas/settings';
import { SettingsService } from '../services/settingsService';

export const settingsRoute = new Hono();

settingsRoute.get('/:userId', async (c) => {
    try {
        const userId = c.req.param('userId');
        const settings = await SettingsService.getSettings(userId);
        return c.json(settings);
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
});

settingsRoute.post(
    '/',
    zValidator('json', settingsSchema),
    async (c) => {
        try {
            const settings = await c.req.valid('json');
            const newSettings = await SettingsService.createSettings(settings);
            return c.json({ message: 'Settings created successfully', settings: newSettings }, 201);
            // return c.json({ message: 'Settings created successfully', settings }, 201);
        } catch (error: any) {
            return c.json({ error: error.message }, 500);
        }
    }
);

settingsRoute.patch(
    '/:userId',
    zValidator('json', updateSettingsSchema),
    async (c) => {
        try {
            const userId = c.req.param('userId');
            const updates = await c.req.valid('json');
            const updatedSettings = await SettingsService.updateSettings(userId, updates);
            return c.json({ message: 'Settings updated successfully', settings: updatedSettings });
        } catch (error: any) {
            return c.json({ error: error.message }, 500);
        }
    }
);

settingsRoute.delete('/:userId', async (c) => {
    try {
        const userId = c.req.param('userId');
        await SettingsService.deleteSettings(userId);
        return c.json({ message: 'Settings deleted successfully' });
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
});