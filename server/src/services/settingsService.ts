
import { supabase } from '../app';
import type { Settings } from '../schemas/settings';

export class SettingsService {
    static async getSettings(userId: string) {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return data;
    }

    static async createSettings(settings: Settings) {
        const { data, error } = await supabase
            .from('settings')
            .insert([settings])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async updateSettings(userId: string, settings: Partial<Settings>) {
        const { data, error } = await supabase
            .from('settings')
            .update(settings)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    static async deleteSettings(userId: string) {
        const { data, error } = await supabase
            .from('settings')
            .delete()
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}