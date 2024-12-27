import { ActionButtons } from '@common';
import { useDarkMode } from '@hooks/useDarkMode';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { usePreferencesValidations } from '../validations/usePreferencesValidations';

interface PreferencesFormValues {
    theme: string;
    language: string;
}

interface AppPreferencesProps {
    isVisible: boolean;
    closeDialog: () => void;
    onUpdatePreferences: (values: PreferencesFormValues) => void;
}

const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
];

export const AppPreferences = ({
    isVisible,
    closeDialog,
    onUpdatePreferences,
}: AppPreferencesProps) => {
    const [theme, toggleTheme] = useDarkMode();
    const { preferencesValidationSchema } = usePreferencesValidations();

    const initialValues: PreferencesFormValues = {
        theme,
        language: 'en',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={preferencesValidationSchema}
            onSubmit={onUpdatePreferences}
            enableReinitialize
        >
            {(formik) => (

                <Dialog
                    header="App Preferences"
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
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium">Dark Mode</h3>
                                    <p className="text-sm text-gray-500">Toggle dark mode on/off</p>
                                </div>
                                <InputSwitch
                                    checked={theme === 'dark'}
                                    onChange={() => {
                                        toggleTheme();
                                        formik.setFieldValue('theme', theme === 'dark' ? 'light' : 'dark');
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="language">Language</label>
                                <Dropdown
                                    id="language"
                                    name="language"
                                    value={formik.values.language}
                                    options={languages}
                                    onChange={(e) => formik.setFieldValue('language', e.value)}
                                    className={`w-full ${formik.touched.language && formik.errors.language
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                    placeholder="Select your preferred language"
                                />
                                {formik.touched.language && formik.errors.language && (
                                    <small className="text-red-600">{formik.errors.language}</small>
                                )}
                                <p className="text-sm text-gray-500">Select your preferred language</p>
                            </div>
                        </div>
                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};
