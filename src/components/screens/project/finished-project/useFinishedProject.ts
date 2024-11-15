
import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export const useFinishedProject = () => {
  const params = useParams()
 let paramId = params.id

 const queryData = useQuery(
  ["get project by id"],
  () => {
      return ProjectService.getProjectById(paramId); 
  },
  {
    select: ( data ) => data, // Извлекаем только нужные данные из ответа
  }
);

  return useMemo(
    () => ({
      ...queryData,
    }),
    [queryData]
  );
};
