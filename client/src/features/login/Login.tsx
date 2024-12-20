import { useAuth } from '@hooks/useAuth';
import { useTranslations } from '@hooks/useTranslations';
import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormFields from './components/LoginFormFields';
import { useLoginValidationSchema } from './validations/loginFormValidations';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const validationSchema = useLoginValidationSchema();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError('');
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      setError(`${t('login.failedErrorMessage')}: ${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl mb-4">{t('common.login')}</h2>
            <LoginFormFields />
            <Button
              type="submit"
              icon="pi pi-key"
              label={t('common.login')}
              raised
              className="w-full mt-8 mb-4 text-white border-teal-500 bg-teal-500 hover:bg-teal-600 hover:border-teal-600"
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
