import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import React, { FC, useEffect, useState } from "react";
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
  projectData: any;
}

const formatDate = (date: Date) => {
  if (!date) return "";
  return dayjs(date).format("D MMM YYYY"); // Форматирование даты как 20 сен. 2024
};

const CustomDatePicker: FC<CustomDatePickerProps> = ({ control, projectData }) => {
  const minDate = new Date(); // Текущая дата

  const [isMobile, setIsMobile] = useState(false);

  // Эффект для отслеживания изменения ширины окна
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // Инициализируем размер окна при монтировании
    handleResize();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Очистка обработчика при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-col justify-start ">
      <div>
        {projectData && projectData.chosenDesigners === null && (
          <>
        <h1 className="text-4xl max-[640px]:text-2xl font-bold mb-10 ">
          Когда дизайнер должен приступить и закончить проект?
        </h1>
        <div className="flex items-center gap-[10px] w-2/3 max-[700px]:w-full">
          <div className="w-full">
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
                      withPortal={isMobile}
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="w-full"> 
            <Controller
              control={control}
              name="finishDate"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <>
                    <p className="text-2xl font-bold mb-4">Конец</p>
                    <DatePicker
                      className="custom-datepicker"
                      calendarClassName="custom-calendar"
                      placeholderText="Дата"
                      locale="ru"
                      minDate={minDate}
                      dateFormat="d MMM yyyy" // Форматирование даты, чтобы совпадало с dayjs
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      withPortal={isMobile}
                    />
                  </>
                );
              }}
            />
          </div>
        </div>
        </>
        )}
      </div>
      {projectData && projectData.chosenBuilders === null && (
        
      <div className="my-10 h-[30vh] max-[700px]:h-[50vh]">
        <h1 className="text-4xl max-[640px]:text-2xl font-bold mb-10 ">
          Как скоро планируете начать ремонт?
        </h1>
        <div className="flex items-center gap-[10px]">
          <div>
            <Controller
              control={control}
              name="startDateRealization"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <DatePicker
                    className="custom-datepicker"
                    calendarClassName="custom-calendar"
                    placeholderText={"Дата"}
                    locale="ru"
                    minDate={minDate}
                    dateFormat="d MMM yyyy" // Форматирование даты, чтобы совпадало с dayjs
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    withPortal={isMobile}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
