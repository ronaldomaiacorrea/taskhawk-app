import { Button } from 'primereact/button';
import PageTitle from '../../components/PageTitle';
import {
	useCategories,
	useCreateCategory,
	useDeleteCategory,
	useUpdateCategory,
} from '../../queries/categories';
import CategoryCard from './CategoryCard';
import { useCallback, useRef, useState } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';
import { Category } from '../../../../shared/types';
import Spinner from '../../components/Spinner';
import { Message } from 'primereact/message';
import EditCategory from './EditCategory';
import CreateCategory from './CreateCategory';

const Categories = () => {
	const { data: categories = [], isLoading, isError, error } = useCategories();
	const toast = useRef<Toast | null>(null);

	const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
	const { mutate: addCategory } = useCreateCategory();

	const [selectedCategory, setSelectedCategory] = useState<
		Category | undefined
	>(undefined);
	const { mutate: updateCategory } = useUpdateCategory();
	const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

	const { mutate: deleteCategory } = useDeleteCategory();

	const displayToast = useCallback(
		(message: string, severity?: ToastMessage['severity']) => {
			toast.current?.show({
				severity: severity,
				summary: 'Action',
				detail: message,
				life: 3000,
			});
		},
		[]
	);

	const handleDeleteCategory = (category: Category) => {
		if (!category) return;
		deleteCategory(category, {
			onSuccess: () => displayToast('Category deleted', 'success'),
			onError: () => displayToast('Failed to delete category', 'error'),
		});
	};

	const handleEditCategory = (category: Category) => {
		if (!category) return;
		setSelectedCategory(category);
		setIsEditDialogVisible(true);
	};

	const handleUpdateCategory = (category: Category) => {
		updateCategory(category, {
			onSuccess: () => {
				displayToast('Category updated', 'success');
				setIsEditDialogVisible(false);
			},
			onError: () => displayToast('Failed to update category', 'error'),
		});
	};
	const handleCreateCategory = (newCategory: Omit<Category, 'id'>) => {
		addCategory(newCategory, {
			onSuccess: () => {
				displayToast('Category added', 'success');
				setIsCreateDialogVisible(false);
			},
			onError: () => displayToast('Failed to add category', 'error'),
		});
	};

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
				onClick={() => setIsCreateDialogVisible(true)}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories.length > 0 ? (
					categories.map((category) => (
						<div key={category.id}>
							<CategoryCard
								category={category}
								onDelete={handleDeleteCategory}
								onEdit={handleEditCategory}
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
			{selectedCategory && (
				<EditCategory
					category={selectedCategory}
					isVisible={isEditDialogVisible}
					closeDialog={() => setIsEditDialogVisible(false)}
					onUpdateCategory={handleUpdateCategory}
				/>
			)}
			<CreateCategory
				category={undefined}
				isVisible={isCreateDialogVisible}
				closeDialog={() => setIsCreateDialogVisible(false)}
				onCreateCategory={handleCreateCategory}
			/>
		</>
	);
};

export default Categories;
