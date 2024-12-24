import { PageTitle } from '@common';
import { useDarkMode } from '@hooks/useDarkMode';
import { useTranslations } from '@hooks/useTranslations';
import type { Language, UserSettings } from '@shared/types';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import EditProfile from './components/Profile';
import SettingsCard from './components/SettingsCard';
import ThemeSelector from './components/ThemeSelector';
import useSettingsValidationsSchema from './validations/useSettingsValidationsSchema';

const Settings = () => {
  const [darkMode] = useDarkMode();
  const { t, i18n } = useTranslations();

  // Initial form values
  const initialValues: UserSettings = {
    darkMode,
    username: '',
    email: '',
    language: i18n.language as Language,
  };

  const settingsValidationsSchema = useSettingsValidationsSchema();

  // Log the current language when it changes
  useEffect(() => {}, [i18n.language]);

  return (
    <div className="max-w-3xl mx-auto px-4 dark:bg-zinc-900">
      <PageTitle description={t('settings.description')}>Settings</PageTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={settingsValidationsSchema}
        onSubmit={() => {}}
        enableReinitialize
      >
        <Form className="mt-6">
          <div className="card p-4">
            <div className="flex flex-col gap-6">
              <SettingsCard
                title={t('settings.profileTitle')}
                icon="pi pi-user"
                description={t('settings.profileDescription')}
              >
                <EditProfile />
              </SettingsCard>
              <SettingsCard
                title={t('settings.themeTitle')}
                icon="pi pi-cog"
                description={t('settings.themeDescription')}
              >
                <ThemeSelector darkMode={darkMode} changeTheme={() => {}} />
              </SettingsCard>
              <SettingsCard
                title={t('settings.languageTitle')}
                icon="pi pi-globe"
                description={t('settings.languageDescription')}
              >
                Test
              </SettingsCard>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
