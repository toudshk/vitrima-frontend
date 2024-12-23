import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import toast from 'react-hot-toast';

import { useAuth } from "@/hooks/useAuth";
import { FeedbackService } from "@/services/feedback/feedback.service";

export const useFeedback = () => {
  const { user } = useAuth();
  const { mutateAsync: createAsync } = useMutation(
    "create Feedback",
    async (description: any) => {
      console.log(description);
      const updatedData = {
        description: description.feedback,
        userId: user?._id,
        userEmail: user?.email
      };
      try {
        await FeedbackService.createFeedback(updatedData);
        toast.success("Спасибо за сообщение, мы обязательно прислушаемся!");
      } catch (error) {}
    }
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = async (data: any) => {
    await createAsync(data);
  };

  return useMemo(
    () => ({
      onSubmit,
    }),
    [onSubmit]
  );
};
