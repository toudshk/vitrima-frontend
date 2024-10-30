import MainButton from "@/components/ui/Button/MainButton";
import Image from "next/image";
import React, { FC, useState } from "react";

const ApplicationTableItem: FC<any> = ({ tableItem, removeHandler }) => {
  const [more, setMore] = useState(false);

  // Определяем заголовки для каждого элемента
  const items = [
    "Дата обращения",
    "Тип работы",
    "Площадь объекта",
    "Формат",
    "Дата начала реализ. проекта",
    "Тип строительства",
    "Стили",
    "Дата начала",
    "Дата конец",
    "Мин. цена",
    "Макс. цена",
    "Мин. цена реализации проекта",
    "Макс. цена реализации проекта",
    "Комментарий",
    "Фотографии",
    "Номер",
    "Почта",
    "Назначение",
    "Имя",
    "Местоположение",
  ];
  const images = tableItem.items[10] as string[]; // Assuming images are at index 10

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col gap-2 mb-2">
        {items.slice(0, 3).map((label, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-800 font-semibold">{label}:</span>
            <span className="text-gray-600">{tableItem.items[index]}</span>
          </div>
        ))}
      </div>

      {more && (
        <div className="mt-2 space-y-2">
          {items.map((label, index) => (
            <div
              key={index}
              className="flex justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm"
            >
              <span className="text-gray-800 font-semibold">{label}:</span>
              {label === "Фотографии" ? (
                <div className="flex gap-2">
                  {images && images.length > 0 ? (
                    images.map((imageUrl, i) => (
                      <div key={i} className="relative w-32 h-32">
                        <Image
                          src={imageUrl}
                          alt={`Image ${i + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-600">Нет фотографий</span>
                  )}
                </div>
              ) : (
                <span className="text-gray-600">{tableItem.items[index]}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        {more ? (
          <MainButton onClick={() => setMore(false)}>Скрыть</MainButton>
        ) : (
          <MainButton onClick={() => setMore(true)}>Подробнее</MainButton>
        )}
      </div>
    </div>
  );
};

export default ApplicationTableItem;
