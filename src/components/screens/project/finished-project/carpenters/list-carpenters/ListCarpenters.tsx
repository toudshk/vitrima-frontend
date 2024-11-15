"use client";
import React, { FC } from "react";
import { useListCarpenter } from "./useCarpenter";
import Link from "next/link";
import { ICarpenter } from "@/components/shared/types/project.types";
const ListCarpenters: FC = () => {
  const { data } = useListCarpenter();
  return (
    <div className="mt-[10vh] max-w-[1440px] mx-auto px-2">
      <Link
        href={`carpenters/add-carpenter`}
        className="mb-4 bg-blue-500 rounded-xl text-white p-2"
      >
        Добавть производителей
      </Link>

      <div className="w-full">
        {!data ? (
          <div>производителей нет</div>
        ) : (
          data.map((item: ICarpenter) => {
            return (
              <div
                key={item?._id}
                className="border border-gray-600 rounded-xl w-full p-2 my-4"
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <p>Название компании:</p>
                    <p>Что заказываем:</p>
                    <p>Цена производства:</p>
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p>{item.orderedItems}</p>
                    <p>{item.price}</p>
                  </div>{" "}
                </div>
                <Link
                  href={`carpenters/${item?._id}`}
                  className="border border-gray-300 p-2 rounded-xl "
                >
                  Подробнее
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListCarpenters;
