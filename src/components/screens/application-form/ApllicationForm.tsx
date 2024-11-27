"use client";

import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { Controller, useForm, FormState } from "react-hook-form";
import styles from "./ApplicationForm.module.scss";
import { ISubType, IWorkType } from "@/components/shared/types/work.types";
import SecondButton from "@/components/ui/Button/SecondButton";
import { useBuildingTechnique } from "@/hooks/buildingTechnique/useBuildingTechnique";
import { useApplicationForm } from "./useApplicationForm";
import { useTypePurpose } from "../add-work/usePurposeTypes";
import { useSelectTags } from "../add-work/useSelectTags";
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface";
import ApplicationFormInput from "./application-input/AplicationFormInput";
import MainButton from "@/components/ui/Button/MainButton";
import Link from "next/link";
import WorkTypeBlock from "./work-type-block/WorkTypeBlock";
import CustomDatePicker from "./date-picker/CustomDatePicker";
import UploadField from "./UploadField/UploadField";
import { useSubTypes } from "../add-work/useSubTypes";
import Popup from "./pop-up/PopUp";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import FormatInput from "./formatInput/FormatInput";
import { useProject } from "../project/useProject";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useFinishedProject } from "../project/finished-project/useFinishedProject";
import { Checkbox } from "@mui/material";

const DynamicSelect = dynamic(() => import("@/components/ui/Select/Select"), {
  ssr: false,
});
const DynamicSelectForStubType = dynamic(
  () => import("@/components/screens/filter/select-filter/SelectForFilter")
);

const ApplicationForm: FC = () => {
  const { registerApplicant } = useActions();
  const params = useParams();
  const { user } = useAuth();
  // Ensure params.id is a string or undefined, by accessing the first value of the array if it’s an array.
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: projectData } = useFinishedProject();
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
      phoneNumber: "",
      images: [],
      projectId: projectId,
      applicantId: user?._id,
    },
  });
  const value = getValues();
  const DADATA_KEY = "4a9e155a8d8b3989ac9f4a5e58269c44c65f049b";

  const { onSubmit } = useApplicationForm();
  const { data: purposeTypes, isLoading: isPurposeTypeLoading } =
    useTypePurpose();

  const [selectedSubTypes, setSelectedSubTypes] = useState<string>("");
  const { data: buildingTechniques } = useBuildingTechnique();
  const [currentSubType, setCurrentSubType] = useState<ISubType | null>(null);
  const [selectedItem, setSelectedItem] = useState<IWorkType | null>(null);
  const [imageIsUpload, setImageIsUpload] = useState(false);
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

  const {
    data: tags,
    isLoading: isTagsLoading,
    refetch: tagRefetch,
  } = useSelectTags(selectedItem?._id);
  const [step, setStep] = useState(0);
  const handleLocationChange = (selectedValue: any) => {
    const regionId = selectedValue.data.region_fias_id;
    setSelectedLocation(regionId);
    setValue("location", selectedValue.value);
  };
  const handleSubTypesChange = (selectedValues: any[]) => {
    const selectedIds = selectedValues.map((option) => option.value);
    setSelectedSubTypes(selectedIds.join(","));
  };

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

  const nextStep = async () => {
    const isFormValid = await trigger(); // Явная проверка валидности формы
    if (isFormValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    if (event.target.closest(".custom-select")) {
      event.preventDefault(); // Останавливаем отправку формы для react-select
    }
  };

  useEffect(() => {
    // Fetch subtypes whenever selectedItem changes
    if (selectedItem?._id) {
      tagRefetch();
      subTypeRefetch();
    }
  }, [selectedItem]);

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return !errors.objectArea && !errors.location;
      case 1:
        return !errors.purposeType;
      case 2:
        return true; // Assuming CustomDatePicker doesn't have validation
      case 3:
        return !errors.minPrice || !errors.maxPrice;
      case 4:
        return (
          !errors.description 
        );
      case 5:
        return !errors.phoneNumber && !errors.email;
      default:
        return true;
    }
  };

  const handleCheckboxChange = () => {
    setCheckBox(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className='h-[100vh]'>
        {selectedItem === null ? (
          <WorkTypeBlock setSelectedItem={setSelectedItem} control={control} />
        ) : (
          <div className={styles.form}>
            <div className={styles.mainBlock}>
              <div className="flex justify-between">
                <div className="text-xl text-gray-500 font-bold">
                  {selectedItem._id === "656c0a3cfad5c309cd6a9433" ? (
                    <div>Интерьер</div>
                  ) : (
                    <div>Архитектура</div>
                  )}
                </div>
                <div className="text-xl text-gray-500 font-bold">
                  {Math.round(((step + 1) / 6) * 100)}%
                </div>
              </div>
              {step === 0 && (
                <>
                  <ApplicationFormInput
                    {...register("objectArea", {
                      required: "Заполните поле",
                      pattern: {
                        value: /^\d*\.?\d+$/, // Регулярное выражение для проверки чисел (включая десятичные)
                        message: "Введите корректное значение ",
                      },
                    })}
                    placeholder="0 м²"
                    error={errors.objectArea}
                    title="Площадь объекта"
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
                            // Проверьте данные в консоли
                            handleLocationChange(newValue);
                            field.onChange(newValue!.value); // Обновляем значение в контроллере
                          }}
                          value={field.value}
                          filterFromBound="city"
                          filterToBound="city"
                          filterLocations={[{ country: "россия" }]}
                        />
                        {error && (
                          <div className={styles.error}>{error.message}</div>
                        )}
                      </>
                    )}
                  />{" "}
                  {/* {projectData && projectData.chosenDesigners === null && (
                    <>
                      <p className="text-4xl font-bold my-4  max-[600px]:text-2xl max-[600px]:mb-2">
                        В каком формате потребуется проект
                      </p>
                      <FormatInput control={control} />
                    </>
                  )} */}
                </>
              )}

              {step === 1 && (
                <>
                  <p className="text-3xl font-bold mb-4 max-[600px]:text-2xl max-[600px]:mb-2">
                    Назначение
                  </p>
                  <Controller
                    name="purposeType"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DynamicSelect
                        error={error}
                        field={field}
                        options={purposeTypes || []}
                        isLoading={isPurposeTypeLoading}
                      />
                    )}
                  />
                  {projectData && projectData.chosenDesigners === null && (
                    <>
                      <p className="text-3xl font-bold mb-4 max-[600px]:text-2xl max-[600px]:mb-2">
                        Стили
                      </p>

                      <Controller
                        name="subTypes"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <DynamicSelectForStubType
                            error={error}
                            title={"стиль"}
                            field={field}
                            options={subTypes}
                            isMulti
                            onSelectChange={handleSubTypesChange}
                            setCurrentSubType={setCurrentSubType}
                          />
                        )}
                      />
                    </>
                  )}

                  <Popup
                    isSubTypeLoading={isSubTypeLoading}
                    currentSubType={currentSubType}
                  />

                  {projectData && projectData.chosenBuilders === null && (
                    <div className="flex w-full justify-between">
                      <p className="text-3xl font-bold  max-[600px]:text-2xl max-[600px]:mb-2">
                        Наличие дизайнерского проекта
                      </p>

                      <Controller
                        name="isDesignProject"
                        control={control}
                        render={({ field: props }) => (
                          <Checkbox
                            {...props}
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </div>
                  )}
                </>
              )}

              {selectedItem &&
                selectedItem._id === "656c0a67fad5c309cd6a9853" && (
                  <div>
                    <p className="text-3xl font-bold mb-4 max-[600px]:text-2xl max-[600px]:mb-2">
                      Технология строительства
                    </p>
                    <Controller
                      name="buildingTechnique"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DynamicSelect
                          error={error}
                          field={field}
                          options={buildingTechniques || []}
                          isMulti={false}
                        />
                      )}
                    />
                  </div>
                )}

              {step === 2 && (
                <div className={styles.dateBlock}>
                  <CustomDatePicker
                    control={control}
                    projectData={projectData}
                  />
                </div>
              )}
              {step === 3 && (
                <>
                  <div>
                    <div>
                      <p className="text-4xl max-[640px]:text-2xl font-bold mb-6">
                        Какую сумму вы готовы выделить на
                      </p>
                    </div>{" "}
                    {projectData && projectData.chosenDesigners === null && (
                      <>
                        <p className="text-2xl font-bold mb-4">
                          разработку проекта
                        </p>
                        <div className="flex ">
                          <ApplicationFormInput
                            {...register("minPrice", {
                              required: "Заполните поле",
                            })}
                            type="number"
                            placeholder="От 0 ₽"
                            error={errors.minPrice}
                            style={{ marginRight: "10px" }}
                          />
                          <ApplicationFormInput
                            {...register("maxPrice", {
                              required: "Заполните поле",
                            })}
                            type="number"
                            placeholder="До 0 ₽"
                            error={errors.maxPrice}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {projectData && projectData.chosenBuilders === null && (
                    <div className="mt-10">
                      <div>
                        <p className="text-2xl font-bold mb-4">ремонт</p>
                      </div>
                      <div className="flex ">
                        <ApplicationFormInput
                          {...register("minPriceRealization", {
                            required: "Заполните поле",
                          })}
                          type="number"
                          placeholder="От 0 ₽"
                          error={errors.minPriceRealization}
                          style={{ marginRight: "10px" }}
                        />
                        <ApplicationFormInput
                          {...register("maxPriceRealization", {
                            required: "Заполните поле",
                          })}
                          type="number"
                          placeholder="До 0 ₽"
                          error={errors.maxPriceRealization}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              {step === 4 && (
                <div className={styles.topBlock}>
                  <div className="flex flex-col justify-start">
                    <p className="text-4xl max-[640px]:text-2xl font-bold mb-4 ">
                      Дополнительная информация
                    </p>
                    <textarea
                      {...register("description")}
                      placeholder="Мне важно, чтобы у дизайнера был опыт работы с жилыми помещениями площадью более 500 м²."
                      className={styles.textArea}
                    />{" "}
                  </div>
                  {projectData && projectData.chosenDesigners === null && (
                    <>
                      <p className="text-4xl max-[640px]:text-2xl font-bold my-4">
                        Референсы
                      </p>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                          />
                          <p className="ml-2 ">
                            Если у вас нет референсов, то нажмите на галочку
                          </p>
                        </label>
                      </div>

                      <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <UploadField
                            setImageIsUpload={setImageIsUpload}
                            placeholder="Фотография"
                            error={error}
                            folder="images"
                            image={value}
                            onChange={onChange}
                            title={""}
                            style={{
                              maxHeight: "20vh !important",
                              margin: "5px 0 0",
                            }}
                          />
                        )}
                      />
                    </>
                  )}
                </div>
              )}
              {step === 5 && (
                <div className={styles.topBlock}>
                  <div>
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

                    <ApplicationFormInput
                      {...register("name", {
                        required: "Заполните поле",
                      })}
                      error={errors.name}
                      title="Ваше имя"
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
                            message:
                              "Пароль должен содержать минимум 6 символов",
                          },
                        })}
                        placeholder="Пароль"
                        error={errors.password}
                        title="Придумайте пароль"
                      />
                    )}
                    <div className="my-4 max-[600px]:text-xs">
                      <p>
                        Подбор занимает от 1 до 10 дней, после чего мы с вами
                        свяжемся и отправим подборку на указанную почту
                      </p>
                      <p>
                        Мы вручную ищем дизайнеров и архитекторов исходя из
                        ваших данных как на нашей платформе, так на сторонних
                        ресурсах{" "}
                      </p>
                    </div>
                  </div>
                  {/* <div className="mt-auto mb-12">
                    <p>
                      Нажимая на кнопку отправить, вы соглашаетесь с{" "}
                      <a href="/documents" className="underline">
                        Политикой конфиденциальности
                      </a>{" "}
                      и даете согласие на обработку своих персональных данных
                    </p>
                  </div> */}
                </div>
              )}
              <div className={styles.buttons}>
                {step > 0 ? (
                  <SecondButton onClick={() => prevStep()} type="button">
                    Назад
                  </SecondButton>
                ) : (
                  <Link href={"/"} className={styles.backLink}>
                    На главную
                  </Link>
                )}
                {step < 5 ? (
                  <button
                    className={styles.continueButton}
                    onClick={nextStep}
                    disabled={!isStepValid(step)}
                    type="button"
                  >
                    Продолжить
                  </button>
                ) : (
                  <SecondButton>Отправить</SecondButton>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ApplicationForm;
