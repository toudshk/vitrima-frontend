"use client";

import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./WorkTypeBlock.module.scss";
import { useTypeWorks } from "../../add-work/useTypeWork";
interface IWorkTypeBlock {
  setSelectedItem: any;
  control: any;
}

const WorkTypeBlock: FC<IWorkTypeBlock> = ({ setSelectedItem, control }) => {
  const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();
  return (
    <div className={styles.container}>
      <div className={styles.itemsBlock}>
        <h1>Что вас интересует?</h1>

        <Controller
          name="workType"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className={styles.toggleButton}>
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
      {/* <div className={styles.bottomBlock}>
          <p>Подбор дизайнера - бесплатная услуга для вас, где мы находим специалиста под ваши критерии.</p>
        </div> */}
    </div>
  );
};

export default WorkTypeBlock;
