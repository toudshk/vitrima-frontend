"use client";

import { useMemo } from "react";
import { useQuery } from "react-query";
import { FeedbackService } from "@/services/feedback/feedback.service";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
export const useFeedback = () => {

  const queryData = useQuery(
    ["feedback list", ],
    () => FeedbackService.getAll(),
    {
      select: ({ data }) =>
        data.map((feedback: any) => ({
          _id: feedback._id,
          items: [feedback.description,  convertMongoDate(feedback.createdAt)]
        })),
      onError(error) {
        console.log(error, "tag list");
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



