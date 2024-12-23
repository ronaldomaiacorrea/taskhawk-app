import { useTranslations } from '@hooks/useTranslations';

type SidebarLink = {
  path: string;
  pageName: string;
  icon: string;
};

export const sidebarLinks = (): SidebarLink[] => {
  const { t } = useTranslations();

  return [
    { path: '/', pageName: t('common.dashboard'), icon: 'pi pi-home' },
    { path: '/tasks', pageName: t('common.tasks'), icon: 'pi pi-list' },
    {
      path: '/calendar',
      pageName: t('common.calendar'),
      icon: 'pi pi-calendar',
    },
    {
      path: '/categories',
      pageName: t('common.categories'),
      icon: 'pi pi-tags',
    },
    { path: '/settings', pageName: t('common.settings'), icon: 'pi pi-cog' },
  ];
};
