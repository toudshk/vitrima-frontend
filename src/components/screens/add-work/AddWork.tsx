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
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSubTypes } from "./useSubTypes";
import { IWorkType } from "@/components/shared/types/work.types";

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

  const { onSubmit, isLoading } = useWorks(setValue);
  const { data: tags, isLoading: isTagsLoading } = useSelectTags();
  const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();

  const [selectedItem, setSelectedItem] = useState<IWorkType | null>(null);
  console.log(selectedItem?._id);
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
            <Controller
              name="workType"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <ToggleButtonGroup
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
                    <ToggleButton value={item._id} key={item._id}>
                      {item.title}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
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
              <Field
                {...register("title", {
                  required: "Название обязательно",
                })}
                placeholder="Фигурка из дерева"
                error={errors.title}
                title="Название работы"
              />
              <SlugField
                generate={() =>
                  setValue("slug", generateSlug(getValues("title")))
                }
                register={register}
                error={errors.slug}
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

              <Field
                {...register("description")}
                placeholder="Расскажите о чём ваша работа"
                error={errors.description}
                title="Описание работы"
              />
            </div>
          </div>

          <MainButton>Update</MainButton>
        </form>
      )}
    </>
  );
};

export default AddWork;
function useSelectTag(): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
