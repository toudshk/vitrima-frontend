"use client";

import { useMemo } from "react";
import { useQuery } from "react-query";
import { FeedbackService } from "@/services/feedback/feedback.service";
export const useFeedback = () => {

  const queryData = useQuery(
    ["feedback list", ],
    () => FeedbackService.getAll(),
    {
      select: ({ data }) =>
        data.map((feedback: any) => ({
          _id: feedback._id,
          items: [feedback.description]
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



