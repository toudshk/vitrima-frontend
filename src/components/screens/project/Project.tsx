"use client";
import { FC, useState } from "react";
import styles from "./Project.module.scss"; // Подключаем SCSS стили
import Link from "next/link";
import { useProject } from "./useProject";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProjectAddInput } from "./add-project.interface";
const Project: FC = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]); 
  const { onSubmit } = useProject(); 

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProjectAddInput>(); 

  // Массив услуг
  const services = [
    { name: "Подбор дизайнера", field: "chosenDesigners" },
    { name: "Подбор строителей", field: "chosenBuilders" },
    { name: "Проверка рабочих чертежей", field: "drawings" },
    { name: "Ведение стройки онлайн", field: "constructionManagement" },
    { name: "Создание комплектации мебели на заказ", field: "chosenCarpenter" },
  ];

  const toggleItem = (serviceName: string, field: string) => {
    const newState = activeItems.includes(serviceName) 
      ? activeItems.filter((item) => item !== serviceName)
      : [...activeItems, serviceName]; 

    setActiveItems(newState);

    const value = newState.includes(serviceName) ? null : undefined;
// @ts-ignore
    setValue(field, value); // Обновляем форму
  };

  // Обработчик отправки формы
  const handleFormSubmit: SubmitHandler<IProjectAddInput> = (data) => {
    onSubmit(data); // Отправляем данные на сервер
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h1 className={styles.title}>
          Выберите услуги, которые также хотите включить в ваш проект
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.serviceList}>
            {services.map(({ name, field }) => (
              <li
                key={name}
                className={`${styles.item} ${activeItems.includes(name) ? styles.activeItem : styles.inactiveItem}`}
                onClick={() => toggleItem(name, field)} // Переключаем активность услуги
              >
                {name}
              </li>
            ))}
          </ul>

      
          <div>
            <h1 className={styles.linkTitle}>
              Подробное описание каждой услуги вы можете прочесть{" "}
              <Link href="/" className="text-gray-400">
                ТУТ
              </Link>
            </h1>
          </div>

          <button type="submit" className="mt-4 btn btn-primary">
            Отправить проект
          </button>
        </form>
      </div>
    </div>
  );
};

export default Project;