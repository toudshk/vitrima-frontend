
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { getKeys } from "@/utils/object/getKeys";
import { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { ProjectService } from "@/services/project/project.service";
import { ICarpenterInput } from "../add-carpenter/ICarpetnerInput";

export const useEditCarpenter = (
  
  setValue: any
  
) => {

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();
  const params = useParams()
  
  let carpenterId = params.carpenterId
console.log(carpenterId)
  const { isLoading, data } = useQuery("get carpenter", () => ProjectService.getCarpenterById(carpenterId), {
 
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
    "update carpenter",
    (data: ICarpenterInput) => ProjectService.updateCarpenter(carpenterId, data),
    {
      onError: () => {
        
        toast.error("Произошла ошибка, повторите снова")
      },
      onSuccess(){

      toast.success('Данные обновлены')
      router.back();
    }
    }
  );

 
  const onSubmit: SubmitHandler<ICarpenterInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit ,isLoading, data};
};