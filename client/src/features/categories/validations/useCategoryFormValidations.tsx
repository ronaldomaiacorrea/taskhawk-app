import { useTranslations } from '@hooks/useTranslations';
import * as yup from 'yup';

export const useCategoryFormValidation = () => {
  const { t } = useTranslations();

  return yup.object({
    name: yup
      .string()
      .required(t('categories.validations.nameIsRequired'))
      .max(30, t('categories.validations.nameMaxLength')),
    description: yup
      .string()
      .max(100, t('categories.validations.descriptionMaxLength')),
  });
};
