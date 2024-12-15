import { useTranslations } from '@hooks/useTranslations';
import { useFormikContext } from 'formik';
import { InputText } from 'primereact/inputtext';

const LoginFormFields = () => {
  const { t } = useTranslations();
  const { values, handleChange, errors, touched } = useFormikContext<{
    email: string;
    password: string;
  }>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">{t('common.email')}</label>
          <InputText
            id="email"
            aria-describedby="email-help"
            onChange={handleChange}
            value={values.email}
            className={`${
              touched.email && errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            placeholder={t('login.emailPlaceHolder')}
          />
          {touched.email && errors.email && (
            <small id="email-help" className="text-red-600">
              {errors.email}
            </small>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t('common.password')}</label>
          <InputText
            id="password"
            type="password"
            aria-describedby="password-help"
            onChange={handleChange}
            value={values.password}
            className={`${
              touched.password && errors.password
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            placeholder={t('login.passwordPlaceHolder')}
          />
          {touched.password && errors.password && (
            <small id="password-help" className="text-red-600">
              {errors.password}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginFormFields;
