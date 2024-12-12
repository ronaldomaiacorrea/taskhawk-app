import { getTasksPerPriorityChartData } from '@utils';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import EmptyData from 'src/common/EmptyData';
import { useTranslations } from '@hooks/useTranslations';
import type { Task } from '@shared/types';

interface TasksPerPriorityProps {
  tasks: Task[];
}

const TasksPerPriority = ({ tasks }: TasksPerPriorityProps) => {
  const { t } = useTranslations();
  const { chartData, options } = getTasksPerPriorityChartData(tasks);

  return (
    <Card
      title={t('dashboard.tasksPerPriorityTitle')}
      className="rounded-none"
      subTitle={t('dashboard.tasksPerPriorityDescription')}
    >
      <div className="border-b border-gray-300 mb-4"></div>
      <div className="flex flex-row justify-center items-center">
        {chartData?.datasets?.[0]?.data?.some((item) => item !== 0) ? (
          <Chart type="bar" data={chartData} options={options} />
        ) : (
          <EmptyData message={t('tasks.notDefined')} />
        )}
      </div>
    </Card>
  );
};

export default TasksPerPriority;
