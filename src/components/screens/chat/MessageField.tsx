import React, { FC, useCallback, useRef, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Chat.module.scss";
import { IconButton } from "@mui/material";
import DynamicInput from "@/components/ui/Dynamic-input/DynamicInput";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@/hooks/useAuth";
import { MessagesService } from "@/services/messages/messages.service";

interface IMessage {
  chatId: string;
  text: string;
  sender: string;
}

const MessageField: FC<{
  currentChat: any;
  
  messages: any;
}> = ({ currentChat, messages }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

  // Assuming that `socket` is a state variable obtained from the socket connection setup.
  // Adjust the type if needed.
  const [socket] = useState<any>(null);

  const mutation = useMutation(
    "create message",
    (message: IMessage) => MessagesService.createMessage(message),
    {
      onError(error) {},
      onSuccess(createdMessage) {
       
        setNewMessage("");
      },
    }
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
   

      // Your existing logic for creating and sending a message using mutation
      const messageData = {
        text: newMessage,

        chatId: currentChat._id,
        sender: user!._id,

        createdAt: Date.now(),
      };
      mutation.mutate(messageData);

      if (inputRef.current) {
        inputRef.current.style.height = "40px";
      }

      // Clear the input value after submitting the form
      setNewMessage("");

      // // Your additional logic for sending a message using socket
      // if (socket && currentChat.members.length > 1) {
      //   const receiverId = currentChat.members.find(
      //     (member: any) => member !== user!._id
      //   );

      //   socket.emit("sendMessage", {
      //     senderId: user!._id,
      //     chatId,
      //     text: newMessage,
      //   });
      // }
    },
    [newMessage, user, currentChat, mutation, messages, socket]
  );

  return (
    <>
      <div className={styles.chatMessageInput}>
        <DynamicInput
          placeholder="Напишите сообщение..."
          inputValue={newMessage}
          setInputValue={setNewMessage}
          inputRef={inputRef}
          onEnterPress={handleSubmit}
        />
      </div>
      <IconButton onClick={handleSubmit} disabled={!newMessage.trim()}>
        <SendIcon className={styles.chatSubmitButton} />
      </IconButton>
    </>
  );
};

export default MessageField;
