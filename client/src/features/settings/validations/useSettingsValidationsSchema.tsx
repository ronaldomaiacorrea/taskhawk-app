import { useTranslations } from '@hooks/useTranslations';
import * as yup from 'yup';
import { PASSWORD_MIN_CHARACTERS, USERNAME_MIN_CHARACTERS } from './constants';

const useSettingsValidationsSchema = () => {
  const { t } = useTranslations();

  return yup.object().shape({
    theme: yup.string(),
    username: yup
      .string()
      .required(t('settings.usernameValidationRequired'))
      .min(
        USERNAME_MIN_CHARACTERS,
        t('settings.usernameMinCharacters', {
          number: USERNAME_MIN_CHARACTERS,
        }),
      ),
    password: yup
      .string()
      .min(
        PASSWORD_MIN_CHARACTERS,
        t('settings.passwordMinCharacters', {
          number: PASSWORD_MIN_CHARACTERS,
        }),
      )
      .matches(/[0-9]/, t('settings.passwordMinNumbers'))
      .matches(/[a-z]/, t('settings.passwordMinLowerCase'))
      .matches(/[A-Z]/, t('settings.passwordMinUpperCase')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('settings.passwordMatch'))
      .required(t('settings.confirmPasswordRequired')),
    language: yup.string(),
  });
};

export default useSettingsValidationsSchema;
