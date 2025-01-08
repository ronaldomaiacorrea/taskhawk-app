import { useTranslations } from '@hooks/useTranslations';
import { useCategories } from '@queries';
import { ICON, Status } from '@shared/types';
import type { Task } from '@shared/types';
import { useFormikContext } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useMemo } from 'react';

type IconOption = {
  label: string;
  value: string;
  icon?: string;
  color?: string;
};

type StatusOption = {
  label: string;
  value: Status;
  icon?: string;
  color?: string;
};

type CategoryOption = {
  label: string;
  value: number;
  icon: ICON;
};

const TaskFormFields = () => {
  const { t } = useTranslations();
  const { values, errors, touched, setFieldValue } = useFormikContext<
    Task | Omit<Task, 'id'>
  >();
  const { data: categories = [] } = useCategories();

  const statusOptions = useMemo<StatusOption[]>(
    () => [
      {
        value: Status.OVERDUE,
        color: 'text-red-500',
        icon: 'pi pi-exclamation-triangle',
        label: t('tasks.overdue'),
      },
      {
        value: Status.COMPLETED,
        color: 'text-green-500',
        icon: 'pi pi-check-circle',
        label: t('tasks.completed'),
      },
      {
        value: Status.IN_PROGRESS,
        color: 'text-blue-500',
        icon: 'pi pi-spinner',
        label: t('tasks.inProgress'),
      },
      {
        value: Status.TO_DO,
        color: '',
        icon: 'pi pi-calendar',
        label: t('tasks.toDo'),
      },
      {
        value: Status.BLOCKED,
        color: 'text-orange-500',
        icon: 'pi pi-ban',
        label: t('tasks.blocked'),
      },
    ],
    [t],
  );

  const priorityOptions = useMemo<IconOption[]>(
    () => [
      {
        label: t('tasks.high'),
        value: 'High',
        icon: 'pi pi-arrow-up',
        color: 'text-red-500',
      },
      {
        label: t('tasks.medium'),
        value: 'Medium',
        icon: 'pi pi-arrow-right',
        color: 'text-orange-500',
      },
      {
        label: t('tasks.low'),
        value: 'Low',
        icon: 'pi pi-arrow-down',
        color: 'text-indigo-500',
      },
    ],
    [t],
  );

  const categoryOptions: CategoryOption[] = categories.map((category) => ({
    label: category.name,
    value: category.id,
    icon: category.icon,
  }));

  const iconTemplate = (option: IconOption, placeHolder: string) => (
    <div className={`flex gap-3 items-center ${option?.color}`}>
      {option?.icon ? <i className={option?.icon} /> : ''}
      {option?.label || placeHolder}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">{t('common.name')}</label>
        <InputText
          id="title"
          aria-describedby="title-help"
          onChange={(e) => setFieldValue('title', e.target.value)}
          value={values.title}
          invalid={Boolean(touched.title && errors.title)}
          placeholder={t('tasks.taskTitlePlaceHolder')}
        />
        {touched.title && errors.title && (
          <small id="title-help" className="text-red-600">
            {errors.title}
          </small>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">{t('tasks.description')}</label>
        <InputTextarea
          rows={5}
          cols={30}
          id="description"
          onChange={(e) => setFieldValue('description', e.target.value)}
          value={values.description}
          placeholder={t('tasks.taskDescriptionPlaceHolder')}
          autoResize
          invalid={Boolean(touched.description && errors.description)}
        />
        {touched.description && errors.description && (
          <small id="description-help" className="text-red-600">
            {errors.description}
          </small>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-2 w-full grid-cols-1">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="priority">{t('tasks.priority')}</label>
          <Dropdown
            id="priority"
            value={values.priority}
            onChange={(e) => setFieldValue('priority', e.value)}
            options={priorityOptions}
            itemTemplate={(option) =>
              iconTemplate(option, t('tasks.taskPriorityPlaceHolder'))
            }
            valueTemplate={(option) =>
              iconTemplate(option, t('tasks.taskPriorityPlaceHolder'))
            }
          />
          {touched.priority && errors.priority && (
            <small id="priority-help" className="text-red-600">
              {errors.priority}
            </small>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="status">{t('tasks.status')}</label>
          <Dropdown
            id="status"
            value={values.status}
            onChange={(e) => setFieldValue('status', e.value)}
            options={statusOptions}
            itemTemplate={(option) =>
              iconTemplate(option, t('tasks.taskStatusPlaceHolder'))
            }
            valueTemplate={(option) =>
              iconTemplate(option, t('tasks.taskStatusPlaceHolder'))
            }
          />
          {touched.priority && errors.priority && (
            <small id="status-help" className="text-red-600">
              {errors.status}
            </small>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category">{t('common.category')}</label>
        <Dropdown
          id="category"
          value={values.category_id}
          onChange={(e) => setFieldValue('category_id', e.value)}
          options={categoryOptions}
          itemTemplate={(option) =>
            iconTemplate(option, t('tasks.taskCategoryPlaceHolder'))
          }
          valueTemplate={(option) =>
            iconTemplate(option, t('tasks.taskCategoryPlaceHolder'))
          }
        />
        {touched.category_id && errors.category_id && (
          <small id="category-help" className="text-red-600">
            {errors.category_id}
          </small>
        )}
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="dueDate">{t('tasks.dueDate')}</label>
        <Calendar
          id="dueDate"
          value={new Date(values.dueDate)}
          onChange={(e) => setFieldValue('dueDate', e.value)}
          invalid={Boolean(touched.dueDate && errors.dueDate)}
          dateFormat="mm/dd/yy"
          showTime
          hourFormat="12"
          minDate={new Date()}
          className="min-w-full"
        />
        {touched.dueDate && typeof errors.dueDate === 'string' && (
          <small id="dueDate-help" className="text-red-600">
            {errors.dueDate}
          </small>
        )}
      </div>
    </div>
  );
};

export default TaskFormFields;
