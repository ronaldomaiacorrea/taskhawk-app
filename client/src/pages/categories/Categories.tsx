import { Button } from 'primereact/button';
import PageTitle from '../../components/PageTitle';
import { useCategories } from '../../queries/categories';
import CategoryCard from './CategoryCard';

const Categories = () => {
	const { data: categories, isLoading, isError, error } = useCategories();

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	const handleDeleteCategory = (id: number) => {
		console.log('Delete category with id:', id);
	};

	const handleEditCategory = (id: number) => {
		console.log('Edit category with id:', id);
	};

	return (
		<>
			<PageTitle>Categories</PageTitle>
			<Button
				icon="pi pi-plus"
				label="Category"
				outlined
				className="my-4 text-teal-500 border-teal-500 dark:text-teal-400 dark:border-teal-400"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories?.map(({ id, name, icon, description }) => (
					<div key={id}>
						<CategoryCard
							id={id}
							name={name}
							icon={icon}
							description={description}
							onDelete={handleDeleteCategory}
							onEdit={handleEditCategory}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default Categories;
