import { useAuth } from "@/hooks/useAuth";
import { PaymentService } from "@/services/payment/payment.service";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
export const useSubscribe = () => {
    const {user} = useAuth()
      const router = useRouter();
  const { mutateAsync } = useMutation(
    "remove autoPayment",
    (userId: any) => PaymentService.deletePayment(userId),

    {
      onError: () => {
        toast.error("Произошла ошибка, повторите снова");
      },

      onSuccess() {
        toast.success("Автоплатеж отключен");
        router.push(`/profile/${user!._id}`);
      },
    }
  );

  const onSubmit = async (userId: string) => {
    await mutateAsync(userId);
  };

  return { onSubmit };
};
