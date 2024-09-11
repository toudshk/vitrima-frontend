"use client";
import AdminHeader from "@/components/ui/Admin-table/AdminHeader";
import { Meta } from "@/utils/meta";
import { FC, useState } from "react";
import { useTags } from "./UseTags";
import AdminTable from "@/components/ui/Admin-table/AdminTable/AdminTable";
import SecondButton from "@/components/ui/Button/SecondButton";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { ITagEditInput } from "./edit-tage.interface";
import { Controller, useForm } from "react-hook-form";
import Field from "@/components/ui/Form-elements/Field";
import WorkTypeBlock from "@/components/screens/add-work/work-type-block/WorkTypeBlock";
import { IWorkType } from "@/components/shared/types/work.types";
import { useTypeWorks } from "@/components/screens/add-work/useTypeWork";

const TagList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync, onSubmit } =
    useTags();

  const { data: workTypes, isLoading: isWorkTypeLoading } = useTypeWorks();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<ITagEditInput>({
    mode: "onChange",
  });


  const [creating, setCreating] = useState(false);

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
        Добавить тег
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
                      required: "Укажите тег",
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
                    name="workType"
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
        headerItems={["Email"]}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};

export default TagList;
