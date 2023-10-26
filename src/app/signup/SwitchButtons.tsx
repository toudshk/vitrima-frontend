import { FC } from 'react'
import clsx from "clsx";
import { SetStateAction, useState } from "react";

interface ISwitchButtons {
  selectedButton: string,
  setSelectedButton: any,
}

const SwitchButtons:FC<ISwitchButtons> = ({selectedButton , setSelectedButton}) => {

   

  const handleButtonClick = (button: SetStateAction<string>) => {
    setSelectedButton(button);
  };
  return (
    <div>
          <button
            className={clsx(
              "rounded-2xl mr-4 py-4 w-[349px] rounded transition duration-300 ease-in-out text-2xl",
              {
                "bg-gray-300 text-gray-600 hover:bg-blue-700":
                  selectedButton === "contractor",
                "bg-primary text-white hover:bg-green-700":
                  selectedButton === "applicant",
              }
            )}
            onClick={() => handleButtonClick("contractor")}
          >
            Я подрядчик
          </button>
          <button
            className={clsx(
              "rounded-2xl py-4 w-[349px] rounded transition duration-300 ease-in-out text-2xl",
              {
                "bg-primary text-white hover:bg-blue-700":
                  selectedButton === "contractor",
                "bg-gray-300 text-gray-600 hover:bg-green-700":
                  selectedButton === "applicant",
              }
            )}
            onClick={() => handleButtonClick("applicant")}
          >
            Я соискатель
          </button>
        </div>
  )
}

export default SwitchButtons