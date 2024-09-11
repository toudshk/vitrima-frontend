
import { useAuth } from "@/hooks/useAuth";
import { ApplicationFormService } from "@/services/application-form/applicationForm.service";
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface";
import { getKeys } from "@/utils/object/getKeys";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export const useApplicationForm = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const workId = String(searchParams.get("id"));
 

  const { mutateAsync } = useMutation(
    "create application form",
    async (data: IAddApplicationForm) => {
    
      try {
        await ApplicationFormService.create(data);
        toast.success("Отправлено")
     
        router.push(`select-feed`)
      } catch (error: any) {
        toast.error(error.response.data.message)
     
       
      }
    }
  );

  const onSubmit: SubmitHandler<IAddApplicationForm> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit };
};
