import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";

import { FileService } from "@/services/file/file.service";

type TypeUpload = (
  onChange: (...event: any[]) => void,
  imageIsUpload?: any,
  folder?: string
) => {
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  imageIsUpload?: any;

  isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, imageIsUpload, folder) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation(
    "upload file",
    (data: FormData) => FileService.upload(data, folder),
    {
      onSuccess({ data }) {
        if (typeof imageIsUpload === 'function') {
          imageIsUpload(true);
        }
        onChange(data[0].url);
      },
      onError(error) {},
    }
  );

  const uploadImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      const files = e.target.files;
      if (files?.length) {
        const formData = new FormData();
        formData.append("image", files[0]);
        await mutateAsync(formData);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    },
    [mutateAsync]
  );
  return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading]);
};
