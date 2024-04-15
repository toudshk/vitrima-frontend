"use client";

import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounce";
import { TagService } from "@/services/tag/tag.service";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { ITagEditInput } from "./edit-tage.interface";
import { SubmitHandler } from "react-hook-form";
import generateSlug from "@/utils/generateSlug";

export const useTags = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryData = useQuery(
    ["tag list", debouncedSearch],
    () => TagService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map((tag) => ({
          _id: tag._id,
          editUrl: getAdminUrl(`tag/edit/${tag._id}`),
          items: [tag.title],
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
    async (data: ITagEditInput) => {
      const updatedData = {
        ...data,
        slug: generateSlug(data.title),
      };
      try {
        await TagService.create(updatedData);
        queryData.refetch();
        toast.success("Тег опубликован");
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
  const onSubmit: SubmitHandler<ITagEditInput> = async (data) => {
    await createAsync(data);
  };

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      onSubmit,
    }),
    [queryData, searchTerm, deleteAsync, onSubmit]
  );
};
