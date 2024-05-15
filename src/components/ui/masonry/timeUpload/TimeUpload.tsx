import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Импорт модуля для использования метода fromNow
import "dayjs/locale/ru";
import { Calendar } from "@/components/common/icons/Calendar";

// Регистрация модуля
dayjs.extend(relativeTime);
// Устанавливаем локаль
dayjs.locale("ru");

const TimeUpload: FC<{ date: string; withIcon: boolean }> = ({
  date,
  withIcon,
}) => {
  const formattedDate = dayjs(date).fromNow();

  return (
    <div className="flex items-center ">
      {withIcon && (
        <div className="w-[13px] mr-2">
          <Calendar />
        </div>
      )}
      <p className=" text-base">Опубликовано {formattedDate}</p>
    </div>
  );
};

export default TimeUpload;
