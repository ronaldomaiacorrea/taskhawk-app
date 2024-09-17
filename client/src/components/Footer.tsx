import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

const Footer = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		const scrollPosition = window.scrollY;
		setIsVisible(scrollPosition > 300);
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<div className="h-20 bg-slate-700 flex items-center justify-between text-white w-full px-6">
			<div className="flex flex-row items-center gap-6">
				<a
					href="https://www.linkedin.com/in/ronaldomaiacorrea"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Author LinkedIn"
				>
					<i className="pi pi-linkedin hover:text-teal-500 text-3xl"></i>
				</a>
				<a
					href="https://github.com/ronaldomaiacorrea"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Author GitHub"
				>
					<i className="pi pi-github hover:text-teal-500 text-3xl"></i>
				</a>
				<a
					href="mailto:rmcdeveloper@outlook.com"
					rel="noopener noreferrer"
					aria-label="Author email"
				>
					<i className="pi pi-at hover:text-teal-500 text-3xl"></i>
				</a>
			</div>
			<div className="hidden sm:flex flex-col items-center text-sm">
				<div>&copy; {new Date().getFullYear()} TaskHawk.</div>
				<div>All rights reserved.</div>
			</div>
			<div className="flex items-center gap-4">
				<div>Version 0.0.1</div>
				<div>
					{isVisible && (
						<Button
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className="mr-4 rounded text-teal-500 border-teal-500 text-3xl"
							icon="pi pi-angle-up"
							outlined
							aria-label="Scroll to top"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Footer;
