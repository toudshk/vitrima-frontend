import { IProjectAddInput } from "./add-project.interface";
import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const useProject = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync } = useMutation(
    "create project",
    async (data: IProjectAddInput) => {
      try {
        console.log(data)
        if (data.chosenDesigners === null) {
          const project = await ProjectService.createProject(data);

          router.push(`/form/${project._id}`);
        } else if (!data.applicantId && !user?._id) {
          toast.error("Пожалуйста, зарегистрируйтесь");

          localStorage.setItem("redirectToProject", "true");
          router.push(`/signup`);
        } else {
          const updatedData = {
            ...data,  
            applicantId: user?._id, // Добавляем applicantId
          };
          console.log(updatedData)
          const project = await ProjectService.createProject(updatedData);
         
          router.push(`/profile/${project.applicantId}`);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  );

  const onSubmit: SubmitHandler<IProjectAddInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit }; // Возвращаем project
};
