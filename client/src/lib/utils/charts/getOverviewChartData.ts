import { backgroundColors } from '@constants';
import { useTranslations } from '@hooks/useTranslations';
import type { Task } from '@shared/types';
import { Status } from '@shared/types';
import { hexToRgba } from '@utils';
import type { TooltipItem } from 'chart.js';

/**
 * Generates chart data and configuration options for an overview chart based on task statuses.
 *
 * @param {Task[] | undefined} tasks - An array of tasks or undefined.
 * @returns {Object} An object containing the chart data and options.
 *
 */
export const getOverviewChartData = (tasks: Task[] | undefined) => {
  const { t } = useTranslations();

  const statusTranslated: Record<Status, string> = {
    [Status.TO_DO]: t('tasks.toDo'),
    [Status.COMPLETED]: t('tasks.completed'),
    [Status.BLOCKED]: t('tasks.blocked'),
    [Status.OVERDUE]: t('tasks.overdue'),
    [Status.IN_PROGRESS]: t('tasks.inProgress'),
  };

  const statuses = Object.values(Status);
  const labels = statuses.map((status) => statusTranslated[status]);

  const dataValues = new Array(statuses.length).fill(0);

  const statusIndexMap: Record<Status, number> = {
    [Status.TO_DO]: 0,
    [Status.COMPLETED]: 1,
    [Status.BLOCKED]: 2,
    [Status.OVERDUE]: 3,
    [Status.IN_PROGRESS]: 4,
  };

  tasks?.forEach((task) => {
    const index = statusIndexMap[task.status];
    if (index !== undefined) {
      dataValues[index]++;
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        text: t('tasks.status'),
        labels: {
          usePointStyle: false,
          boxWidth: 20,
          padding: 20,
          margin: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        boxPadding: 5,
        callbacks: {
          label: function (tooltipItem: TooltipItem<'pie'>) {
            const data = tooltipItem.dataset.data as number[];
            const currentValue = data[tooltipItem.dataIndex as number];

            const total = data.reduce(
              (acc: number, value: number) => acc + value,
              0,
            );
            const percentage = ((currentValue / total) * 100).toFixed(2);

            return `${percentage}%`;
          },
        },
      },
    },
  };

  const chartBackgroundColors = statuses.map(
    (status) => backgroundColors[status],
  );

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: chartBackgroundColors,
        borderWidth: 2,
        hoverBackgroundColor: chartBackgroundColors.map((color) =>
          hexToRgba(color, 0.8),
        ),
        hoverBorderColor: chartBackgroundColors.map((color) =>
          hexToRgba(color, 1),
        ),
      },
    ],
  };

  return { chartData, options };
};
