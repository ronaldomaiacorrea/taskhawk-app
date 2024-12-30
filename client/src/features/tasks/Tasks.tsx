import { ConfirmDialog } from '@common';
import { useTranslations } from '@hooks/useTranslations';
import { useCategories, useCreateTask, useTasks } from '@queries';
import type { Task } from '@shared/types';
import { Button } from 'primereact/button';
import type { Toast, ToastMessage } from 'primereact/toast';
import { useCallback, useRef, useState } from 'react';
import PageTitle from 'src/common/PageTitle';
import CreateTask from './components/CreateTask';
import TasksTable from './components/TasksTable';

const Tasks = () => {
  const { t } = useTranslations();
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState<Task[]>([]);
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const { data: categories = [] } = useCategories();
  const { data: tasks = [] } = useTasks();
  const toast = useRef<Toast | null>(null);
  const { mutate: addTask } = useCreateTask();

  const displayToast = useCallback(
    (message: string, severity?: ToastMessage['severity']) => {
      toast.current?.show({
        severity: severity,
        summary: t('common.action'),
        detail: message,
        life: 3000,
      });
    },
    [],
  );

  const handleCreateTask = (newTask: Omit<Task, 'id'>) => {
    window.console.log(newTask);
    addTask(newTask, {
      onSuccess: () => {
        displayToast(t('categories.createdCategory'), 'success');
        setIsCreateDialogVisible(false);
      },
      onError: () =>
        displayToast(t('categories.failedCreateCategory'), 'error'),
    });
  };

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
      <PageTitle description={t('tasks.taskDescriptionText')}>
        {t('tasks.tasksManagementTitle')}
      </PageTitle>
      <div className="lg:space-y-0 space-y-6">
        <div className="flex flex-col justify-between lg:items-center lg:flex-row lg:space-y-0">
          <div>
            <Button
              icon="pi pi-plus"
              label={t('common.task')}
              outlined
              className="my-4 text-teal-500 border-teal-500 dark:text-teal-400 dark:border-teal-400"
              onClick={() => setIsCreateDialogVisible(true)}
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
      <CreateTask
        closeDialog={() => setIsCreateDialogVisible(false)}
        isVisible={isCreateDialogVisible}
        onCreateTask={handleCreateTask}
      />
    </>
  );
};

export default Tasks;
