import { useTranslations } from '@hooks/useTranslations';

export const useLanguages = () => {
  const { t } = useTranslations();

  return [
    { label: t('languages.english'), value: 'en-US' },
    { label: t('languages.spanish'), value: 'es' },
    { label: t('languages.french'), value: 'fr-CA' },
    { label: t('languages.portugueseBR'), value: 'pt-BR' },
    { label: t('languages.chinese'), value: 'zh' },
  ];
};
