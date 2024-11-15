"use client";

import { useMemo } from "react";
import { useQuery } from "react-query";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { ApplicationFormService } from "@/services/application-form/applicationForm.service";
import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
export const useProjectForm = () => {
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
