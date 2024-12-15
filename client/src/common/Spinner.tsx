import { useTranslations } from '@hooks/useTranslations';
import { ProgressSpinner } from 'primereact/progressspinner';

const Spinner = () => {
  const { t } = useTranslations();
  return (
    <ProgressSpinner
      style={{ width: '100px', height: '100px' }}
      strokeWidth="8"
      animationDuration=".5s"
      aria-label={t('common.loading')}
    />
  );
};

export default Spinner;
