import { ConfirmDialog, Spinner } from '@common';
import { useTranslations } from '@hooks/useTranslations';
import {
  useCategories,
  useCreateTask,
  useDeleteTasks,
  useTasks,
} from '@queries';
import type { Task } from '@shared/types';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import type { ToastMessage } from 'primereact/toast';
import { useCallback, useRef, useState } from 'react';
import PageTitle from 'src/common/PageTitle';
import CreateTask from './components/CreateTask';
import TasksTable from './components/TasksTable';

const Tasks = () => {
  const { t } = useTranslations();
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [tasksToDelete, setTasksToDelete] = useState<Task[]>([]);
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useCategories();
  const { data: tasks = [], isLoading, isError, error } = useTasks();
  const toast = useRef<Toast | null>(null);
  const { mutate: addTask } = useCreateTask();
  const { mutate: deleteTasks } = useDeleteTasks();

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
    addTask(newTask, {
      onSuccess: () => {
        displayToast(t('tasks.taskCreationSuccessMessage'), 'success');
        setIsCreateDialogVisible(false);
      },
      onError: () => {
        displayToast(t('tasks.taskCreationErrorMessage'), 'error');
      },
    });
  };

  const confirmDelete = (selectedTasks: Task[]) => {
    setTasksToDelete(selectedTasks);
    setIsDeleteDialogVisible(true);
  };

  const handleDeleteTask = (tasks: Task[]) => {
    if (!Array.isArray(tasks)) {
      return;
    }

    deleteTasks(tasks, {
      onSuccess: () => {
        displayToast(t('tasks.tasksDeletedSuccesMessage'), 'success');
        setIsDeleteDialogVisible(false);
        setTasksToDelete([]);
      },
      onError: () => displayToast(t('tasks.tasksDeletedErrorMessage'), 'error'),
    });
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

  if (isLoading || isLoadingCategories) {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isErrorCategories || isError) {
    return (
      <Message
        severity="error"
        text={errorCategories?.message || error?.message}
      />
    );
  }

  return (
    <>
      <Toast ref={toast} />
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
          onConfirm={() => handleDeleteTask(tasksToDelete)}
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
