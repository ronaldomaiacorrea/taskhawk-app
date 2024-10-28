import React from 'react';
import { Divider } from 'primereact/divider';

export interface PageTitleProps {
	children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
	return (
		<>
			<h1 className="text-3xl font-bold py-2">{children}</h1>
			<Divider />
		</>
	);
};

export default PageTitle;
