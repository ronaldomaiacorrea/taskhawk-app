import { PageTitle } from '@common';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { ProfileSettings } from './components/ProfileSettings';
import { PasswordSettings } from './components/PasswordSettings';
import { AppPreferences } from './components/AppPreferences';
import { Divider } from 'primereact/divider';
import type { SettingsProfile, SettingsPassword, SettingsPreferences } from '@shared/types';

const Settings = () => {
  const toast = useRef<Toast | null>(null);

  const [isProfileDialogVisible, setIsProfileDialogVisible] = useState(false);
  const [isPasswordDialogVisible, setIsPasswordDialogVisible] = useState(false);
  const [isPreferencesDialogVisible, setIsPreferencesDialogVisible] = useState(false);

  const handleUpdateProfile = (values: SettingsProfile) => {
    // Handle profile update here
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile updated successfully',
      life: 3000,
    });
    setIsProfileDialogVisible(false);
  };

  const handleUpdatePassword = (values: SettingsPassword) => {
    // Handle password update here
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Password updated successfully',
      life: 3000,
    });
    setIsPasswordDialogVisible(false);
  };

  const handleUpdatePreferences = (values: SettingsPreferences) => {
    // Handle preferences update here
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Preferences updated successfully',
      life: 3000,
    });
    setIsPreferencesDialogVisible(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Toast ref={toast} />
      <PageTitle>Settings</PageTitle>

      <div className="grid grid-cols-1 gap-6 mt-6 pt-10">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <p className="text-gray-500">Update your personal information</p>
          </div>
          <Button
            label="Edit Profile"
            icon="pi pi-user-edit"
            outlined
            onClick={() => setIsProfileDialogVisible(true)}
          />
        </div>

        <Divider layout="horizontal" className="hidden lg:block" />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">App Preferences</h2>
            <p className="text-gray-500">Customize your app experience</p>
          </div>
          <Button
            label="Edit Preferences"
            icon="pi pi-cog"
            outlined
            onClick={() => setIsPreferencesDialogVisible(true)}
          />
        </div>

        <Divider layout="horizontal" className="hidden lg:block" />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Security Settings</h2>
            <p className="text-gray-500">Update your password</p>
          </div>
          <Button
            label="Change Password"
            icon="pi pi-lock"
            outlined
            onClick={() => setIsPasswordDialogVisible(true)}
          />
        </div>
      </div>

      <ProfileSettings
        isVisible={isProfileDialogVisible}
        closeDialog={() => setIsProfileDialogVisible(false)}
        onUpdateProfile={handleUpdateProfile}
      />

      <PasswordSettings
        isVisible={isPasswordDialogVisible}
        closeDialog={() => setIsPasswordDialogVisible(false)}
        onUpdatePassword={handleUpdatePassword}
      />

      <AppPreferences
        isVisible={isPreferencesDialogVisible}
        closeDialog={() => setIsPreferencesDialogVisible(false)}
        onUpdatePreferences={handleUpdatePreferences}
      />
    </div>
  );
};

export default Settings;
