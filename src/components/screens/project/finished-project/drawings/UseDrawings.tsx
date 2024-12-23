import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import toast from 'react-hot-toast';

import { getKeys } from "@/utils/object/getKeys";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { ProjectService } from "@/services/project/project.service";

// Типизация для данных проекта
interface ProjectData {
  [key: string]: any; // Здесь можно уточнить типы, если известны
}

export const useDrawings = (
  setValue: UseFormSetValue<any> // Типизируем setValue как UseFormSetValue
) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const params = useParams();
  const projectId = params.id;

  // Загрузка данных проекта
  const { data, isLoading } = useQuery({
    queryKey: ["get drawings", projectId],
    queryFn: async () => {
      const userData = await ProjectService.getDrawings(projectId);
      

      return userData;
    },
  });


  // Мутация для обновления чертежей
  const { mutateAsync } = useMutation(
    "updateDrawings",
    (data: any) => ProjectService.updateDrawings(projectId, data),
    {
      onError: () => {
        toast.error("Произошла ошибка при обновлении данных.");
      },
      onSuccess: () => {
        toast.success("Данные успешно обновлены.");
      }
    }
  );

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      // Дополнительная обработка ошибок (если нужно)
    }
  };

  return { onSubmit, isLoading, data };
};
