
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import toast from 'react-hot-toast';

import { getKeys } from "@/utils/object/getKeys";
import { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { ProjectService } from "@/services/project/project.service";
import { IDesignerInput } from "../add-designer/IDesingerInput";

export const useBuilder = (
  setValue: any
) => {

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();
  const params = useParams()
  
  let projectId = params.id


  const { isLoading } = useQuery("profile", () => ProjectService.getBuilderByProjectId(projectId), {
 
    onSuccess(data) {
      if (!isDataLoaded) { // Проверяем, были ли данные уже загружены
        getKeys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      setIsDataLoaded(true);
    }
  },
    onError: (error) => {
     
    },
  });

  const { mutateAsync } = useMutation(
    "update profile",
    (data: IDesignerInput) => ProjectService.createChosenBuilder(data, projectId),
    {
      onError: () => {
      
        toast.error("Произошла ошибка, повторите снова")
      },
     
      onSuccess(){
   
       
      toast.success('Данные профиля обновлены')
      router.back();
    }
    }
  );

  const onSubmit: SubmitHandler<IDesignerInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit ,isLoading};
};