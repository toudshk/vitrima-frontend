"use client";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Controller, useForm } from "react-hook-form";

import styles from "../add-designer/AddDesigner.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { Meta } from "@/utils/meta";
import Field from "@/components/ui/Form-elements/Field";
import "react-dadata/dist/react-dadata.css";
import { AddressSuggestions } from "react-dadata";

import Link from "next/link";
import MainButton from "@/components/ui/Button/MainButton";
import { IDesignerInput } from "../add-designer/IDesingerInput";
import { useBuilder } from "./useBuilder";

const AddDesignerForProject: NextPageAuth = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IDesignerInput>({
    mode: "onChange",
  });
  const { onSubmit, isLoading } = useBuilder(setValue);

  return (
    <Meta title="Personal info">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Field
          {...register("title")}
          placeholder="Название фирмы"
          error={errors.title}
        />
          <Field
          {...register("phone")}
          placeholder="Контактный телефон"
          error={errors.phone}
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
       

        <div className="w-full flex justify-end">
          <MainButton className={styles.button}>Сохранить</MainButton>
        </div>
      </form>
  
    </Meta>
  );
};
export default AddDesignerForProject;
