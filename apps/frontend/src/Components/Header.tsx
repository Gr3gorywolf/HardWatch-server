import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import React, { FC } from 'react';

interface props {
  title: string;
  subTitle?: string;
  icon?:  React.JSX.Element;
  handleBack?: () => void;
}

export const Header: FC<props> = ({ subTitle, title, handleBack, icon }) => {
  return (
    <header className="bg-[#2a2a2a] p-4 shadow-md">
      <div className="container mx-auto">
        {handleBack && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-2 text-white hover:bg-[#4caf50]/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <div className="flex flex-row gap-3">
          {icon && <div className='h-7 w-7 self-center'>
            {icon}
          </div>}
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{title}</h1>
            {subTitle && <p className="text-sm text-gray-300">{subTitle}</p>}
          </div>
        </div>
      </div>
    </header>
  );
};
