import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import MainButton from "@/components/ui/Button/MainButton";
import Field from "@/components/ui/Form-elements/Field";
import SlugField from "@/components/ui/Form-elements/slug-field/SlugField";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import generateSlug from "@/utils/generateSlug";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import styles from "./UpdateWork.module.scss";
import { FC, useEffect, useState } from "react";
import { useSelectTags } from "../add-work/useSelectTags";
import { useWorkEdit } from "./useWorkEdit";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import SecondButton from "@/components/ui/Button/SecondButton";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { IWorkType } from "@/components/shared/types/work.types";
import { useTypeWorks } from "../add-work/useTypeWork";
import { useBuildingTechnique } from "@/hooks/buildingTechnique/useBuildingTechnique";
import { useSubTypes } from "../add-work/useSubTypes";
//import UploadPdf from "@/components/ui/Form-elements/upload-fields/UploadPdf";
const DynamicSelect = dynamic(() => import("@/components/ui/Select/Select"), {
  ssr: false,
});

const UpdateWork: FC = () => {
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
 let value = getValues()
console.log(value)
  const { onSubmit, isLoading } = useWorkEdit(setValue);
  const { data: tags, isLoading: isTagsLoading } = useSelectTags(value.workType);
  const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();
  const { data: buildingTechniques } = useBuildingTechnique();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [imageIsUpload, setImageIsUpload] = useState(true)
  const {
    data: subTypes,
    isLoading: isSubTypeLoading,
    refetch,
  } = useSubTypes(selectedItem?._id);

  useEffect(() => {
    // Fetch subtypes whenever selectedItem changes
    if (selectedItem?._id) {
      refetch();
    }
  }, [selectedItem]);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader count={5} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fields}>
            <div className={styles.mainBlock}>
              <div className={styles.leftBlock}>
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
              <div className={styles.rightBlock}>
                <Controller
                  name="workType"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <ToggleButtonGroup
                      sx={{ height: "50px"}}
                      color="primary"
                      value={selectedItem?._id || field.value}
                      exclusive
                      onChange={(event, value) => {
                        const selectedWorkType = workTypes?.find(
                          (item) => item._id === value
                        );
                        field.onChange(selectedWorkType);
                        setSelectedItem(selectedWorkType);
                      }}
                      aria-label="Platform"
                    >
                      {workTypes?.map((item) => (
                        <ToggleButton
                          value={item._id}
                          key={item._id}
                          sx={{ borderRadius: "12px", fontSize: "16px" }}
                        >
                          {item.title}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  )}
                />
                {selectedItem &&
                  selectedItem._id === "656c0a67fad5c309cd6a9853" && (
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
                  )}
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
                  title="Цена"
                  error={errors.price}
                />

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

                <div className="mb-6">
                  <p className={styles.titleTextArea}>Описание работы</p>
                  <textarea
                    className={styles.textArea}
                    {...register("description")}
                    placeholder="Расскажите о чём ваша работа"
                    title="Описание работы"
                  />
                </div>
                <div>
                  
                  {/* <Controller
                    name="drawings"
                    control={control}
                    defaultValue={[]}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (

                      <UploadPdf  
                     
                      placeholder="Чертежи"
                      error={error}
                      folder="drawings"
                      image={value || ''}
                      onChange={onChange}
                      title={""}
                      />
                    )}
                    rules={{
                      required: "Фотография обязательна",
                    }}
                  /> */}
                  </div>
          <SecondButton>Редактировать работу</SecondButton>

              </div>
            </div>
          </div>

        </form>
      )}
    </>
  );
};

export default UpdateWork;
function useSelectTag(): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
