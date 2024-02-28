"use client";
import { FC } from "react";
import clsx from "clsx";
import { SetStateAction, useState } from "react";
import styles from "./SwitchButton.module.scss";
interface ISwitchButtons {
  selectedButton: string;
  setSelectedButton: any;
}

const SwitchButtons: FC<ISwitchButtons> = ({
  selectedButton,
  setSelectedButton,
}) => {
  const handleButtonClick = (button: SetStateAction<string>) => {
    setSelectedButton(button);
  };
  return (
    <div>
      <button
        className={clsx(styles.switchButton, {
          "bg-primary text-white hover:bg-green-700":
            selectedButton === "contractor",
          " bg-gray-300 text-gray-600 hover:bg-blue-700":
            selectedButton === "applicant",
        })}
        onClick={() => handleButtonClick("contractor")}
      >
        Я подрядчик
      </button>
      <button
        className={clsx(styles.switchButton, {
          "bg-gray-300 text-gray-600": selectedButton === "contractor",
          " bg-primary text-white  ": selectedButton === "applicant",
        })}
        onClick={() => handleButtonClick("applicant")}
      >
        Я соискатель
      </button>
    </div>
  );
};

export default SwitchButtons;
