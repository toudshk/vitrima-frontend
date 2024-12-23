import { IProjectAddInput } from "./add-project.interface";
import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

export const useProject = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync } = useMutation(
    "create project",
    async (data: IProjectAddInput) => {
     
        const project = await ProjectService.createProject(data);

        router.push(`/form/${project._id}`);
      
    }
  );

  const onSubmit: SubmitHandler<IProjectAddInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit }; // Возвращаем project
};
