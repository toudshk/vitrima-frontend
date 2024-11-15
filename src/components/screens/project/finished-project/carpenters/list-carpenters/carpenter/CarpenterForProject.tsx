"use client";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Controller, useForm } from "react-hook-form";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { Meta } from "@/utils/meta";
import Field from "@/components/ui/Form-elements/Field";
import "react-dadata/dist/react-dadata.css";
import { AddressSuggestions } from "react-dadata";
import styles from '../../../add-designer/AddDesigner.module.scss'
import Link from "next/link";
import MainButton from "@/components/ui/Button/MainButton";
import { IDesignerInput } from "../../../add-designer/IDesingerInput";
import { ICarpenterInput } from "../add-carpenter/ICarpetnerInput";
import { useEditCarpenter } from "./UseEditCarpenter";

const CarpenterForProject: NextPageAuth = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<ICarpenterInput>({
    mode: "onChange",
  });
  
  const { onSubmit} = useEditCarpenter(setValue);
  return (
    <Meta title="Personal info">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Field
          {...register("title")}
          placeholder="Название студии или ФИО дизайнера"
          error={errors.title}
        />
          <Field
          {...register("phoneNumber")}
          placeholder="Контактный телефон"
          error={errors.phoneNumber}
        />
         <Field
          {...register("email")}
          placeholder="Почта"
          error={errors.email}
        />
         <Field
          {...register("address")}
          placeholder="Юр адрес для жалоб"
          error={errors.address}
        />
       
       <Field
          {...register("linkToPortfolio")}
          placeholder="Ссылка на портфолио"
          error={errors.linkToPortfolio}
        />
        <Field
          {...register("price")}
          placeholder="Стоимость работ с учетом нашего процента"
          error={errors.price}
        />

<Field
          {...register("orderedItems")}
          placeholder="Заказываемые позиции"
          error={errors.orderedItems}
        />
        <Field
          {...register("timeProduction")}
          placeholder="Сроки изготовления"
          error={errors.timeProduction}
        />
          <Field
          {...register("materials")}
          placeholder="Из каких материалов будет изготовлено"
          error={errors.materials}
        />
       

        <div className="w-full flex justify-end">
          <MainButton className={styles.button}>Обновить</MainButton>
        </div>
      </form>
  
    </Meta>
  );
};
export default CarpenterForProject;
