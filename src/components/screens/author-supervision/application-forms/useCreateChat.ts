import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
// Adjust the path accordingly
import { useRouter } from "next/navigation"; // Assuming you are using Next.js
import { ChatsService } from "@/services/chat/chat.service";
import { setCurrentChat } from "@/store/chat/chat.slice";
import { useDispatch } from "react-redux";
import { FC } from "react";
import { ApplicationFormService } from "@/services/application-form/applicationForm.service";
import { toast } from "react-toastify";


export const useChat = (receiverId: string, senderId: string, formId: string, setModalWindow: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutateAsync } = useMutation("create chat for application form", async () => {
 
    try {
      // Check if the chat already exists
    
     
        const newChat = await ApplicationFormService.createChat(receiverId, senderId, formId);
        setModalWindow(false)
        toast.success("Чат создан")
       
      
    } catch (error) {
      console.log(error, "create chat");
    }
  });

  const { handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  return { onSubmit: handleSubmit(onSubmit) };
};
