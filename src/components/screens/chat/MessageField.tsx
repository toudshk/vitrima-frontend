"use client";
import SendIcon from "@mui/icons-material/Send";
import Field from "@/components/ui/Form-elements/Field";
import { useAuth } from "@/hooks/useAuth";
import { useReactQuerySubscription } from "@/hooks/useReactQuerySubscription";
import { MessagesService } from "@/services/messages/messages.service";
import { useParams } from "next/navigation";
import React, { FC, useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useMessages } from "./useMessage";
import styles from "./Chat.module.scss";
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
    (message) => MessagesService.createMessage(message),
    {
      onError(error) {
        console.log(error, "Create work");
      },
      onSuccess(createdMessage) {
        setMessages([...messages, createdMessage]);
        setNewMessage("");
        console.log("Create work", "create was successful");
      },
    }
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const message = {
        sender: user?._id,
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
      <button className={styles.chatSubmitButton} onClick={handleSubmit}>
        <SendIcon fontSize="large" />
      </button>
    </>
  );
};

export default MessageField;
