import { ConfirmDialog } from '@common';
import { useCategories, useTasks } from '@queries';
import { Button } from 'primereact/button';
import { useState } from 'react';
import PageTitle from 'src/common/PageTitle';
import { useTranslations } from '@hooks/useTranslations';
import { Task } from '@shared/types';
// Import { useState } from 'react';
// Import { InputText } from 'primereact/inputtext';

import TasksTable from './components/TasksTable';

const Tasks = () => {
  const { t } = useTranslations();
  // Const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState<Task[]>([]);
  const { data: categories = []} = useCategories();
  const { data: tasks = []} = useTasks();

  const confirmDelete = (selectedTasks: Task[]) => {
    setTasksToDelete(selectedTasks);
    setIsDeleteDialogVisible(true);
  };

  const dialogContent = (
    <>
      <p className="py-4">{t('tasks.confirmDelete')}</p>
      <ul>
        {tasksToDelete?.map((task) => (
          <li key={task.id} className="p-1 px-2">
            {task.title}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <PageTitle>{t('tasks.tasksManagementTitle')}</PageTitle>
      <div className="lg:space-y-0 space-y-6">
        <div className="flex flex-col justify-between lg:items-center lg:flex-row lg:space-y-0">
          <div>
            <Button
              icon="pi pi-plus"
              label="Task"
              outlined
              className="my-4 text-teal-500 border-teal-500 dark:text-teal-400 dark:border-teal-400"
              // OnClick={() => setIsCreateDialogVisible(true)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <TasksTable
            tasks={tasks}
            categories={categories}
            deleteTasks={confirmDelete}
          />
        </div>
      </div>
      <div className="w-3/4">
        <ConfirmDialog
          header={t('tasks.confirmDeletionTitle')}
          visible={isDeleteDialogVisible}
          handleHiding={() => {
            if (!isDeleteDialogVisible) {
              return;
            }
            setIsDeleteDialogVisible(false);
          }}
          content={dialogContent}
          onConfirm={() => {}}
        />
      </div>
    </>
  );
};

export default Tasks;
