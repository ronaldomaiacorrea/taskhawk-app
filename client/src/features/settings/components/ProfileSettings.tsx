import { ActionButtons } from '@common';
import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { useProfileValidations } from '../validations/useProfileValidations';

interface ProfileFormValues {
    fullName: string;
    email: string;
    profileImage?: File;
}

interface ProfileSettingsProps {
    isVisible: boolean;
    closeDialog: () => void;
    onUpdateProfile: (values: ProfileFormValues) => void;
}

export const ProfileSettings = ({
    isVisible,
    closeDialog,
    onUpdateProfile,
}: ProfileSettingsProps) => {
    const { profileValidationSchema } = useProfileValidations();

    const initialValues: ProfileFormValues = {
        fullName: '',
        email: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={profileValidationSchema}
            onSubmit={onUpdateProfile}
            enableReinitialize
        >
            {(formik) => (

                <Dialog
                    header="Profile Settings"
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
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <img
                                        src={formik.values.profileImage ? URL.createObjectURL(formik.values.profileImage) : 'default-avatar.png'}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full"
                                    />
                                    <FileUpload
                                        mode="basic"
                                        name="profileImage"
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        className="absolute bottom-0 right-0"
                                        chooseOptions={{
                                            iconOnly: true,
                                            label: '', // Prevent showing the file name
                                            auto: false, // Ensure the file name is not displayed
                                        }}
                                        onSelect={(e) => {
                                            const file = e.files[0];
                                            formik.setFieldValue('profileImage', file);
                                        }}
                                    />
                                </div>
                            </div>
                            {formik.touched.profileImage && formik.errors.profileImage && (
                                <small className="text-red-600 text-center">
                                    {formik.errors.profileImage as string}
                                </small>
                            )}

                            <div className="flex flex-col gap-2">
                                <label htmlFor="fullName">Full Name</label>
                                <InputText
                                    id="fullName"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    className={`w-full ${formik.touched.fullName && formik.errors.fullName
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                />
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <small className="text-red-600">{formik.errors.fullName}</small>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={`w-full ${formik.touched.email && formik.errors.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <small className="text-red-600">{formik.errors.email}</small>
                                )}
                            </div>
                        </div>

                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};
