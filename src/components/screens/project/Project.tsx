"use client";
import { FC, useState } from "react";
import styles from "./Project.module.scss"; // Подключаем SCSS стили
import Link from "next/link";
import { useProject } from "./useProject";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProjectAddInput } from "./add-project.interface";
import MainButton from "@/components/ui/Button/MainButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const Project: FC = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // Для управления раскрытием описаний
  const { onSubmit } = useProject();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProjectAddInput>();

  // Массив услуг
  const services = [
    {
      name: "Подбор дизайнера",
      field: "chosenDesigners",
      desc: "Подбор дизайнера происходит на основе ваших предпочтений. Для экономии вашего времени, всю работу от отбора претендентов до проверки рабочих чертежей мы берём на себя, после чего,вы делаете выбор из лучших кандидатов, предоставленными нами.",
    },
    {
      name: "Подбор строителей",
      field: "chosenBuilders",
      desc: "Выбор строителей производится основываясь на ваших данных. Мы проверяем кандидатов и их реализованные проекты, после чего соотносим цену и качество услуги каждого строителя. Наш сервис подберёт для вас лучших специалистов.",
    },
    {
      name: "Проверка рабочих чертежей",
      field: "drawings",
      desc: "Рабочие чертежи проходят проверку на соответствие требованиям проекта и оценку полноты рабочей информации. Это способствует более точной реализации проекта.",
    },
    {
      name: "Ведение стройки онлайн",
      field: "constructionManagement",
      desc: "Эта услуга пока находится в разработке...",
    },
    {
      name: "Создание комплектации мебели на заказ",
      field: "chosenCarpenter",
      desc: "Наш сервис предоставляет услугу по подбору производителей мебели для ваших проектов. Фабрики проходят проверку на качество материалов и продуктов, из-за чего срок службы мебели остаётся высоким.",
    },
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

  const toggleDescription = (serviceName: string) => {
    const newState = expandedItems.includes(serviceName)
      ? expandedItems.filter((item) => item !== serviceName)
      : [...expandedItems, serviceName];

    setExpandedItems(newState);
  };

  const handleFormSubmit: SubmitHandler<IProjectAddInput> = (data) => {
    onSubmit(data); // Отправляем данные на сервер
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h1 className={styles.title}>Выбор услуг</h1>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.serviceList}>
            {services.map(({ name, field, desc }) => (
              <button
                key={name}
                type="button"
                className={`${styles.item} ${
                  activeItems.includes(name)
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
              >
                  <div
                    className={styles.itemHeader}
                    onClick={() => toggleItem(name, field)}
                  >
                    {name}
                  </div>
                
              </button>
            ))}
          </div>

          <div className={styles.buttonBlock}>
            <MainButton
              className="w-full border-gray-300 max-w-[600px] h-[80px] "
              type="submit"
              disabled={activeItems.length === 0}
            >
              Продолжить
            </MainButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Project;
