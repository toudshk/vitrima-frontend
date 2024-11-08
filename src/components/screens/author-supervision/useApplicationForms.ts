"use client";

import { useMemo } from "react";
import { useQuery } from "react-query";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { ApplicationFormService } from "@/services/application-form/applicationForm.service";
export const useApplicationForm = () => {
  const queryData = useQuery(
    ["application form list"],
    () => ApplicationFormService.getAll(),
    {
      select: ({ data }) => data
        
      
    }
  );

  return useMemo(
    () => ({
      ...queryData,
    }),
    [queryData]
  );
};
