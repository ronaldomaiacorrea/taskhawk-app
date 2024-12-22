import React, { createContext, useEffect, useState } from 'react';

export const ViewPortContext = createContext<number>(0);

interface ViewPortProps {
  children: React.ReactNode;
}

const ViewPortProvider = ({ children }: ViewPortProps) => {
  const [viewPortWidth, setViewPortWidth] = useState<number>(0);

  const handleResize = () => {
    setViewPortWidth(document.documentElement.clientWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ViewPortContext.Provider value={viewPortWidth}>
      {children}
    </ViewPortContext.Provider>
  );
};

export default ViewPortProvider;
