import { useSupportInfo } from "@/hooks/support/useSupportInfo";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { ApplicationFormService } from "@/services/application-form/applicationForm.service";
import { IAddApplicationForm } from "@/store/applicationForm/applicationForm.interface";
import { setCurrentChat } from "@/store/chat/chat.slice";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
export const useApplicationForm = () => {
  const { registerApplicant } = useActions();
  const { user } = useAuth();

  const { data: supportData } = useSupportInfo();
  const router = useRouter();

  const dispatch = useDispatch();

  const { mutateAsync } = useMutation(
    "create application form",
    async (data: IAddApplicationForm) => {
      try {
        await ApplicationFormService.create(data);
        toast.success("Заявка отправлена, ожидайте");
        // dispatch(
        //   setCurrentChat({ members: [supportData?._id, user?._id] })
        // );
        router.push(`/`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  );

  const onSubmit: SubmitHandler<IAddApplicationForm> = async (data) => {

    // // Проверяем, есть ли applicantId
    // if (!data.applicantId) {
    //   // Если applicantId отсутствует, выполняем регистрацию пользователя
    //   const registrationResponse = await registerApplicant({
    //     email: data.email,
    //     password: data.password,
    //     nickname: data.name,
    //   });

    //   if (registrationResponse) {
    //     // @ts-ignore
    //     data.applicantId = registrationResponse.payload.user._id;
    //   } else {
    //     toast.error("Не удалось зарегистрировать пользователя");
    //     return; // Останавливаем выполнение, если регистрация не удалась
    //   }
    // }

    // После успешной регистрации или если applicantId уже был, вызываем mutateAsync
    await mutateAsync(data);
  };

  return { onSubmit };
};
