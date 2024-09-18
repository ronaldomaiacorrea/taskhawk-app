import { useCategories } from '../../queries/categories';

const Categories = () => {
	const { data: categories, isLoading, isError, error } = useCategories();

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<div>
			{categories?.map((category) => (
				<div key={category.id}>
					<h3>{category.name}</h3>
					<p>{category.description}</p>
					<i className={category.icon} />
				</div>
			))}
		</div>
	);
};

export default Categories;
