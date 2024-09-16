import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./ApplicationForm.module.scss";
import { IWorkType } from "@/components/shared/types/work.types";
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

const DynamicSelect = dynamic(() => import("@/components/ui/Select/Select"), {
  ssr: false,
});

const ApplicationForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<IAddApplicationForm>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
    },
  });
  const { onSubmit } = useApplicationForm();
  const getValue = getValues();

  const { data: purposeTypes, isLoading: isPurposeTypeLoading } =
    useTypePurpose();
  const { data: buildingTechniques } = useBuildingTechnique();
  const [selectedItem, setSelectedItem] = useState<IWorkType | null>(null);
  const [imageIsUpload, setImageIsUpload] = useState(false);
  const {
    data: tags,
    isLoading: isTagsLoading,
    refetch: tagRefetch,
  } = useSelectTags(selectedItem?._id);

  const [step, setStep] = useState(0);
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
  let nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  let prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    // Fetch subtypes whenever selectedItem changes
    if (selectedItem?._id) {
      tagRefetch();
    }
  }, [selectedItem]);

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
                  })}
                  placeholder="0 м²"
                  error={errors.objectArea}
                  title="Площадь объекта"
                />
              )}

              {/* <Controller
                    name="subTypes"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DynamicSelect
                        error={error}
                        field={field}
                        placeholder="Стили"
                        options={subTypes || []}
                        isLoading={isSubTypeLoading}
                        isMulti
                      />
                    )}
                  /> */}
              {step === 1 && (
                <>
                  {/* Поле выбора назначения */}
                  <Controller
                    name="purposeType"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      
                      <><p className="text-3xl font-bold mb-4">
                      Назначение
                    </p>
                      <DynamicSelect
                        error={error}
                        field={field}
                       
                        options={purposeTypes || []}
                        isLoading={isPurposeTypeLoading}
                        isMulti
                      />
                    </>
                    )}

                  />

                  {/* Поле выбора технологии строительства (отображается только при определённом selectedItem) */}
                  {selectedItem &&
                    selectedItem._id === "656c0a67fad5c309cd6a9853" && (
                      <div>
                        <Controller
                          name="buildingTechnique"
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                            <p className="text-3xl font-bold mb-4">
                      Технология строительства
                    </p>
                            <DynamicSelect
                              error={error}
                              field={field}
                              options={buildingTechniques || []}
                              isMulti={false}
                            />
                            </>
                          )}
                        />
                      </div>
                    )}

                  {/* <Controller
                    name="tags"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DynamicSelect
                        error={error}
                        field={field}
                        placeholder="Теги"
                        options={tags || []}
                        isLoading={isTagsLoading}
                        isMulti
                      />
                    )}
                  /> */}
                </>
              )}

              {step === 2 && <CustomDatePicker control={control} />}
              {step === 3 && (
                <div>
                  <div>
                    <p className="text-3xl font-bold mb-4">
                      Какую сумму вы готовы выделить для работы?
                    </p>
                  </div>
                  <div className="flex ">
                    <ApplicationFormInput
                      {...register("minPrice")}
                      placeholder="От 0 ₽"
                      error={errors.minPrice}
                      style={{ marginRight: "10px" }}
                    />

                    <ApplicationFormInput
                      {...register("maxPrice")}
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
                    placeholder="Например: мне важно, чтобы у дизайнера был опыт работы с жилими помещеняиями площадью 500 м² "
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
                      defaultValue=""
                      render={({ field }) => (
                        <ApplicationFormInput
                          {...field}
                          title="Номер телефона"
                          placeholder="Номер телефона"
                          value={field.value}
                          onChange={(e) => {
                            const formattedValue = formatPhoneNumber(
                              e.target.value
                            );
                            // Update the form value with the formatted value
                            setValue("phoneNumber", formattedValue, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      )}
                    />
                    <ApplicationFormInput
                     {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Введите корректный адрес электронной почты"
                      }
                    })}
                      placeholder="Почта"
                      error={errors.email}
                      title="Почта"
                    />
                  </div>

                  <div className="mt-auto">
                    <p>
                      Нажимая на кнопку отправить, вы соглашаетесь с{" "}
                      <a href="/documents">Политикой конфиденциальности</a> и
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
                  <MainButton onClick={() => nextStep()} type="button" >
                    Продолжить
                  </MainButton>
                ) : (
                  <SecondButton >Отправить</SecondButton>
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
