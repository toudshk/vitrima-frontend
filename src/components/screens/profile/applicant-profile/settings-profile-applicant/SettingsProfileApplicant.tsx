"use client";

import { NextPageAuth } from "@/components/shared/types/auth.types";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Meta } from "@/utils/meta";
import styles from "./SettingsProfile.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import MainButton from "@/components/ui/Button/MainButton";

import Field from "@/components/ui/Form-elements/Field";
import { useProfile } from "@/components/screens/settings-profile/useProfile";
import { ISettingsProfileInput } from "@/components/screens/settings-profile/settings.interface";
import UploadAvatar from "@/components/screens/settings-profile/upload-avatar/UploadAvatar";

const SettingsProfileApplicant: NextPageAuth = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<ISettingsProfileInput>({
    mode: "onChange",
  });

  const { isLoading, onSubmit } = useProfile(setValue);

  return (
    <Meta title="Profile">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>Личная информация</p>
        </div>

        <div className={styles.fields}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {isLoading ? (
              <SkeletonLoader count={2} />
            ) : (
              <>
                
                  <Controller
                    name="image"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadAvatar
                        placeholder="Фотография"
                        error={error}
                        folder="image"
                        image={value}
                        onChange={onChange}
                        title={""}
                      />
                    )}
                    rules={{
                      required: "Фотография обязательна",
                    }}
                  />

                  <Field
                  className={styles.nickname}
                    {...register("nickname", {
                      required: "Никнейм обязательно",
                    })}
                    placeholder="Никнейм"
                    error={errors.nickname}
                    title=""
                  />
               
                <Field
                  {...register("email")}
                  placeholder="почта"
                  error={errors.email}
                  title="Почта"
                />
                
              </>
            )}
          
          <button className={styles.button}>Сохранить</button>
          </form>

        </div>
      </div>
    </Meta>
  );
};

export default SettingsProfileApplicant;
