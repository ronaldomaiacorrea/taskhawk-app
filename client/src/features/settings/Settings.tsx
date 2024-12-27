import { PageTitle } from '@common';
import { ThemeContext } from '@context/ThemeProvider';
import { useTranslations } from '@hooks/useTranslations';
import type { Language, UserSettings } from '@shared/types';
import { Form, Formik } from 'formik';
import { useContext, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import EditProfile from './components/Profile';
import SettingsCard from './components/SettingsCard';
import ThemeSelector from './components/ThemeSelector';
import useSettingsValidationsSchema from './validations/useSettingsValidationsSchema';

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslations();

  const initialValues: UserSettings = {
    theme: 'light',
    username: '',
    email: '',
    language: i18n.language as Language,
  };

  const settingsValidationsSchema = useSettingsValidationsSchema();

  // Log the current language when it changes
  useEffect(() => {}, [i18n.language]);

  return (
    <div className="max-w-3xl mx-auto px-4 dark:bg-zinc-900">
      <PageTitle description={t('settings.description')}>
        {t('common.settings')}
      </PageTitle>
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
                <ThemeSelector theme={theme} onChangeTheme={setTheme} />
              </SettingsCard>
              <SettingsCard
                title={t('settings.languageTitle')}
                icon="pi pi-globe"
                description={t('settings.languageDescription')}
              >
                <LanguageSelector
                  value={i18n.language as Language}
                  onChangeLanguage={(value) => i18n.changeLanguage(value)}
                />
              </SettingsCard>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
