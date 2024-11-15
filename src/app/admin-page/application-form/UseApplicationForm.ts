"use client";

import { useMemo } from "react";
import { useQuery } from "react-query";
import { ProjectService } from "@/services/project/project.service";





export const useApplicationForm = () => {
  const queryData = useQuery(
    ["get projects"],
    () => {
        return ProjectService.getAllProjects(); 
    },
    {
    
      onError(error) {
        console.log(error, "application form list");
      },
    }
  );

  return useMemo(
    () => ({
      ...queryData,
    }),
    [queryData]
  );
};

