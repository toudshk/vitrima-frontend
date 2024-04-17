"use client";

import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTypeWorks } from "../useTypeWork";
import styles from "./WorkTypeBlock.module.scss";
interface IWorkTypeBlock {
  setSelectedItem: any;
  control: any;
}

const WorkTypeBlock: FC<IWorkTypeBlock> = ({ setSelectedItem, control }) => {
  const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();
  return (
    <div className={styles.container}>
        <div className={styles.itemsBlock}>
      <h1>Какую работу вы хотите опубликовать?</h1>
      <div className={styles.toggleButton}>
        <Controller
          name="workType"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              {workTypes?.map((item) => (
                <button
                  key={item._id}
                  onClick={() => {
                    field.onChange(item);
                    setSelectedItem(item);
                  }}
                  className={styles.button}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        />
      </div>
      </div>
    </div>
  );
};

export default WorkTypeBlock;
