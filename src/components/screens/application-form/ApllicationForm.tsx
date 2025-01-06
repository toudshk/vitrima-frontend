"use client";

import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { Controller, useForm, FormState } from "react-hook-form";
import styles from "./ApplicationForm.module.scss";
import { ISubType, IWorkType } from "@/components/shared/types/work.types";
import SecondButton from "@/components/ui/Button/SecondButton";
import { useApplicationForm } from "./useApplicationForm";
import { useSelectTags } from "../add-work/useSelectTags";
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface";
import ApplicationFormInput from "./application-input/AplicationFormInput";
import Link from "next/link";
import WorkTypeBlock from "./work-type-block/WorkTypeBlock";
import { useSubTypes } from "../add-work/useSubTypes";
import "react-dadata/dist/react-dadata.css";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AddressSuggestions } from "react-dadata";

const ApplicationForm: FC = () => {
  const params = useParams();
  const { user } = useAuth();
  // Ensure params.id is a string or undefined, by accessing the first value of the array if it’s an array.
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  // const { data: projectData } = useFinishedProject();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
    control,
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm<IAddApplicationForm>({
    mode: "onChange",
    defaultValues: {
      location: "",
      phoneNumber: "",
    //   images: [],
      projectId: projectId,
      applicantId: user?._id,
    },
  });
  const value = getValues();
  const DADATA_KEY = "4a9e155a8d8b3989ac9f4a5e58269c44c65f049b";

  const { onSubmit } = useApplicationForm();

  const [selectedItem, setSelectedItem] = useState<IWorkType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [checkbox, setCheckBox] = useState(false);
  const interiorId = "656c0a3cfad5c309cd6a9433";
  const architectureId = "656c0a67fad5c309cd6a9853";
  const typeId =
    selectedItem?._id === "656c0a67fad5c309cd6a9853"
      ? architectureId
      : interiorId;

  const {
    data: subTypes,
    isLoading: isSubTypeLoading,
    refetch: subTypeRefetch,
  } = useSubTypes(typeId);

  const handleLocationChange = (selectedValue: any) => {
    const regionId = selectedValue.data.region_fias_id;
    setSelectedLocation(regionId);
    setValue("location", selectedValue.value);
  };
  const {
    data: tags,
    isLoading: isTagsLoading,
    refetch: tagRefetch,
  } = useSelectTags(selectedItem?._id);

  const formatPhoneNumber = (value: string): string => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "");
    let formatted = "";

    if (digits.length > 0) formatted += "+7 ";
    if (digits.length > 1) formatted += digits.substring(1, 4);
    if (digits.length > 4) formatted += "-" + digits.substring(4, 7);
    if (digits.length > 7) formatted += "-" + digits.substring(7, 9);
    if (digits.length > 9) formatted += "-" + digits.substring(9, 11);

    return formatted;
  };



  useEffect(() => {
    // Fetch subtypes whenever selectedItem changes
    if (selectedItem?._id) {
      tagRefetch();
      subTypeRefetch();
    }
  }, [selectedItem]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[86vh]  max-[600px]:h-[calc(100vh - 60px)] "
      >
        {selectedItem === null ? (
          <WorkTypeBlock setSelectedItem={setSelectedItem} control={control} />
        ) : (
          <div className={styles.form}>
            <div className={styles.mainBlock}>
              <div>
                <div className="flex justify-between ">
                  <div className="text-xl text-gray-500 font-bold">
                    {selectedItem._id === "656c0a3cfad5c309cd6a9433" ? (
                      <div>Интерьер</div>
                    ) : (
                      <div>Архитектура</div>
                    )}
                  </div>
                  {/* <div className="text-xl text-gray-500 font-bold">
                  {Math.round(((step + 1) / 6) * 100)}%
                </div> */}
                </div>

                <div className={styles.topBlock}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: "Заполните поле",
                    }}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <ApplicationFormInput
                        {...field}
                        title="Номер телефона"
                        placeholder="+7"
                        value={field.value}
                        onChange={(e) => {
                          const formattedValue = formatPhoneNumber(
                            e.target.value
                          );
                          setValue("phoneNumber", formattedValue, {
                            shouldValidate: true,
                          });
                        }}
                        error={error}
                      />
                    )}
                  />
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Заполните поле" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <p className="text-4xl font-bold mb-4  max-[600px]:text-2xl max-[600px]:mb-2">
                          Местоположение
                        </p>
                        <AddressSuggestions
                          count={4}
                          inputProps={{
                            placeholder: "Начните вводить город",
                            tabIndex: 0,
                            className: styles.addressInput,
                          }}
                          token={DADATA_KEY}
                          onChange={(newValue) => {
                            handleLocationChange(newValue);
                            field.onChange(newValue!.value); // Обновляем значение в контроллере
                          }}
                          value={field.value}
                          filterFromBound="city"
                          filterToBound="city"
                          filterLocations={[{ country: "россия" }]}
                        />
                      </>
                    )}
                  />
                  <ApplicationFormInput
                    {...register("name", {
                      required: "Заполните поле",
                    })}
                    error={errors.name}
                    title="Ваше имя и отчество"
                  />
                  <ApplicationFormInput
                    {...register("email", {
                      required: "Заполните поле",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Введите корректный адрес электронной почты",
                      },
                    })}
                    placeholder="Почта"
                    error={errors.email}
                    title="Почта"
                  />
                  {!user && (
                    <ApplicationFormInput
                      {...register("password", {
                        required: "Заполните поле",
                        minLength: {
                          value: 6,
                          message: "Пароль должен содержать минимум 6 символов",
                        },
                      })}
                      placeholder="Пароль"
                      error={errors.password}
                      title="Придумайте пароль"
                    />
                  )}
                  <div className="mt-4 mb-16 max-[600px]:text-xs">
                    <p>
                      Нажимая на кнопку отправить, вы соглашаетесь с{" "}
                      <a href="/documents" className="underline">
                        Политикой конфиденциальности
                      </a>{" "}
                      и даете согласие на обработку своих персональных данных.
                    </p>
                    <p>
                      Вас перенаправит на наш чат, где мы сможем отправлять вам
                      варианты. Мы позвоним вам в ближайшее время для уточнения
                      всех необходимых деталей, после чего приступим к подбору.{" "}
                    </p>
                    <p>Спасибо за оставленную заявку!</p>
                  </div>
                </div>
              </div>
              <div className={styles.buttons}>
                <Link href={"/"} className={styles.backLink}>
                  На главную
                </Link>

                <SecondButton disabled={!isValid}>Отправить</SecondButton>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ApplicationForm;
