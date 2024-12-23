
import { ProjectService } from "@/services/project/project.service";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";

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
