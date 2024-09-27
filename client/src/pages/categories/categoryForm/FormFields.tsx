import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Category, ICON } from '../../../../../shared/types';
import { useFormikContext } from 'formik';

const iconOptions = Object.values(ICON).map((icon) => ({
	label: icon.split('pi pi-')[1],
	value: icon,
}));

const FormFields = () => {
	const { values, handleChange, errors, touched } = useFormikContext<
		Category | Omit<Category, 'id'>
	>();

	return (
		<div className="flex flex-col gap-6">
			<div className="flex-1">
				<div className="flex flex-col gap-1">
					<label htmlFor="name">Name</label>
					<InputText
						id="name"
						aria-describedby="name-help"
						onChange={handleChange}
						value={values.name}
						className={`${
							touched.name && errors.name
								? 'border-red-500 focus:border-red-500'
								: 'border-gray-300'
						}`}
						placeholder="Enter category name"
					/>
					{touched.name && errors.name && (
						<small id="name-help" className="text-red-600">
							{errors.name}
						</small>
					)}
				</div>
			</div>
			<div className="flex-1">
				<div className="flex flex-col gap-2">
					<label htmlFor="description">Description</label>
					<InputTextarea
						rows={2}
						id="description"
						aria-describedby="description-help"
						onChange={handleChange}
						value={values.description}
						className={`${
							touched.description && errors.description
								? 'border-red-500 focus:border-red-500'
								: 'border-gray-300'
						}`}
					/>
					{touched?.description && errors?.description && (
						<small id="description" className="text-red-600">
							{errors.description}
						</small>
					)}
				</div>
			</div>
			<div className="flex-1">
				<div className="flex flex-col gap-2">
					<label htmlFor="icon">Icon</label>
					<Dropdown
						id="icon"
						placeholder="Select an icon"
						onChange={handleChange}
						filter
						options={iconOptions}
						optionLabel="value"
						itemTemplate={(option) => (
							<i className={option?.value}>&nbsp;{option?.label}</i>
						)}
						value={values.icon}
						valueTemplate={(option) => (
							<i className={option?.value}>&nbsp;{option?.label}</i>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default FormFields;
