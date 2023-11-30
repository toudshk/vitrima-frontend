import dynamic from "next/dynamic";
import { FC } from "react";
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
// @ts-ignore
import { stripHtml } from "string-strip-html";

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
