import React, { FC, useCallback, useRef, useState } from "react";
import { useMutation } from "react-query";
import styles from "./Chat.module.scss";
import { IconButton } from "@mui/material";
import DynamicInput from "@/components/ui/Dynamic-input/DynamicInput";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@/hooks/useAuth";
import { MessagesService } from "@/services/messages/messages.service";
import socket from "@/api/socket";
import clsx from "clsx";
import UploadFileInMessage from "./file-in-message/FileInMessages";
import UploadPdf from "@/components/ui/Form-elements/upload-fields/UploadPdf";
interface IMessage {
  chatId: string;
  text: string;
  sender: string;
  receiver: string;
  images: string[]; // Добавляем поле для изображений
  drawings: string[];
}

const MessageField: FC<{
  currentChat: any;
  messages: any;
}> = ({ currentChat, messages }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]); // Состояние для изображений
  const [drawings, setDrawings] = useState<string[]>([]);
  const mutation = useMutation(
    "create message",
    (message: IMessage) => MessagesService.createMessage(message),
    {
      onError(error) {
        console.error(error);
      },
      onSuccess(createdMessage) {
        setNewMessage(""); // Очищаем поле после отправки сообщения
        setImages([]); // Очищаем загруженные изображения
        setDrawings([]);
      },
    }
  );

  const filteredMembers = currentChat.members.filter(
    (memberId: string) => memberId !== user!._id
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      if (!newMessage.trim() && images.length === 0) {
        return; // Выход, если нет текста и изображений
      }

      const messageData = {
        text: newMessage,
        chatId: currentChat._id,
        sender: user!._id,
        receiver: filteredMembers[0],
        images: images,
        createdAt: Date.now(),
        drawings: drawings,
      };
      mutation.mutate(messageData);

      if (inputRef.current) {
        inputRef.current.style.height = "40px"; // Сброс высоты текстового поля
      }

      // Очищаем поле ввода и изображения
      setNewMessage("");
    },
    [newMessage, images, user, currentChat, mutation, filteredMembers]
  );

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleDrawingsChange = (newDrawings: string[]) => {
    setDrawings(newDrawings);
  };

  return (
    <>
      <UploadFileInMessage
        setImageIsUpload={() => {}}
        placeholder="Фотография"
        folder="chat-images"
        image={images}
        onChange={handleImagesChange} // Передаем функцию для обновления изображений
        title={""}
      />
      <UploadPdf
        setImageIsUpload={() => {}}
        placeholder="Чертежи"
        folder="chat-drawings"
        image={drawings}
        onChange={handleDrawingsChange}
        title={""}
      />
      <div className='w-full'>
        <DynamicInput
          placeholder="Напишите сообщение..."
          inputValue={newMessage}
          setInputValue={setNewMessage}
          inputRef={inputRef}
          onEnterPress={handleSubmit}
        />
      </div>
      <IconButton
        onClick={handleSubmit}
        disabled={!newMessage.trim() && images.length === 0} // Кнопка отправки активна, если есть текст или изображения
        className={styles.submitButton}
      >
        <SendIcon
          className={clsx(
            newMessage.length === 0 &&
              images.length === 0 &&
              styles.disabledChatSubmitButton,
            styles.chatSubmitButton
          )}
        />
      </IconButton>
    </>
  );
};

export default MessageField;
