import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/user/user.service";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const useSubscribe = () => {
    const {user} = useAuth()
  const { mutateAsync } = useMutation(
    "remove autoPayment",
    (userId: any) => UserService.removeAutoPayment(userId),

    {
      onError: () => {
        toast.error("Произошла ошибка, повторите снова");
      },

      onSuccess() {
        toast.success("Автоплатеж отключен");
      },
    }
  );

  const onSubmit = async (userId: string) => {
    await mutateAsync(userId);
  };

  return { onSubmit };
};
