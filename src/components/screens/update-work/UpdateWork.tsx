import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import MainButton from "@/components/ui/Button/MainButton";
import Field from "@/components/ui/Form-elements/Field";
import SlugField from "@/components/ui/Form-elements/slug-field/SlugField";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import generateSlug from "@/utils/generateSlug";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import styles from './UpdateWork.module.scss'
import { FC } from "react";
import { useSelectTags } from "../add-work/useSelectTags";
import { useWorkEdit } from "./useWorkEdit";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
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
  
    const { onSubmit, isLoading } = useWorkEdit(setValue);
    const { data: tags, isLoading: isTagsLoading } = useSelectTags();
  
    return (
      <>
        {isLoading ? (
          <SkeletonLoader count={5} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.fields}>
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
                      onChange={onChange} title={""}                  />
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
  
  export default UpdateWork;
  function useSelectTag(): { data: any; isLoading: any } {
    throw new Error("Function not implemented.");
  }