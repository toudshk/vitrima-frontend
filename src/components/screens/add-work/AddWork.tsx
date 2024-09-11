import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddWork.module.scss";
import MainButton from "@/components/ui/Button/MainButton";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import Field from "@/components/ui/Form-elements/Field";
import generateSlug from "@/utils/generateSlug";
import SlugField from "@/components/ui/Form-elements/slug-field/SlugField";
import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import { useWorks } from "./useWorks";
import { useSelectTags } from "./useSelectTags";
import { useTypeWorks } from "./useTypeWork";
import { useSubTypes } from "./useSubTypes";
import { IWorkType } from "@/components/shared/types/work.types";
import SecondButton from "@/components/ui/Button/SecondButton";
import { useBuildingTechnique } from "@/hooks/buildingTechnique/useBuildingTechnique";
import WorkTypeBlock from "./work-type-block/WorkTypeBlock";
import clsx from "clsx";
import { useTypePurpose } from "./usePurposeTypes";
import UploadPdf from "@/components/ui/Form-elements/upload-fields/UploadPdf";
const DynamicSelect = dynamic(() => import("@/components/ui/Select/Select"), {
  ssr: false,
});

const AddWork: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<IWorkEditInput>({
    mode: "onChange",
  });
  const { onSubmit } = useWorks();
  const getValue = getValues()

  const { data: purposeTypes, isLoading: isWorkTypeLoading } = useTypePurpose();
  const { data: buildingTechniques } = useBuildingTechnique();
  const [selectedItem, setSelectedItem] = useState<IWorkType | null>(null);
  const [imageIsUpload, setImageIsUpload] = useState(false)
  const { data: tags, isLoading: isTagsLoading , refetch: tagRefetch} = useSelectTags(selectedItem?._id);
  const {
    data: subTypes,
    isLoading: isSubTypeLoading,
    refetch,
  } = useSubTypes(selectedItem?._id);
  console.log(tags)

  useEffect(() => {
    // Fetch subtypes whenever selectedItem changes
    if (selectedItem?._id) {
      refetch();
      tagRefetch()
    }
  }, [selectedItem]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {selectedItem === null ? (
          <WorkTypeBlock setSelectedItem={setSelectedItem} control={control} />
        ) : (
          <>
            <div className={styles.fields}>
              <div className={styles.mainBlock}>
                <div
                  className={clsx(
                    styles.leftBlock,
                    imageIsUpload === true && styles.smallLeftBlock
                  )}
                >
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
                    rules={{
                      required: "Фотография обязательна",
                    }}
                  />
                </div>
                <div
                  className={clsx(
                    styles.rightBlock,
                    imageIsUpload === true  && styles.show
                  )}
                >
                  <Field
                    {...register("title", {
                      required: "Название обязательно",
                    })}
                    placeholder="Фигурка из дерева"
                    error={errors.title}
                    title="Название работы"
                  />

                  <Field
                    {...register("price", {
                      required: "Цена обязательна",
                    })}
                    placeholder="Ваша цена"
                    title="Цена/м.кв"
                    error={errors.price}
                  />

                  <Controller
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
                  />
                   <Controller
                    name="purposeType"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DynamicSelect
                        error={error}
                        field={field}
                        placeholder="Назначение"
                        options={purposeTypes || []}
                        isLoading={isSubTypeLoading}
                        isMulti
                      />
                    )}
                  />
                  {selectedItem &&
                    selectedItem._id === "656c0a67fad5c309cd6a9853" && (
                      <div className={styles.buildingTechniqueBlock}>
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
                  <div>
                    <p className={styles.titleTextArea}>Описание работы</p>
                    <textarea
                      className={styles.textArea}
                      {...register("description")}
                      placeholder="Расскажите о чём ваша работа"
                      title="Описание работы"
                    />
                  </div>
                  <div>
                  <Controller
                    name="drawings"
                    control={control}
                    defaultValue={[]}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadPdf
                      setImageIsUpload={setImageIsUpload}
                      placeholder="Чертежи"
                      error={error}
                      folder="drawings"
                      image={value}
                      onChange={onChange}
                      title={""}
                      />
                    )}
                    rules={{
                      required: "Фотография обязательна",
                    }}
                  />
                  </div>
                  <SecondButton>Добавить работу</SecondButton>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default AddWork;
