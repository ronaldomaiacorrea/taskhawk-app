import { Divider } from 'primereact/divider';
import React from 'react';

export interface PageTitleProps {
  children: React.ReactNode;
  description: string;
}

const PageTitle = ({ children, description }: PageTitleProps) => (
  <>
    <h1 className="text-3xl font-bold py-2 pt-6">{children}</h1>
    <p>{description}</p>
    <Divider />
  </>
);

export default PageTitle;
