import { ActionButtons } from '@common';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { usePasswordValidations } from '../validations/usePasswordValidations';

interface PasswordFormValues {
    password: string;
    confirmPassword: string;
}

interface PasswordSettingsProps {
    isVisible: boolean;
    closeDialog: () => void;
    onUpdatePassword: (values: PasswordFormValues) => void;
}

export const PasswordSettings = ({
    isVisible,
    closeDialog,
    onUpdatePassword,
}: PasswordSettingsProps) => {
    const { passwordValidationSchema } = usePasswordValidations();

    const initialValues: PasswordFormValues = {
        password: '',
        confirmPassword: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={passwordValidationSchema}
            onSubmit={onUpdatePassword}
            enableReinitialize
        >
            {(formik) => (

                <Dialog
                    header="Change Password"
                    visible={isVisible}
                    onHide={closeDialog}
                    modal
                    className="w-full max-w-lg"
                    footer={
                        <ActionButtons
                            handleSubmit={formik.submitForm}
                            handleResetForm={formik.resetForm}
                            handleCloseDialog={closeDialog}
                        />
                    }
                >
                    <Form className="mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">New Password</label>
                                <span
                                    className={`p-input-icon-right w-full ${formik.touched.password && formik.errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    <Password
                                        id="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        toggleMask
                                        className="w-full"
                                        inputClassName="w-full"
                                        feedback={false}
                                        placeholder="Enter new password"
                                        pt={{
                                            input: { className: 'w-full' },
                                        }}
                                    />
                                </span>
                                {formik.touched.password && formik.errors.password && (
                                    <small className="text-red-600">{formik.errors.password}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <span
                                    className={`p-input-icon-right w-full ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    <Password
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        toggleMask
                                        className="w-full"
                                        inputClassName="w-full"
                                        feedback={false}
                                        placeholder="Confirm new password"
                                        pt={{
                                            input: { className: 'w-full' },
                                        }}
                                    />
                                </span>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <small className="text-red-600">
                                        {formik.errors.confirmPassword}
                                    </small>
                                )}
                            </div>
                        </div>

                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};
