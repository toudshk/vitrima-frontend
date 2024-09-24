"use client";
import AdminHeader from "@/components/ui/Admin-table/AdminHeader";
import { FC, useState } from "react";
import AdminTable from "@/components/ui/Admin-table/AdminTable/AdminTable";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { Controller, useForm } from "react-hook-form";
import Field from "@/components/ui/Form-elements/Field";
import { ISubTypeEditInput } from "./edt-subtype.interface";
import { useSubtype } from "./UseSubtype";
import UploadField from "@/components/ui/Form-elements/upload-fields/UploadFields";
import { useTypeWorks } from "@/components/screens/add-work/useTypeWork";
import SecondButton from "@/components/ui/Button/SecondButton";

const SubTypeList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync, onSubmit } =
    useSubtype();

    const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<ISubTypeEditInput>({
    mode: "onChange",
  });

  const [creating, setCreating] = useState(false);
  const [imageIsUpload, setImageIsUpload] = useState(false);
  const handleCreateClick = () => {
    setCreating(true);
  };

  return (
    <div className="max-w-[1736px] mx-10">
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
      <button
        onClick={handleCreateClick}
        className=" mt-6 text-3xl border border-gray-600 p-2 rounded-xl hover:border-gray-400 hover:text-gray-400 transition  duration-300 ease-in-out"
      >
        Добавить стиль
      </button>

      {creating && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? (
              <SkeletonLoader count={3} />
            ) : (
              <div className="flex mt-12 ">
                <div className="flex mr-16">
                  <Field
                    {...register("title", {
                      required: "Стиль",
                    })}
                    placeholder="Название"
                    error={errors.title}
                    style={{
                      width: "150%",
                      border: "none",
                      borderBottom: "1px solid #EAEAEA",
                      borderRadius: "0px",
                      marginRight: "60px",
                    }}
                  />
                  <Controller
                    name="image"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        setImageIsUpload={setImageIsUpload}
                        placeholder="Фотография"
                        error={error}
                        folder="default"
                        image={value}
                        onChange={onChange}
                        title={""}
                      />
                    )}
                    rules={{
                      required: "Фотография обязательна",
                    }}
                  />
                 
                  <Field
                    {...register("description", {
                      required: "Описание",
                    })}
                    placeholder="Описание"
                    error={errors.title}
                    style={{
                      width: "150%",
                      border: "none",
                      borderBottom: "1px solid #EAEAEA",
                      borderRadius: "0px",
                      marginRight: "60px",
                    }}
                  />
                   <Controller
                    name="workTypeId"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <div className="flex">
                        {workTypes?.map((item) => (
                          <SecondButton
                            key={item._id}
                            onClick={() => {
                              field.onChange(item._id);
                            
                            }}
                            className="border-2 p-2 "
                          >
                            {item.title}
                          </SecondButton>
                        ))}
                      </div>
                    )}
                  />
                </div>
           
              </div>
            )}
          </form>
        </div>
      )}
      <AdminTable
        tableItems={data || []}
        headerItems={["Название", "Фотография", "Описание", "Тип работы"]}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};

export default SubTypeList;
