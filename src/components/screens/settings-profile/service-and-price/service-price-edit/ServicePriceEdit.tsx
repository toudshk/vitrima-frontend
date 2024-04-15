"use client";

import Field from "@/components/ui/Form-elements/Field";
import { Meta } from "@/utils/meta";
import { FC } from "react";

import formStyles from "@/components/ui/Form-elements/Form.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useServicePriceEdit } from "./useEditServicePrice";
import { IServicePriceEditInput } from "./edit-servicePrice.interface";
import { useForm } from "react-hook-form";

const ServicePriceEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IServicePriceEditInput>({
    mode: "onChange",
  });

  const { isLoading, onSubmit } = useServicePriceEdit(setValue);

  return (
    <Meta title="Редактирование услуг">
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register("title", {
                  required: "Пожалуйста, укажите название",
                })}
                placeholder="Название"
                error={errors.title}
                style={{ width: "31%" }}
                title="Название услуги"
              />

              <Field
                {...register("price", {
                  required: "Пожалуйста, укажите цену",
                  pattern: {
                    value: /^\d+$/,
                    message: "Цена должна быть числом",
                  },
                })}
                placeholder="Цена/м.кв"
                style={{ width: "31%" }}
                title="Цена/м.кв"
              />
            </div>

            <button>Обновить</button>
          </>
        )}
      </form>
    </Meta>
  );
};

export default ServicePriceEdit;
