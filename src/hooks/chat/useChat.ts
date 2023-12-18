import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
// Adjust the path accordingly
import { useRouter } from 'next/navigation'; // Assuming you are using Next.js
import { ChatsService } from '@/services/chat/chat.service';

interface CreateChatData {
  receiverId: string;
  senderId: string;
  // Add other necessary fields
}

interface ChatHook {
  onSubmit: SubmitHandler<CreateChatData>;
}

export const useChat: (receiverId: string, senderId: string) => ChatHook = (
  receiverId,
  senderId
) => {
  const router = useRouter();

  const { mutateAsync } = useMutation(
    'create chat',
    async () => {
      const data: CreateChatData = {
        receiverId,
        senderId,
        // Add other necessary fields from your form
      };

      try {
        await ChatsService.createChat(data);
        // Assuming you want to redirect to the chat with the created chat ID
        router.push(`/chat`); // Adjust the path accordingly
      } catch (error) {
        console.log(error, 'create chat');
      }
    }
  );

  const { handleSubmit } = useForm();

  const onSubmit: SubmitHandler<CreateChatData> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit: handleSubmit(onSubmit) };
};
