"use client"; 

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import styles from "./FurnitureDrawings.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import { useFurnitureDrawings } from "../UseFurnitureDrawings";
import UploadFurniturePdf from "./UploadPdfToFurnitureDrawing";
interface FormData {
  drawings: string[];
}

const FurnitureDrawingsForm: React.FC = () => {
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const { onSubmit, isLoading, data } = useFurnitureDrawings(setValue);

  // Отслеживаем текущие чертежи
  const drawings = watch("drawings") || [];

  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  useEffect(() => {
    // Если данные о чертежах загружены, инициализируем состояние с чертежами
    if (data) {
      setPdfUrls(data.drawings || []);
    }
  }, [data]);

  // Обработчик для обновления URL-ов чертежей
  const handleFileChange = (newFiles: string[]) => {
    setPdfUrls(newFiles);
    setValue("drawings", newFiles); // Обновляем состояние формы
  };

  // Обработчик отправки формы
  const onSubmitHandler: SubmitHandler<FormData> = async (formData: any) => {
    await onSubmit(formData.drawings);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className='text-2xl font-bold mx-auto'>Чертежи на проверку</h2>

      {/* Форма для загрузки и отображения чертежей */}
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
        {/* Компонент загрузки PDF */}
        <UploadFurniturePdf
          folder="project-furniture-drawings"
          image={pdfUrls}
          onChange={handleFileChange}
          placeholder="Загрузите чертежи"
          title={""}
        />

        {/* Отображение загруженных чертежей */}
        <div className={styles.drawingsPreview}>
          {pdfUrls.length > 0 ? (
            pdfUrls.map((url, index) => (
              <div key={index} className={styles.previewItem}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Чертеж {index + 1}
                </a>
              </div>
            ))
          ) : (
            <p>Чертежи еще не загружены.</p>
          )}
        </div>

        {/* Кнопка отправки формы */}
        <MainButton
         
        
          disabled={isLoading || isSubmitting}
       
        >
          {isLoading || isSubmitting ? "Загружается..." : "Сохранить изменения"}
        </MainButton>
      </form>
    </div>
  );
};

export default FurnitureDrawingsForm;
