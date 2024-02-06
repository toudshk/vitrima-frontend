import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
// Adjust the path accordingly
import { useRouter } from "next/navigation"; // Assuming you are using Next.js
import { ChatsService } from "@/services/chat/chat.service";
import { setCurrentChat } from "@/store/chat/chat.slice";
import { useDispatch } from "react-redux";
import { FC } from "react";


export const useChat = (receiverId: string, senderId: string) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutateAsync } = useMutation("create chat", async () => {
    const data = {
      receiverId,
      senderId,
      // Add other necessary fields from your form
    };

    try {
      // Check if the chat already exists
      const existingChat = await ChatsService.findChatByUserIds(
        senderId,
        receiverId
      );

      if (existingChat) {
        // Redirect to the existing chat
        dispatch(setCurrentChat(existingChat));
        router.push(`/chat`); // Adjust the path accordingly
      } else {
        // Create a new chat
        const newChat = await ChatsService.createChat(data);

        // Set the current chat using Redux
        dispatch(setCurrentChat(newChat));

        // Redirect to the new chat
        router.push(`/chat`); // Adjust the path accordingly
      }
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
