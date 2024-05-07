
import { UserService } from "@/services/user/user.service";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { ISettingsProfileInput } from "./settings.interface";
import { toast } from "react-toastify";
import { getKeys } from "@/utils/object/getKeys";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AuthService } from "@/services/auth/auth.service";

export const useProfile = (
  setValue: any
) => {

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();


  const { isLoading } = useQuery("profile", () => UserService.getProfile(), {
 
    onSuccess({ data }) {
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
    (data: ISettingsProfileInput) => UserService.updateProfile(data),
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

  const onSubmit: SubmitHandler<ISettingsProfileInput> = async (data) => {
    await mutateAsync(data);
  };

  return { isLoading,onSubmit };
};