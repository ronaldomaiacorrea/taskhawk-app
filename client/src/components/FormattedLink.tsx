import { Link } from 'react-router-dom';

interface FormattedLinkProps {
	path: string;
	pageName: string;
	icon: string;
}

const FormattedLink = ({ path, pageName, icon }: FormattedLinkProps) => {
	return (
		<li className="flex items-center">
			<Link
				to={path}
				className="hover:text-teal-500 md:hover:bg-gray-700 md:hover:px-3 py-2 rounded-lg flex items-center gap-2 w-full text-xl"
			>
				<i className={`pi ${icon} text-xl`} />
				<span className="hidden md:inline ml-2 ">{pageName}</span>
			</Link>
		</li>
	);
};

export default FormattedLink;
