"use client";

import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTypeWorks } from "../useTypeWork";

interface IWorkTypeBlock {
  setSelectedItem: any;
  control: any;
}

const WorkTypeBlock: FC<IWorkTypeBlock> = ({ setSelectedItem, control }) => {
  const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();
  return (
    <>
      <Controller
        name="workType"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <ToggleButtonGroup
            sx={{ height: "60px", marginTop: "20px" }}
            color="primary"
            value={field.value}
            exclusive
            onChange={(event, value: string) => {
              const selectedWorkType =
                workTypes?.find((item) => item._id === value) ?? null;

              field.onChange(selectedWorkType);
              setSelectedItem(selectedWorkType);
            }}
            aria-label="Platform"
          >
            {workTypes?.map((item) => (
              <ToggleButton
                value={item._id}
                key={item._id}
                sx={{ borderRadius: "12px" }}
              >
                {item.title}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />
    </>
  );
};

export default WorkTypeBlock;
