"use client";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Controller, useForm } from "react-hook-form";
import { ISettingsProfileInput } from "../settings.interface";
import { useProfile } from "../useProfile";
import styles from "./PersonalInfo.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { Meta } from "@/utils/meta";
import Field from "@/components/ui/Form-elements/Field";
import UploadAvatar from "../upload-avatar/UploadAvatar";
import "react-dadata/dist/react-dadata.css";
import { AddressSuggestions } from "react-dadata";

import Link from "next/link";

const PersonalInfo: NextPageAuth = () => {
  const DADATA_KEY = "4a9e155a8d8b3989ac9f4a5e58269c44c65f049b";
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<ISettingsProfileInput>({
    mode: "onChange",
  });
  let userId = getValues("_id");
  const { onSubmit, isLoading } = useProfile(setValue);

  return (
    <Meta title="Personal info">
      <div className={styles.fields}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className={styles.avatar}>
                  <UploadAvatar
                    placeholder="Фотография"
                    error={error}
                    folder="image"
                    image={value}
                    onChange={onChange}
                    title={""}
                    isLoading={isLoading}
                  />
                </div>
              )}
            />
            <div className={styles.nicknameEmailBlock}>
              <div className={styles.nickname}>
                <Field
                  title="Название компании / ФИО"
                  {...register("nickname", {
                    required: "Никнейм обязательно",
                  })}
                  placeholder="Никнейм"
                  error={errors.nickname}
                />
              </div>
              {/* <div className={styles.mail}>
                <Field
                  {...register("email", {
                    required: "почта обязательна",
                  })}
                  placeholder="Почта"
                  error={errors.email}
                  title="Почта"
                />
              </div> */}
            </div>

            <p className="text-xl mb-2 text-primary">
              Регион вашей деятельности
            </p>

            <Controller
              control={control}
              name="location"
              defaultValue="not choose"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <AddressSuggestions
                  count={4}
                  inputProps={{
                    placeholder: "Начните вводить область",
                    className:
                      "border  border-gray-400 w-full px-3 py-3 rounded-2xl transition-colors focus-within:border-primary ",
                  }}
                  token={DADATA_KEY}
                onChange={(newValue) => {
                            // Проверьте данные в консоли
                            onChange(newValue!.value);
                          }}
                          value={value}
                          filterFromBound="city"
                          filterToBound="city"
                          filterLocations={[{ country: "россия" }]}
                />
              )}
            />
          </>
          <p className={styles.titleTextArea}>Описание услуг</p>
          <textarea
            className={styles.textArea}
            {...register("description")}
            placeholder="Напишите ваши услуги, которые вы предоставляете"
            title="Описание услуг"
          />
          {errors.description && errors.description.type === "maxLength" && (
            <p>Описание не должно превышать 200 символов</p>
          )}
            <div className="w-full flex justify-end">
            <button className={styles.button}>Сохранить</button>
          </div>
        </form>
        {/* <Link href={`/unsubscribe`} className="flex items-center justify-center mt-3  text-xl font-bold">
      Отменить подписку
        </Link> */}
      </div>
    </Meta>
  );
};
export default PersonalInfo;
