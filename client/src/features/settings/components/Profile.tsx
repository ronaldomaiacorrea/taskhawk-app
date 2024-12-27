import { useTranslations } from '@hooks/useTranslations';
import type { UserSettings } from '@shared/types';
import { useFormikContext } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const EditProfile = () => {
  const { t } = useTranslations();
  const { values, touched, errors, handleChange, handleSubmit, resetForm } =
    useFormikContext<UserSettings>();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="username">{t('common.userName')}</label>
        {isEditing ? (
          <>
            <InputText
              id="username"
              aria-describedby="username-help"
              value={values.username}
              onChange={handleChange}
              className={`w-full ${touched.username && errors.username ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('settings.usernamePlaceHolder')}
            />
            {touched.username && errors.username && (
              <small id="username-help" className="text-red-600">
                {errors.username}
              </small>
            )}
          </>
        ) : (
          <div className="font-bold">{values.username || 'Not available'}</div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">{t('common.email')}</label>
        {isEditing ? (
          <>
            <InputText
              id="email"
              aria-describedby="email-help"
              value={values.email}
              onChange={handleChange}
              className={`w-full ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('settings.emailPlaceHolder')}
            />
            {touched.email && errors.email && (
              <small id="email-help" className="text-red-600">
                {errors.username}
              </small>
            )}
          </>
        ) : (
          <div className="font-bold">{values.email || 'Not available'}</div>
        )}
      </div>
      <div className="text-center">
        {isEditing ? (
          <div className="flex flex-row gap-2 justify-center">
            <Button
              label={t('common.cancel')}
              icon="pi pi-times"
              outlined
              severity="secondary"
              type="button"
              onClick={() => {
                setIsEditing(false);
                resetForm();
              }}
              text
            />
            <Button
              label={t('common.save')}
              icon="pi pi-check"
              severity="danger"
              outlined
              type="submit"
              onClick={() => handleSubmit()}
              text
            />
          </div>
        ) : (
          <Button
            label={t('common.edit')}
            icon="pi pi-user-edit"
            outlined
            type="button"
            onClick={() => setIsEditing(true)}
            text
            className="my-4 text-teal-500 dark:text-teal-400 dark:border-teal-400"
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
