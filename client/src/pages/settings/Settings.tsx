import PageTitle from '@components/PageTitle';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ActionButtons from '@components/ActionButtons';
import { useDarkMode } from '@hooks/useDarkMode';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';

interface SettingsFormValues {
	theme: string;
	username: string;
	password: string;
	confirmPassword: string;
	language: string;
}

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
];

const themes = [
	{ label: 'Light', value: 'light' },
	{ label: 'Dark', value: 'dark' },
];

const settingsValidationSchema = Yup.object().shape({
	theme: Yup.string().required('Theme setting is required'),
	username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm Password is required'),
	language: Yup.string().required('Language is required'),
});

const Settings = () => {
	const [theme, toggleTheme] = useDarkMode();

	const initialValues: SettingsFormValues = {
		theme,
		username: '',
		password: '',
		confirmPassword: '',
		language: 'en',
	};

	const handleSubmit = (values: SettingsFormValues) => {
		if (values.theme !== theme) {
			toggleTheme();
		}
		// Handle other settings updates here
		console.log('Settings updated:', values);
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
				{({ submitForm, resetForm, values, errors, touched, handleChange, setFieldValue }) => (
					<>
						<Form className="mt-6">
							<div className="card p-4">
								<div className="flex flex-col gap-6">
									<div className="flex-1">
										<div className="flex flex-col gap-2">
											<label htmlFor="theme">Theme</label>
											<Dropdown
												id="theme"
												name="theme"
												value={theme}
												options={themes}
												onChange={(e) => {
													setFieldValue('theme', e.value);
													toggleTheme();
												}}
												className={`w-full ${touched.theme && errors.theme ? 'p-invalid' : ''}`}
											/>
											{touched.theme && errors.theme && (
												<small className="text-red-600">{errors.theme}</small>
											)}
										</div>
									</div>

									<div className="flex-1">
										<div className="flex flex-col gap-2">
											<label htmlFor="username">Username</label>
											<InputText
												id="username"
												name="username"
												value={values.username}
												onChange={handleChange}
												className={`w-full ${touched.username && errors.username ? 'border-red-500' : 'border-gray-300'}`}
												placeholder="Enter username"
											/>
											{touched.username && errors.username && (
												<small className="text-red-600">{errors.username}</small>
											)}
										</div>
									</div>

									<div className="flex-1">
										<div className="flex flex-col gap-2">
											<label htmlFor="username">Username</label>
											<InputText
												id="username"
												name="username"
												value={values.username}
												onChange={handleChange}
												className={`w-full ${touched.username && errors.username ? 'border-red-500' : 'border-gray-300'}`}
												placeholder="Enter username"
											/>
											{touched.username && errors.username && (
												<small className="text-red-600">{errors.username}</small>
											)}
										</div>
									</div>

									<div className="flex-1">
										<div className="flex flex-col gap-2">
											<label htmlFor="password">Password</label>
											<span className={`p-input-icon-right w-full ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}`}>
												<Password
													id="password"
													name="password"
													value={values.password}
													onChange={handleChange}
													toggleMask
													className="w-full"
													inputClassName="w-full"
													feedback={false}
													placeholder="Enter password"
													pt={{
														input: { className: 'w-full' },
														// showIcon: { className: 'h-full flex items-center' },
														// hideIcon: { className: 'h-full flex items-center' }
													}}
												/>
											</span>
											{touched.password && errors.password && (
												<small className="text-red-600">{errors.password}</small>
											)}
										</div>
									</div>

									<div className="flex-1">
										<div className="flex flex-col gap-2">
											<label htmlFor="confirmPassword">Confirm Password</label>
											<span className={`p-input-icon-right w-full ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}>
												<Password
													id="confirmPassword"
													name="confirmPassword"
													value={values.confirmPassword}
													onChange={handleChange}
													toggleMask
													className="w-full"
													inputClassName="w-full"
													feedback={false}
													placeholder="Confirm password"
													pt={{
														input: { className: 'w-full' },
														// showIcon: { className: 'h-full flex items-center' },
														// hideIcon: { className: 'h-full flex items-center' }
													}}
												/>
											</span>
											{touched.confirmPassword && errors.confirmPassword && (
												<small className="text-red-600">{errors.confirmPassword}</small>
											)}
										</div>
									</div>

									<div className="flex-1">
										<div className="flex flex-col gap-2">
											<label htmlFor="language">Language</label>
											<Dropdown
												id="language"
												name="language"
												value={values.language}
												options={languages}
												onChange={(e) => setFieldValue('language', e.value)}
												className={`w-full ${touched.language && errors.language ? 'border-red-500' : 'border-gray-300'}`}
												placeholder="Select language"
											/>
											{touched.language && errors.language && (
												<small className="text-red-600">{errors.language}</small>
											)}
										</div>
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

						<div className="mt-4">
							<pre>{JSON.stringify(values, null, 2)}</pre>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
};

export default Settings;
