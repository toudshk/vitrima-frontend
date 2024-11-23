"use client";
import { FC, useState } from "react";
import styles from "./FinishedProject.module.scss"; // Подключаем SCSS стили
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFinishedProject } from "./useFinishedProject";
import { useAuth } from "@/hooks/useAuth";
import { ISubType } from "@/components/shared/types/work.types";
const FinishedProject: FC = () => {
  const { user } = useAuth();
  const { data } = useFinishedProject();
  const showChosenDesigners =
    data?.chosenDesigners === null || data?.chosenDesigners;

  const showChosenBuilders =
    data?.chosenBuilders === null || data?.chosenBuilders;

  const showDrawings = data?.drawings === null || data?.drawings;

  const showConstructionManagement = data?.constructionManagement === null;

  const showChosenCarpenter =
    data?.chosenCarpenter === null || data?.chosenCarpenter;

  const services = [
    ...(showChosenDesigners && user?.isAdmin
      ? [
          {
            name: "Выбранные дизайнеры",
            field: "chosenDesigners",
            link: `${data?._id}/add-designer`,
          },
        ]
      : []),

    ...(showChosenBuilders && user?.isAdmin
      ? [
          {
            name: "Выбранные строители",
            field: "chosenBuilders",
            link: `${data?._id}/add-builder`,
          },
        ]
      : []),

    ...(user?.isAdmin
      ? [{ name: "Чат с клиентом", field: "drawings", link: "/chat" }]
      : []),
    ...(showDrawings
      ? [
          {
            name: "Чертежи",
            field: "drawings",
            link: `${data?._id}/drawings`,
          },
        ]
      : []),

    ...(showConstructionManagement && (user?.isInspector || user?.isAdmin)
      ? [
          {
            name: "Авторский надзор",
            field: "constructionManagement",
            link: `${data?._id}/showConstruction-management`,
          },
        ]
      : []),

    ...(showChosenCarpenter && user?.isAdmin
      ? [
          {
            name: "Комплектация",
            field: "chosenCarpenter",
            link: `${data?._id}/carpenters`,
          },
        ]
      : []),
  ];
  console.log(data?.applicationForm);
  return (
    <div className={styles.container}>
      <div className={styles.serviceList}>
        {services.map(({ name, field, link }) => (
          <Link key={name} className={styles.item} href={link}>
            {name}
          </Link>
        ))}
      </div>

      <div className={styles.bottomBlock}>
        Имя заказчика: {data?.applicationForm?.name}, Расположение проекта:{" "}
        {data?.applicationForm?.location}, Номер телефона:{" "}
        {data?.applicationForm?.phoneNumber}, Площадь объекта:{" "}
        {data?.applicationForm?.workType && (
          <>
            Тип проекта: {data?.applicationForm?.workType.title},
          </>
        )}{" "}
        {data?.applicationForm?.objectArea}м²,{" "}
        {data?.applicationForm?.minPrice && (
          <>
            Бюджет на дизайн: {data?.applicationForm?.minPrice} ₽ -{" "}
            {data?.applicationForm?.maxPrice} ₽,
          </>
        )}{" "}
        {data?.applicationForm?.minPriceRealization && (
          <>
            Бюджет на ремонт: {data?.applicationForm?.minPriceRealization} ₽ -{" "}
            {data?.applicationForm?.maxPriceRealization} ₽
          </>
        )}{" "}
        {data?.applicationForm?.format && (
          <>Формат: {data?.applicationForm?.format}</>
        )}
        {data?.applicationForm?.subTypes?.length > 0 && (
          <div className="flex">
            <p>Стили:</p>
            {data.applicationForm.subTypes.map((item: ISubType) => (
              <p key={item._id}>{item.title}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishedProject;
