import React, { FC, useCallback, useRef, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Chat.module.scss";
import { IconButton } from "@mui/material";
import DynamicInput from "@/components/ui/Dynamic-input/DynamicInput";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@/hooks/useAuth";
import { MessagesService } from "@/services/messages/messages.service";
import socket from "@/api/socket";
import clsx from 'clsx'
import SocketApi from "@/api/socket";

interface IMessage {
  chatId: string;
  text: string;
  sender: string;
  receiver: string
}

const MessageField: FC<{
  currentChat: any;

  messages: any;
}> = ({ currentChat, messages }) => {
  
  // SocketApi.createConnection();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();

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

  const filteredMembers = currentChat.members.filter(
    (memberId: string) => memberId !== user!._id
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      if (!newMessage.trim()) {
        return; // Exit early if the message is empty or contains only whitespace
      }
     

      // Your existing logic for creating and sending a message using mutation
      const messageData = {
        text: newMessage,
        chatId: currentChat._id,
        sender: user!._id,
        receiver: filteredMembers[0],
        createdAt: Date.now(),
      };
      mutation.mutate(messageData);

      if (inputRef.current) {
        inputRef.current.style.height = "40px";
      }

      // Clear the input value after submitting the form
      setNewMessage("");
    },
    [newMessage, user, currentChat, mutation, messages]
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
      <IconButton  onClick={handleSubmit} disabled={!newMessage.trim()} className={styles.submitButton}>
        <SendIcon className={clsx(newMessage.length === 0 && styles.disabledChatSubmitButton, styles.chatSubmitButton)} />
      </IconButton>
  
    </>
  );
};

export default MessageField;
