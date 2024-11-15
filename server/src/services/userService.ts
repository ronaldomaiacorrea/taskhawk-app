import { supabase } from '../app';
import { SettingsService } from './settingsService';

export class UserService {
    static async signUp(email: string, password: string, displayName?: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    displayName: displayName || email.split('@')[0]
                }
            }
        });
        if (error) throw error;

        // Create default settings for new user
        if (data.user) {
            try {
                await SettingsService.createSettings({
                    user_id: data.user.id,
                    language: 'en',
                    mode: 'light'
                });
            } catch (settingsError: any) {
                // If settings creation fails, delete the created user
                await this.deleteUser(data.user.id);
                throw new Error(`Failed to create user settings: ${settingsError.message}`);
            }
        }

        return data;
    }

    static async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    }

    static async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    static async resetPasswordForEmail(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
    }

    static async updatePassword(newPassword: string) {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    }

    static async deleteUser(id: string) {
        try {
            // Delete user settings first
            await SettingsService.deleteSettings(id);

            // Then delete the user
            const { error } = await supabase.auth.admin.deleteUser(id, true);
            if (error) throw error;
        } catch (error) {
            throw error;
        }
    }

    static async getUserProfile() {
        const { data, error } = await supabase.auth.getUserIdentities();
        if (error) throw error;
        return data;
    }
}