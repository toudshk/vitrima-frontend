import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import { getWorkUrl } from "@/config/api.config";
import { getAdminUrl } from "@/config/url.config";
import { useAuth } from "@/hooks/useAuth";
import { WorkService } from "@/services/work/work.service";
import generateSlug from "@/utils/generateSlug";
import { getKeys } from "@/utils/object/getKeys";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import toast from 'react-hot-toast';


export const useWorks = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const workId = String(searchParams.get("id"));
 

  const { mutateAsync } = useMutation(
    "create work",
    async (data: IWorkEditInput) => {
      const updatedData: IWorkEditInput = {
        ...data,
        contractorId: user?._id as string,
        slug:    generateSlug(data.title)
             
      };

      try {
        await WorkService.create(updatedData);
        toast.success("Работа опубликована")
     
        router.push(`profile/${user?._id}`)
      } catch (error: any) {
        toast.error(error.response.data.message)
     
       
      }
    }
  );

  const onSubmit: SubmitHandler<IWorkEditInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit };
};
