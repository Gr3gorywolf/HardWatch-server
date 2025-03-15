import {  Loader } from 'lucide-react';
import { FC } from 'react';

interface props {
  children: React.JSX.Element;
  header?: React.JSX.Element;
  isLoading?: boolean;
  canGoBack?: boolean;
}

export const Page: FC<props> = ({
  children,
  isLoading = false,
  header
}) => {
  return (
    <div className="min-h-screen bg-[#212121] text-white">
     {header && header}
      <main className="container mx-auto p-4">
        {isLoading ? <Loader /> : children}
      </main>
    </div>
  );
};
