import { useTranslations } from '@hooks/useTranslations';
import { Status } from '@shared/types';
import type { Task } from '@shared/types';
import { useMemo } from 'react';

interface StatusInfo {
  color: string;
  icon: string;
  text: string;
}

export interface StatusBadgeProps {
  task: Task;
}

const StatusBadge = ({ task }: StatusBadgeProps) => {
  const { t } = useTranslations();

  const statusMapping = useMemo<Record<Task['status'], StatusInfo>>(
    () => ({
      [Status.OVERDUE]: {
        color: 'text-red-500',
        icon: 'pi pi-exclamation-triangle',
        text: t('tasks.overdue'),
      },
      [Status.COMPLETED]: {
        color: 'text-green-500',
        icon: 'pi pi-check-circle',
        text: t('tasks.completed'),
      },
      [Status.IN_PROGRESS]: {
        color: 'text-blue-500',
        icon: 'pi pi-spinner',
        text: t('tasks.inProgress'),
      },
      [Status.TO_DO]: {
        color: '',
        icon: 'pi pi-calendar',
        text: t('tasks.toDo'),
      },
      [Status.BLOCKED]: {
        color: 'text-orange-500',
        icon: 'pi pi-ban',
        text: t('tasks.blocked'),
      },
    }),
    [task.status],
  );

  const statusInfo = statusMapping[task.status] || {};
  const { text, color, icon } = statusInfo;
  if (!statusInfo) {
    return null;
  }

  return (
    <div className={color}>
      <i className={`${icon} pr-2`} />
      {text}
    </div>
  );
};

export default StatusBadge;
