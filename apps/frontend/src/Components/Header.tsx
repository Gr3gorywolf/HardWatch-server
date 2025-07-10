import { ArrowLeft, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface props {
  title: string;
  subTitle?: string;
  icon?: React.JSX.Element;
  handleBack?: () => void;
  showLogout?: boolean;
}

export const Header: FC<props> = ({
  subTitle,
  title,
  handleBack,
  icon,
  showLogout,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('appKey');
    navigate('/login');
  };
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
        <div className="flex flex-row gap-3 items-center ">
          {icon && <div className="h-7 w-7 self-center">{icon}</div>}
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{title}</h1>
            {subTitle && <p className="text-sm text-gray-300">{subTitle}</p>}
          </div>
          {showLogout && (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-[#4caf50]/20 flex items-center gap-2 ml-auto"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
