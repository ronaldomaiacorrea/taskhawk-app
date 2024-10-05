import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import type { Category } from '@shared/types';
import { ICON } from '@shared/types';
import { useFormikContext } from 'formik';

type IconOption = {
	label: string;
	value: string;
};

const iconOptions = Object.values(ICON).map(
	(icon): IconOption => ({
		label: icon.split('pi pi-')[1],
		value: icon,
	})
);

const FormFields = () => {
	const { values, handleChange, errors, touched } = useFormikContext<
		Category | Omit<Category, 'id'>
	>();

	const iconTemplate = (option: IconOption) => {
		return (
			<div className="flex gap-3 items-center">
				<i className={option.value} />
				{option.label}
			</div>
		);
	};

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
						placeholder="Enter category description"
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
						itemTemplate={(option) => iconTemplate(option)}
						value={values.icon}
						valueTemplate={(option) => iconTemplate(option)}
					/>
				</div>
			</div>
		</div>
	);
};

export default FormFields;
