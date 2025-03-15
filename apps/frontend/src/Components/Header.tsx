import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { FC } from "react";

interface props{
  title: string;
  subTitle?: string;
  handleBack? : () => void,

}

export const Header:FC<props> = ({subTitle, title, handleBack}) =>{
  return (
    <header className="bg-[#2a2a2a] p-4 shadow-md">
        <div className="container mx-auto">
         {handleBack && <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-2 text-white hover:bg-[#4caf50]/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>}
          <h1 className="text-xl font-bold">{title}</h1>
          {subTitle && <p className="text-sm text-gray-300">{subTitle}</p>}
        </div>
      </header>

  )
}
