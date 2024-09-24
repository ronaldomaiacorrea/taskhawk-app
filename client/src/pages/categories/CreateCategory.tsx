import { Dialog } from 'primereact/dialog';
import CategoryForm from './CategoryForm';

interface CreateCategoryProps {
	id: number;
	handleVisibility: (isVisible: boolean) => void;
	isVisible: boolean;
}

const CreateCategory = ({
	isVisible,
	handleVisibility,
}: CreateCategoryProps) => {
	return (
		<Dialog
			header="Add new category"
			onHide={() => {
				if (!isVisible) return;
				handleVisibility(false);
			}}
		>
			<CategoryForm />
		</Dialog>
	);
};

export default CreateCategory;
