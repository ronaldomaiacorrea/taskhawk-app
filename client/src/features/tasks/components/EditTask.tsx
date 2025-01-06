import { ActionButtons } from '@common';
import { useTranslations } from '@hooks/useTranslations';
import type { Task } from '@shared/types';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { useTaskValidationSchema } from '../validations/useTaskValidationSchema';
import TaskFormFields from './TaskFormFields';

interface EditTaskProps {
  isVisible: boolean;
  closeDialog: () => void;
  onUpdateTask: (task: Task) => void;
  task: Task;
}

const EditTask = ({
  closeDialog,
  isVisible,
  onUpdateTask,
  task,
}: EditTaskProps) => {
  const { t } = useTranslations();
  const taskValidationSchema = useTaskValidationSchema();
  return (
    <Formik
      initialValues={task}
      values={task}
      onSubmit={(values) => onUpdateTask({ ...values, id: task.id })}
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

export default EditTask;
