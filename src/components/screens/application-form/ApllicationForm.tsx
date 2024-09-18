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

const DynamicSelect = dynamic(() => import("@/components/ui/Select/Select"), {
  ssr: false,
});
const DynamicSelectForStubType = dynamic(
  () => import("@/components/screens/filter/select-filter/SelectForFilter")
);

const ApplicationForm: FC = () => {
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
    },
  });

  const { onSubmit } = useApplicationForm();
  const { data: purposeTypes, isLoading: isPurposeTypeLoading } =
    useTypePurpose();

  const [selectedSubTypes, setSelectedSubTypes] = useState<string>("");
  const { data: buildingTechniques } = useBuildingTechnique();
  const [currentSubType, setCurrentSubType] = useState<ISubType | null>(null);
  const [selectedItem, setSelectedItem] = useState<IWorkType | null>(null);
  const [imageIsUpload, setImageIsUpload] = useState(false);

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
        return !errors.objectArea;
      case 1:
        return !errors.purposeType;
      case 2:
        return true; // Assuming CustomDatePicker doesn't have validation
      case 3:
        return !errors.minPrice || !errors.maxPrice;
      case 4:
        return !errors.description;
      case 5:
        return !errors.phoneNumber && !errors.email;
      default:
        return true;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        {selectedItem === null ? (
          <WorkTypeBlock setSelectedItem={setSelectedItem} control={control} />
        ) : (
          <div className={styles.form}>
            <div className={styles.mainBlock}>
              {step === 0 && (
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
              )}

              {step === 1 && (
                <>
                  <p className="text-3xl font-bold mb-4">Назначение</p>
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
                  <p className="text-3xl font-bold mb-4">Стили</p>

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
                  <Popup
                    isSubTypeLoading={isSubTypeLoading}
                    currentSubType={currentSubType}
                  />

                  {selectedItem &&
                    selectedItem._id === "656c0a67fad5c309cd6a9853" && (
                      <div>
                        <p className="text-3xl font-bold mb-4">
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
                </>
              )}

              {step === 2 && <CustomDatePicker control={control} />}
              {step === 3 && (
                <div>
                  <div>
                    <p className="text-4xl font-bold mb-10">
                      Какую сумму вы готовы выделить для работы?
                    </p>
                  </div>
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
                </div>
              )}
              {step === 4 && (
                <div>
                  <p className="text-4xl font-bold mb-2">
                    Дополнительная информация
                  </p>
                  <textarea
                    {...register("description")}
                    placeholder="Например: мне важно, чтобы у дизайнера был опыт работы с жилими помещеняиями площадью 500 м²"
                    className="border resize-none border-gray-400 rounded-2xl transition-colors focus-within:border-primary h-[170px] text-gray-700 w-full p-2"
                  />
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
                        style={{ maxHeight: "20vh !important" }}
                      />
                    )}
                  />
                </div>
              )}
              {step === 5 && (
                <div className="h-[80%] flex flex-col justify-between">
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
                    <ApplicationFormInput
                      {...register("name", {
                        required: "Заполните поле",
                        
                      })}
                      
                      error={errors.name}
                      title="Ваше имя"
                    />
                    <div className="my-4">
                      <p>
                        Подбор занимает от 1 до 10 дней, после чего мы с вами
                        свяжемся и отправим подборку на указанную почту
                      </p>
                      <p>
                        Мы вручную ищем дизайнеров и архитекторов исходя из ваших данных как на нашей платформе, так на сторонних ресурсах </p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p>
                      Нажимая на кнопку отправить, вы соглашаетесь с{" "}
                      <a href="/documents" className="underline">Политикой конфиденциальности</a> и
                      даете согласие на обработку своих персональных данных
                    </p>
                  </div>
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
                  <MainButton
                    onClick={nextStep}
                    disabled={!isStepValid(step)}
                    type="button"
                  >
                    Продолжить
                  </MainButton>
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
