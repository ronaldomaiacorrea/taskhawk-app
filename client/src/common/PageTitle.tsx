import { Divider } from "primereact/divider";
import React from "react";

export interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => (
    <>
      <h1 className="text-3xl font-bold py-2">{children}</h1>
      <Divider />
    </>
  );

export default PageTitle;
