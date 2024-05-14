import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { FeedbackService } from "@/services/feedback/feedback.service";
import { PaymentService } from "@/services/payment/payment.service";
import {  useRouter } from "next/navigation";

export const useUnsubscribe = () => {
  const { user } = useAuth()
  const router = useRouter();
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
        await PaymentService.deletePayment(user?._id)
        toast.success("Подписка отменена!");
        router.push(`/profile/${user?._id}`)
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
