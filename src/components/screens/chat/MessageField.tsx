"use client";
import SendIcon from "@mui/icons-material/Send";
import Field from "@/components/ui/Form-elements/Field";
import { useAuth } from "@/hooks/useAuth";
import { useReactQuerySubscription } from "@/hooks/useReactQuerySubscription";
import { MessagesService } from "@/services/messages/messages.service";
import { useParams } from "next/navigation";
import React, { FC, useCallback, useRef, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Chat.module.scss";
import { IconButton } from "@mui/material";
import DynamicInput from "@/components/ui/Dynamic-input/DynamicInput";
interface IMessage {
  chatId: string;
  text: string;
  sender: string;
}
const MessageField: FC<{
  currentChat: any;
  setMessages: any;
  messages: any;
}> = ({ currentChat, setMessages, messages }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState("");
  console.log(newMessage);
  const { user } = useAuth();
  const mutation = useMutation(
    "create message",
    (message: IMessage) => MessagesService.createMessage(message),
    {
      onError(error) {},
      onSuccess(createdMessage) {
        setMessages([...messages, createdMessage]);
        setNewMessage("");
      },
    }
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const message = {
        sender: user!._id,
        text: newMessage,
        chatId: currentChat._id,
      };
      mutation.mutate(message);

      if (inputRef.current) {
        inputRef.current.style.height = '40px';
      }

      // Optionally, you can also clear the input value after submitting the form
      setNewMessage('');
    },
    [newMessage, user, currentChat, mutation, setMessages, messages]
  );

  return (
    <>
      <div className={styles.chatMessageInput}>
        <DynamicInput
          placeholder="Напишите сообщение..."
          inputValue={newMessage}
          setInputValue={setNewMessage}
          inputRef={inputRef}        />
      </div>
      <IconButton
        onClick={handleSubmit}
        disabled={!newMessage.trim()} 
        // Отключить кнопку, если newMessage не содержит никаких символов после удаления пробелов
      >
        <SendIcon className={styles.chatSubmitButton} />
      </IconButton>
    </>
  );
};

export default MessageField;
