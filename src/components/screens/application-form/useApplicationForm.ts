import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { ApplicationFormService } from "@/services/application-form/applicationForm.service";
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const useApplicationForm = () => {
  const { registerApplicant } = useActions();
  const { user } = useAuth();

  const router = useRouter();


  const { mutateAsync } = useMutation(
    "create application form",
    async (data: IAddApplicationForm) => {
      try {
        await ApplicationFormService.create(data);
        toast.success("Отправлено");
        router.push(`/profile/${user?._id}`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  );

  const onSubmit: SubmitHandler<IAddApplicationForm> = async (data) => {
    // Проверяем, есть ли applicantId
    if (!data.applicantId) {
      // Если applicantId отсутствует, выполняем регистрацию пользователя
      const registrationResponse = await registerApplicant({
        email: data.email,
        password: data.password,
        nickname: data.name,
      });

      if (registrationResponse) {
        // @ts-ignore
        data.applicantId = registrationResponse.payload.user._id;
      } else {
        toast.error("Не удалось зарегистрировать пользователя");
        return; // Останавливаем выполнение, если регистрация не удалась
      }
    }

    // После успешной регистрации или если applicantId уже был, вызываем mutateAsync
    await mutateAsync(data);
  };

  return { onSubmit };
};
