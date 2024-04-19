import { AuthService } from "@/services/auth/auth.service";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";


export const useResetPassword = () => {

  const { mutateAsync: createAsync } = useMutation(
    "reset password",
    async (email: any) => {
     
      try {
        await AuthService.resetPassword(email);
        toast.success("Письмо на почту отправлено");
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
