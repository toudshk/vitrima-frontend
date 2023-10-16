import { FC } from 'react'
import clsx from "clsx";
import { SetStateAction, useState } from "react";

const SwitchButtons:FC = () => {

    const [selectedButton, setSelectedButton] = useState("button1");

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
                  selectedButton === "button1",
                "bg-primary text-white hover:bg-green-700":
                  selectedButton === "button2",
              }
            )}
            onClick={() => handleButtonClick("button1")}
          >
            Я подрядчик
          </button>
          <button
            className={clsx(
              "rounded-2xl py-4 w-[349px] rounded transition duration-300 ease-in-out text-2xl",
              {
                "bg-primary text-white hover:bg-blue-700":
                  selectedButton === "button1",
                "bg-gray-300 text-gray-600 hover:bg-green-700":
                  selectedButton === "button2",
              }
            )}
            onClick={() => handleButtonClick("button2")}
          >
            Я соискатель
          </button>
        </div>
  )
}

export default SwitchButtons