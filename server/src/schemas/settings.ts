
import { z } from 'zod';

export const settingsSchema = z.object({
    name: z.string().min(1).max(50),
    user_id: z.string().uuid(),
    language: z.string().min(2).max(5),
    mode: z.enum(['light', 'dark'])
});

export const updateSettingsSchema = settingsSchema.partial();

export type Settings = z.infer<typeof settingsSchema>;