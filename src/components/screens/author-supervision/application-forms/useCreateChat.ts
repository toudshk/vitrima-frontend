import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation"; 
import { useDispatch } from "react-redux";
import { FC } from "react";
import { toast } from "react-toastify";
import { ProjectService } from "@/services/project/project.service";


export const useChat = (receiverId: string, senderId: string, formId: string, setModalWindow: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutateAsync } = useMutation("create chat for application form", async () => {
 
    try {
      // Check if the chat already exists
    
     
        const newChat = await ProjectService.createChat(receiverId, senderId, formId);
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
