import { Dialog } from 'primereact/dialog';
import FormFields from './categoryForm/FormFields';
import { Form, Formik } from 'formik';
import { categoryValidationSchema } from './categoryValidation';
import { Category } from '../../../../shared/types';
import ActionButtons from '../../components/ActionButtons';

export interface EditCategoryProps {
	category: Category;
	isVisible: boolean;
	closeDialog: () => void;
	onUpdateCategory: (category: Category) => void;
}

const EditCategory = ({
	category,
	isVisible,
	closeDialog,
	onUpdateCategory,
}: EditCategoryProps) => {
	return (
		<Formik
			initialValues={category}
			values={category}
			onSubmit={(values) => onUpdateCategory({ ...values, id: category.id })}
			validationSchema={categoryValidationSchema}
			enableReinitialize
		>
			{({ submitForm, resetForm }) => (
				<Dialog
					header={`Edit ${category.name} category`}
					visible={isVisible}
					className="max-w-3xl w-full mx-auto px-4"
					onHide={() => {
						resetForm();
						closeDialog();
					}}
					footer={
						<ActionButtons
							handleSubmit={submitForm}
							handleCloseDialog={closeDialog}
							handleResetForm={resetForm}
						/>
					}
				>
					<Form>
						<FormFields />
					</Form>
				</Dialog>
			)}
		</Formik>
	);
};

export default EditCategory;
