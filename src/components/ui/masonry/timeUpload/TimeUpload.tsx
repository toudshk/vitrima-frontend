import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Импорт модуля для использования метода fromNow
import "dayjs/locale/ru";
import { Calendar } from "@/components/common/icons/Calendar";

// Регистрация модуля
dayjs.extend(relativeTime);
// Устанавливаем локаль
dayjs.locale("ru");

const TimeUpload: FC<{ date: string }> = ({ date }) => {
  const formattedDate = dayjs(date).fromNow();

  return (
    <div className="flex items-center ">
      <div className="w-[10px]">
        <Calendar />
        </div>
      <p className="ml-2 text-xs">Опубликовано {formattedDate}</p>
    </div>
  );
};

export default TimeUpload;
