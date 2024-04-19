
import { AuthService } from "@/services/auth/auth.service";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
interface UseNewPasswordProps {
    token: string;
  }
  
  export const useNewPassword = ({ token }: UseNewPasswordProps) => {

  const { mutateAsync: createAsync } = useMutation(
    "new password",
    async (newPassword: any) => {
    let password = newPassword.newPassword
      try {
        await AuthService.newPassword(password, token);
        toast.success("Пароль изменен");
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
