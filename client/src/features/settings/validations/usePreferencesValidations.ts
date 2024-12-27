import * as Yup from 'yup';

export const usePreferencesValidations = () => {
    const preferencesValidationSchema = Yup.object().shape({
        theme: Yup.string()
            .required('Theme is required')
            .oneOf(['light', 'dark'], 'Invalid theme value'),
        language: Yup.string()
            .required('Language is required')
            .oneOf(['en', 'es', 'fr', 'de'], 'Invalid language selection'),
    });

    return { preferencesValidationSchema };
};
