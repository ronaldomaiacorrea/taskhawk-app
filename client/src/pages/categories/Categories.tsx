import { Button } from 'primereact/button';
import PageTitle from '../../components/PageTitle';
import { useCategories, useDeleteCategory } from '../../queries/categories';
import CategoryCard from './CategoryCard';
// import { Dialog } from 'primereact/dialog';
// import CreateCategory from './CreateCategory';
import { useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';
import { Category } from '../../../../shared/types';
import Spinner from '../../components/Spinner';
import { Message } from 'primereact/message';

const Categories = () => {
	const { data: categories = [], isLoading, isError, error } = useCategories();
	// const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
	const mutation = useDeleteCategory();
	const toast = useRef<Toast | null>(null);

	const showToast = (message: string, severity?: ToastMessage['severity']) => {
		toast.current?.show({
			severity: severity,
			summary: 'Action',
			detail: message,
			life: 3000,
		});
	};

	const handleDeleteCategory = (category: Category) => {
		if (!category) return;
		mutation.mutate(category, {
			onSuccess: () => showToast('Category deleted', 'success'),
			onError: () => showToast('Failed to delete category', 'error'),
		});
	};

	// TODO: Implement edit category dialog
	// const handleEditCategoryDialog = (category: Category) => {
	// 	setCategoryToEdit(category);
	// };

	if (isLoading)
		return (
			<div className="flex flex-row justify-center items-center min-h-screen">
				<Spinner />
			</div>
		);

	if (isError) return <Message severity="error" text={error?.message} />;

	return (
		<>
			<Toast ref={toast} />
			<PageTitle>Categories</PageTitle>
			<Button
				icon="pi pi-plus"
				label="Category"
				outlined
				className="my-4 text-teal-500 border-teal-500 dark:text-teal-400 dark:border-teal-400"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.length > 0 ? (
					categories.map((category) => (
						<div key={category.id}>
							<CategoryCard
								category={category}
								onDelete={handleDeleteCategory}
								//TODO: Implement edit category dialog
								onEdit={() => {}}
							/>
						</div>
					))
				) : (
					<Message
						severity="info"
						text="No categories found."
						className="text-left text-xl"
					/>
				)}
			</div>
		</>
	);
};

export default Categories;
