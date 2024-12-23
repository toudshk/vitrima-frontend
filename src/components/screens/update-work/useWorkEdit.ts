import { IWorkEditInput } from "@/app/add-work/edit-work.interface";
import { useAuth } from "@/hooks/useAuth";
import { WorkService } from "@/services/work/work.service";
import { getKeys } from "@/utils/object/getKeys";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import toast from 'react-hot-toast';


export const useWorkEdit = (setValue: UseFormSetValue<IWorkEditInput>) => {
  const router = useRouter();
  const { user } = useAuth();
  const id = user?._id;
  const params = useParams();

  const workId = String(params.id);

  const { isLoading } = useQuery(
    ["work", workId],
    () => WorkService.getById(workId),
    {
      onSuccess({ data }) {
        // Проверяем, есть ли в данных поле contractorId
        if (data.contractorId) {
          // Устанавливаем значение _id в поле contractorId
          data.contractorId =   data.contractorId._id 
        }

        // Перебираем ключи объекта data и устанавливаем значения
        getKeys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      },
      onError(error) {
        console.log(error, "Get work");
      },
      enabled: !!workId,
    }
  );

  const { mutateAsync } = useMutation(
    "update work",
    (data: IWorkEditInput) => WorkService.update(workId, data),
    {
      onError() {
        toast.error("Ошибка, повторите позже");
      },
      onSuccess() {
        toast.success("Работа обновлена");

        router.push(`/profile/${id}`);
      },
    }
  );

  const onSubmit: SubmitHandler<IWorkEditInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit, isLoading };
};
