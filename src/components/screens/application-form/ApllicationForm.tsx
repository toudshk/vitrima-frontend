import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import Field from "@/components/ui/Form-elements/Field";
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

  let nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  let prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  console.log(step);

  useEffect(() => {
    // Fetch subtypes whenever selectedItem changes
    if (selectedItem?._id) {
      tagRefetch();
    }
  }, [selectedItem]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      <DynamicSelect
                        error={error}
                        field={field}
                        placeholder="Назначение"
                        options={purposeTypes || []}
                        isLoading={isPurposeTypeLoading}
                        isMulti
                      />
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
                            <DynamicSelect
                              error={error}
                              field={field}
                              placeholder="Технология строительства"
                              options={buildingTechniques || []}
                              isMulti={false}
                            />
                          )}
                        />
                      </div>
                    )}

                  <Controller
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
                  />
                </>
              )}

              {step === 2 && (
                <div>
                  <ApplicationFormInput
                    {...register("startDate")}
                    placeholder="Начало "
                    error={errors.finishDate}
                    title="Начало"
                  />

                  <ApplicationFormInput
                    {...register("startDate")}
                    placeholder="Конец "
                    error={errors.finishDate}
                    title="Конец"
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <ApplicationFormInput
                    {...register("minPrice")}
                    placeholder="Мин цена "
                    error={errors.minPrice}
                    title="Мин цена"
                  />

                  <ApplicationFormInput
                    {...register("maxPrice")}
                    placeholder="Макс цена "
                    error={errors.maxPrice}
                    title="Макс цена"
                  />
                </div>
              )}
              {step === 4 && (
                <div>
                  <ApplicationFormInput
                    {...register("description")}
                    placeholder="Подробности "
                    error={errors.description}
                    title="Подробности"
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
                      />
                    )}
                  />
                </div>
              )}
              {step === 5 && (
                <div>
                  <ApplicationFormInput
                    {...register("phoneNumber")}
                    placeholder="Номер телефона "
                    error={errors.phoneNumber}
                    title="Номер телефона"
                  />

                  <ApplicationFormInput
                    {...register("email")}
                    placeholder="Почта"
                    error={errors.email}
                    title="Почта"
                  />
                </div>
              )}
              <div className={styles.buttons}>
                {step > 0 ? (
                  <SecondButton onClick={() => prevStep()} type="button">
                    Назад
                  </SecondButton>
                ) : (
                  <Link href={'/'} className={styles.backLink}>
                  На главную
                </Link>
                )}
                {step < 5 ? (
                  <MainButton onClick={() => nextStep()} type="button">
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
