import { useTranslations } from '@hooks/useTranslations';
import type { Task } from '@shared/types';
import { useMemo } from 'react';

interface PriorityInfo {
  icon: string;
  text: string;
  textColor: string;
}

export interface PriorityBadgeProps {
  task: Task;
}

const PriorityBadge = ({ task }: PriorityBadgeProps) => {
  const { t } = useTranslations();

  const priorityMapping = useMemo<Record<Task['priority'], PriorityInfo>>(
    () => ({
      High: {
        icon: 'pi pi-arrow-up',
        text: t('tasks.high'),
        textColor: 'text-red-500',
      },
      Medium: {
        icon: 'pi pi-arrow-right',
        text: t('tasks.medium'),
        textColor: 'text-orange-500',
      },
      Low: {
        icon: 'pi pi-arrow-down',
        text: t('tasks.low'),
        textColor: 'text-indigo-500',
      },
    }),
    [task, t],
  );

  const priorityInfo = priorityMapping[task.priority];
  const { text, icon, textColor } = priorityInfo;
  if (!priorityInfo) {
    return null;
  }

  return (
    <div className={textColor}>
      <i className={`${icon} pr-2`} />
      {text}
    </div>
  );
};

export default PriorityBadge;
