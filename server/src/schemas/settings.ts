import { z } from 'zod';

export const settingsSchema = z.object({
    user_id: z.string().uuid(),
    language: z.string().min(2).max(5),
    mode: z.enum(['light', 'dark'])
});

export const updateSettingsSchema = settingsSchema.partial();

export type Settings = z.infer<typeof settingsSchema>;