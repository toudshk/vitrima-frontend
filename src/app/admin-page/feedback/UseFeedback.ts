"use client";

import { useMemo } from "react";
import { useQuery } from "react-query";
import { FeedbackService } from "@/services/feedback/feedback.service";
export const useFeedback = () => {
  const queryData = useQuery(["feedback list"], () => FeedbackService.getAll());

  return useMemo(
    () => ({
      ...queryData,
    }),
    [queryData]
  );
};
