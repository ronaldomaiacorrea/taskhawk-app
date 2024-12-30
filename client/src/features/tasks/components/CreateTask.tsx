import { ActionButtons } from '@common';
import { UserContext } from '@context/UserProvider';
import { useTranslations } from '@hooks/useTranslations';
import type { Task } from '@shared/types';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { useContext } from 'react';
import { useTaskValidationSchema } from '../validations/useTaskValidationSchema';
import TaskFormFields from './TaskFormFields';

interface CreateTaskProps {
  isVisible: boolean;
  closeDialog: () => void;
  onCreateTask: (task: Omit<Task, 'id'>) => void;
}

const CreateTask = ({
  closeDialog,
  isVisible,
  onCreateTask,
}: CreateTaskProps) => {
  const { t } = useTranslations();
  const { user } = useContext(UserContext);
  const taskValidationSchema = useTaskValidationSchema();
  const initialTask: Omit<Task, 'id'> = {
    title: '',
    user_id: user?.user_id,
    description: '',
    creationDate: new Date(),
    dueDate: new Date(),
    priority: '',
    status: undefined,
    category_id: undefined,
  };

  return (
    <Formik
      initialValues={initialTask}
      onSubmit={(values, { resetForm }) => {
        window.console.log(values);
        onCreateTask(values);
        resetForm();
      }}
      validationSchema={taskValidationSchema}
    >
      {({ submitForm, resetForm }) => (
        <Dialog
          header={t('tasks.addNewTaskDialogTitle')}
          onHide={() => {
            closeDialog();
            resetForm();
          }}
          className="max-w-xl w-full mx-auto px-4"
          visible={isVisible}
          footer={
            <ActionButtons
              handleSubmit={submitForm}
              handleCloseDialog={closeDialog}
              handleResetForm={resetForm}
            />
          }
        >
          <Form>
            <TaskFormFields />
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default CreateTask;
