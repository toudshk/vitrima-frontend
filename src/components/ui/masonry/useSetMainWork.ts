import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import { useWork } from "@/components/screens/profile/contractor-profile/profile-works/useWork";
import { useAuth } from "@/hooks/useAuth";
import { WorkService } from "@/services/work/work.service";
import { getKeys } from "@/utils/object/getKeys";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import toast from 'react-hot-toast';

export const useSetMainWork = (id: any, item: any) => {
  
  const { data } = useWork();
  const mainWorksCount = data?.filter((work) => work.isMainWork).length ?? 0;

  const { mutateAsync } = useMutation("work", async () => {
    if ((mainWorksCount < 2) || item.isMainWork === true) {
      await WorkService.setMainWork(id, item._id);
      window.location.reload();
    }
    else{
      toast.error("Не более 2-ух работ могут быть основными")
    }
  });

  const onSubmit = async () => {
    await mutateAsync();
  };

  return { onSubmit };
};
