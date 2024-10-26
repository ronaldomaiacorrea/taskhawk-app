import PageTitle from '@components/PageTitle';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ActionButtons from '@components/ActionButtons';
import { useDarkMode } from '@hooks/useDarkMode';

interface SettingsFormValues {
	theme: string;
}

const settingsValidationSchema = Yup.object().shape({
	theme: Yup.string().required('Theme setting is required'),
});

const Settings = () => {
	const [theme, toggleTheme] = useDarkMode();

	const initialValues: SettingsFormValues = {
		theme,
	};

	const handleSubmit = (values: SettingsFormValues) => {
		if (values.theme !== theme) {
			toggleTheme();
		}
	};

	return (
		<div className="max-w-3xl mx-auto px-4">
			<PageTitle>Settings</PageTitle>

			<Formik
				initialValues={initialValues}
				validationSchema={settingsValidationSchema}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				{({ submitForm, resetForm }) => (
					<Form className="mt-6">
						<div className="card p-4">
							<div className="field mb-4">
								<label htmlFor="theme" className="block mb-2">
									Theme
								</label>
								<div className="p-field-checkbox">
									<input
										type="checkbox"
										id="theme"
										name="theme"
										checked={theme === 'dark'}
										onChange={() => toggleTheme()}
										className="mr-2"
									/>
									<label htmlFor="theme">Dark mode</label>
								</div>
							</div>
						</div>

						<div className="mt-4">
							<ActionButtons
								handleSubmit={submitForm}
								handleResetForm={resetForm}
								handleCloseDialog={() => { }} // Empty function since this is not in a dialog
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Settings;
