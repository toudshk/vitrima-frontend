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
      select: ({ data }) =>
        data.map((applicationForm: any) => ({
          _id: applicationForm._id,
         
          items: [
            convertMongoDate(applicationForm.createdAt),

            applicationForm.workType.title,
            applicationForm.objectArea,
            applicationForm.buildingTechnique.map(
              (technique: any) => technique.title
            ),

            applicationForm.subTypes.map((subType: any) => subType.title),
            convertMongoDate(applicationForm.startDate),
            convertMongoDate(applicationForm.finishDate),
            applicationForm.minPrice,
            applicationForm.maxPrice,
            applicationForm.description,
            applicationForm.images,
            applicationForm.phoneNumber,
            applicationForm.email,
             applicationForm.purposeType?.title || 'N/A'
          ],
        })),
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
