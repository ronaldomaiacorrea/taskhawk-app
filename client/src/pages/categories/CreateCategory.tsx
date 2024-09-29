import { Dialog } from 'primereact/dialog';
import FormFields from './categoryForm/FormFields';
import { Form, Formik } from 'formik';
import { categoryValidationSchema } from './categoryValidation';
import type { Category } from '@shared/types';
import { ICON } from '@shared/types';
import ActionButtons from '@components/ActionButtons';

export interface CreateCategoryProps {
	category: Omit<Category, 'id'> | undefined;
	isVisible: boolean;
	closeDialog: () => void;
	onCreateCategory: (category: Omit<Category, 'id'>) => void;
}

const initialCategory: Omit<Category, 'id'> = {
	name: '',
	description: '',
	icon: ICON.QuestionCircle,
};

const CreateCategory = ({
	category,
	isVisible,
	closeDialog,
	onCreateCategory,
}: CreateCategoryProps) => {
	return (
		<Formik
			initialValues={initialCategory}
			values={category}
			onSubmit={(values) => onCreateCategory(values)}
			validationSchema={categoryValidationSchema}
			enableReinitialize
		>
			{({ submitForm, resetForm }) => (
				<Dialog
					header={'Add category'}
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

export default CreateCategory;
