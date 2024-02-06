"use client";
import SendIcon from "@mui/icons-material/Send";
import Field from "@/components/ui/Form-elements/Field";
import { useAuth } from "@/hooks/useAuth";
import { useReactQuerySubscription } from "@/hooks/useReactQuerySubscription";
import { MessagesService } from "@/services/messages/messages.service";
import { useParams } from "next/navigation";
import React, { FC, useCallback, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Chat.module.scss";
interface IMessage {
  chatId: string
  text: string
  sender: string
}
const MessageField: FC<{
  currentChat: any;
  setMessages: any;
  messages: any;
}> = ({ currentChat, setMessages, messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const send = useReactQuerySubscription();
  const { id } = useParams();
  const { user } = useAuth();
  const mutation = useMutation(
    "create message",
    (message:IMessage ) => MessagesService.createMessage(message),
    {
      onError(error) {
       },
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
    },
    [newMessage, user, currentChat, mutation, setMessages, messages]
  );

  return (
    <>
      <div className={styles.chatMessageInput}>
        <Field
          placeholder="Напишите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
         
        />
      </div>
 
        <SendIcon className={styles.chatSubmitButton} onClick={handleSubmit} fontSize="large" />

    </>
  );
};

export default MessageField;
