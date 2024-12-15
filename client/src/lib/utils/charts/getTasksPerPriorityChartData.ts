import { useTranslations } from '@hooks/useTranslations';
import type { Task } from '@shared/types';

/**
 * Generates chart data for tasks based on their priority.
 *
 * @param {Task[] | undefined} tasks - An array of tasks or undefined.
 * @returns {Object} An object containing the chart data and options.
 */
export const getTasksPerPriorityChartData = (tasks: Task[] | undefined) => {
  const { t } = useTranslations();
  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
  };

  const chartData = {
    labels: [t('tasks.low'), t('tasks.medium'), t('tasks.high')],
    datasets: [
      {
        label: t('dashboard.tasksPerPriorityTitle'),
        data: [
          tasks?.filter((task) => task.priority === 'Low').length,
          tasks?.filter((task) => task.priority === 'Medium').length,
          tasks?.filter((task) => task.priority === 'High').length,
        ],
        backgroundColor: ['#FFC107', '#FF5722', '#F44336'],
      },
    ],
  };

  return { chartData, options };
};
