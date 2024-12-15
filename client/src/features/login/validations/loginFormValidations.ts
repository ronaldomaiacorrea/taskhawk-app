import { useTranslations } from '@hooks/useTranslations';
import * as Yup from 'yup';

export const useLoginValidationSchema = () => {
  const { t } = useTranslations();

  return Yup.object({
    email: Yup.string()
      .email(t('login.emailInvalid'))
      .required(t('login.emailRequired')),
    password: Yup.string().required(t('login.passwordRequired')),
  });
};
