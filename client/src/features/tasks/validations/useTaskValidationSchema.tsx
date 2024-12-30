import { useTranslations } from '@hooks/useTranslations';
import { Status } from '@shared/types';
import * as yup from 'yup';
import { MAX_TASK_DESCRIPTION_LENGTH, MAX_TASK_NAME_LENGTH } from './constants';

export const useTaskValidationSchema = () => {
  const { t } = useTranslations();

  return yup.object({
    title: yup
      .string()
      .required(t('tasks.taskNameIsRequired'))
      .max(
        MAX_TASK_NAME_LENGTH,
        t('tasks.taskMaxNameSizeValidation', { number: MAX_TASK_NAME_LENGTH }),
      ),
    description: yup.string().max(
      MAX_TASK_DESCRIPTION_LENGTH,
      t('tasks.taskMaxDescriptionSizeValidation', {
        number: MAX_TASK_DESCRIPTION_LENGTH,
      }),
    ),
    priority: yup
      .string()
      .oneOf(['High', 'Medium', 'Low'], t('tasks.taskPriorityInvalid'))
      .required(t('tasks.taskPriorityRequired')),
    status: yup
      .string()
      .oneOf(Object.values(Status), t('tasks.taskStatusInvalid'))
      .required(t('tasks.taskStatusRequired')),
    category_id: yup.number().required(t('tasks.taskCategoryRequired')),
    dueDate: yup
      .date()
      .min(new Date(), t('tasks.taskDueDateInvalid'))
      .required(t('tasks.taskDueDateRequired')),
  });
};
