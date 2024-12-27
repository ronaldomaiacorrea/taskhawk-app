import * as Yup from 'yup';

export const useProfileValidations = () => {
    const profileValidationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Full name is required')
            .min(2, 'Full name must be at least 2 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email format'),
        profileImage: Yup.mixed()
            .test('fileSize', 'File is too large', function (value) {
                if (!value || !(value instanceof File)) return true;
                return value.size <= 1000000; // 1MB
            })
            .test('fileType', 'Unsupported file type', function (value) {
                if (!value || !(value instanceof File)) return true;
                return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }),
    });

    return { profileValidationSchema };
};
