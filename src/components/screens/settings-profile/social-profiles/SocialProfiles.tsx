"use client";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Controller, useForm } from "react-hook-form";
import { ISettingsProfileInput } from "../settings.interface";
import { useProfile } from "../useProfile";
import styles from "./SocialProfiles.module.scss";
import { Meta } from "@/utils/meta";
import Field from "@/components/ui/Form-elements/Field";
import "react-dadata/dist/react-dadata.css";
import { AddressSuggestions } from "react-dadata";

import Link from "next/link";

const SocialProfiles: NextPageAuth = () => {
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
    <Meta title="Social profiles">
      <div className={styles.fields}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <>
            <div className={styles.nicknameEmailBlock}>
              <div className={styles.nickname}>
                <Field
                  title="Инстаграм"
                  {...register("socialProfiles.instagram")}
                  error={errors.nickname}
                />
              </div>
              <div className={styles.nickname}>
                <Field
                  title="Телеграм"
                  {...register("socialProfiles.telegram")}
                  error={errors.nickname}
                />
              </div>{" "}
              <div className={styles.nickname}>
                <Field
                  title="Веб-сайт"
                  {...register("socialProfiles.webSite")}
                  error={errors.nickname}
                />
              </div>{" "}
              <div className={styles.nickname}>
                <Field
                  title="ВК"
                  {...register("socialProfiles.vk")}
                  placeholder="Никнейм"
                  error={errors.nickname}
                />
              </div>
            </div>

           
          </>
          <div className="w-full flex justify-end">
            <button className={styles.button}>Сохранить</button>
          </div>
        </form>
      </div>
    </Meta>
  );
};
export default SocialProfiles;
