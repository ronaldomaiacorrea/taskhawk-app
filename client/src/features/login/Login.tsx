import { useEffect } from 'react';
import { useAuth } from '@context/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from './validations/loginFormValidations';
import LoginFormFields from './components/LoginFormFields';

const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = loginValidationSchema;

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            await login(values.email, values.password);
            navigate('/');
        } catch (err) {
            // Handle error, possibly set a state to show error message
            console.error('Login failed:', err);
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
                        <h2 className="text-2xl mb-4">Login</h2>
                        <LoginFormFields />
                        <Button
                            type="submit"
                            icon="pi pi-key"
                            label="Login"
                            outlined
                            className="w-full mt-8 text-white border-teal-500 bg-teal-500 hover:bg-teal-600"
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
