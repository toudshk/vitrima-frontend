"use client";

import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounce";
import { TagService } from "@/services/tag/tag.service";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { SubmitHandler } from "react-hook-form";
import generateSlug from "@/utils/generateSlug";
import { WorkService } from "@/services/work/work.service";
import { ISubTypeEditInput } from "./edt-subtype.interface";

export const useSubtype = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryData = useQuery(
    ["subtype list", ],
    () => WorkService.getAllSubTypes(),
    {
      select: ({ data }) =>
        data.map((subtype: any) => ({
          _id: subtype._id,
          editUrl: getAdminUrl(`tag/edit/${subtype._id}`),
          items: [subtype.title, subtype.image, subtype.description, subtype.workTypeId.title],
        })),
      onError(error) {
        console.log(error, "tag list");
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: createAsync } = useMutation(
    "create tag",
    async (data: ISubTypeEditInput) => {
      try {
        await WorkService.createSubType(data);
        queryData.refetch();
        toast.success("Стиль опубликован");
      } catch (error) {
        toast.error("Ошибка");
      }
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    "delete tag",
    (tagId: string) => TagService.deleteTag(tagId),
    {
      onError(error) {
        console.log(error, "ошибка");
        //toastError(error, 'Delete tag')
      },
      onSuccess() {
        toast.success("Тег удален");

        queryData.refetch();
      },
    }
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit: SubmitHandler<ISubTypeEditInput> = async (data) => {
    await createAsync(data);
  };

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      onSubmit
    }),
    [queryData, searchTerm, deleteAsync, onSubmit]
  );
};
