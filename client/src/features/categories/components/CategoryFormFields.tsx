import { useTranslations } from '@hooks/useTranslations';
import { ICON } from '@shared/types';
import type { Category } from '@shared/types';
import { useFormikContext } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

type IconOption = {
  label: string;
  value: string;
};

const iconOptions = Object.values(ICON).map(
  (icon): IconOption => ({
    label: icon.split('pi pi-')[1],
    value: icon,
  }),
);

const FormFields = () => {
  const { t } = useTranslations();
  const { values, handleChange, errors, touched } = useFormikContext<
    Category | Omit<Category, 'id'>
  >();

  const iconTemplate = (option: IconOption) => (
    <div className="flex gap-3 items-center">
      <i className={option.value} />
      {option.label}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">{t('common.name')}</label>
          <InputText
            id="name"
            aria-describedby="name-help"
            onChange={handleChange}
            value={values.name}
            invalid={Boolean(touched.name && errors.name)}
            placeholder={t('categories.namePlaceHolder')}
          />
          {touched.name && errors.name && (
            <small id="name-help" className="text-red-600">
              {errors.name}
            </small>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label htmlFor="description">{t('tasks.description')}</label>
          <InputTextarea
            rows={2}
            id="description"
            aria-describedby="description-help"
            onChange={handleChange}
            value={values.description}
            invalid={Boolean(touched.description && errors.description)}
            placeholder={t('categories.descriptionPlaceHolder')}
          />
          {touched?.description && errors?.description && (
            <small id="description" className="text-red-600">
              {errors.description}
            </small>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label htmlFor="icon">{t('categories.iconLabel')}</label>
          <Dropdown
            id="icon"
            placeholder={t('categories.iconPlaceHolder')}
            onChange={handleChange}
            filter
            options={iconOptions}
            optionLabel="value"
            itemTemplate={(option) => iconTemplate(option)}
            value={values.icon}
            valueTemplate={(option) => iconTemplate(option)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFields;
