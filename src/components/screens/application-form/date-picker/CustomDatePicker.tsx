import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React, { FC, useState } from "react";
import { Controller } from "react-hook-form";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";
registerLocale("ru", ru);

import DatePicker, { registerLocale } from "react-datepicker";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // Для русской локализации

interface CustomDatePickerProps {
  control: any;
}

const formatDate = (date: Date) => {
  if (!date) return "";
  return dayjs(date).format("D MMM YYYY"); // Форматирование даты как 20 сен. 2024
};

const CustomDatePicker: FC<CustomDatePickerProps> = ({ control }) => {
  const minDate = new Date(); // Текущая дата

  return (
    <div  id="third-slide">
      <h1 className="text-4xl max-[640px]:text-2xl font-bold mb-10 ">Когда дизайнер должен приступить и закончить работу?</h1>
      <Controller
        control={control}
        name="startDate"
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <>
              <p className="text-2xl font-bold mb-4">Начало</p>
              <DatePicker
                className="custom-datepicker"
                calendarClassName="custom-calendar"
                placeholderText={"Дата"}
                locale="ru"
                minDate={minDate}
                dateFormat="d MMM yyyy" // Форматирование даты, чтобы совпадало с dayjs
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            </>
          );
        }}
      />

      <Controller
        control={control}
        name="finishDate"
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <>
              <p className="text-2xl font-bold my-4">Конец</p>
              <DatePicker
                className="custom-datepicker"
                calendarClassName="custom-calendar"
                placeholderText="Дата"
                locale="ru"
                minDate={minDate}
                dateFormat="d MMM yyyy" // Форматирование даты, чтобы совпадало с dayjs
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
