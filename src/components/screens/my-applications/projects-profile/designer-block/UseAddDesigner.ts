import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";


export const useAddDesigner = (projectId: string) => {
  const router = useRouter();

  // Mutation для добавления дизайнера в проект
  const { mutateAsync } = useMutation(
    async (designerId: string) => {
      // Асинхронный запрос на добавление дизайнера
      return await ProjectService.addPotentialDesignerForProject(projectId, designerId);
    },
    {
      // Коллбэки на успешное выполнение запроса
      onSuccess: () => {
        toast.success("Дизайнер выбран");
        router.refresh(); // Обновляем данные страницы, если нужно
      },
      onError: (error: any) => {
        // Обработка ошибок
       
        toast.error("Ошибка, повторите позже");
      },
    }
  );

  // Функция для вызова мутации
  const onSubmit = async (designerId: string) => {
    if (!projectId) {
      toast.error("Project ID is missing.");
      return;
    }

    try {
      await mutateAsync(designerId); // Выполняем мутацию с переданным `designerId`
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return { onSubmit };
};