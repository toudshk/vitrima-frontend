"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ApplicationFormsItem from "./application-forms/ApplicationFormsItem";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useApplicationForm } from "./useApplicationForms";
import styles from "./AuthorSupervision.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChat, setCurrentChat } from "@/store/chat/chat.slice";
import { useUserInfo } from "../chat/useUserInfo";
import { useAuth } from "@/hooks/useAuth";
import { Message } from "../chat/message/Message";
import MessageField from "../chat/MessageField";
import { useMessages } from "../chat/useMessage";
import SocketApi from "@/api/socket";
import Link from "next/link";
import VideoCall from "./video-call/VideoCall";

const AuthorSupervision: FC = () => {
  const dispatch = useDispatch();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [openVideoCall, setOpenVideoCall] = useState(false);
  const { data, isLoading } = useApplicationForm();

  const currentChat = useSelector(selectCurrentChat);

  let friendId: any;
  if (currentChat && currentChat.members) {
    friendId = currentChat.members.find((m: any) => m !== user?._id);
  }
  const { data: friendData } = useUserInfo(friendId);

  // Храним сообщения в состоянии
  const [messages, setMessages] = useState<any>([]);

  // Обработчик клика по элементу чата (для выбора группы)
  const handleChatItemClick = (chat: any) => {
    dispatch(setCurrentChat(chat));
  };

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on("client-path", () => {
      console.log(SocketApi.socket?.id);
    });
  }, [SocketApi.socket]);

  // Загружаем сообщения для текущей группы
  const { data: messageData } = useMessages(currentChat?._id);
  useEffect(() => {
    if (messageData) {
      setMessages(messageData);
    }
  }, [currentChat]);

  // Обновляем сообщения при получении нового
  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev: any) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        {isLoading ? (
          <SkeletonLoader count={1} height={48} className="mt-4" />
        ) : (
          data!.map((item) => (
            <button
              key={item._id}
              // href={`author-supervision/room/${item?.chatId?._id}`}
              onClick={() => handleChatItemClick(item.chatId)}
            >
              <ApplicationFormsItem item={item} />
            </button>
          ))
        )}
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            <div className={styles.chatBlockFriend}>
              <p>{friendData?.data.nickname}</p>
              {friendData && (
                <button onClick={() => setOpenVideoCall(true)}>
                  {" "}
                  видеозвонок{" "}
                </button>
              )}
            </div>

            {currentChat ? (
              <>
                <div className={styles.chatBoxTop}>
                  {messages?.map((message: any) => (
                    <div ref={scrollRef} key={message._id}>
                      <Message
                        message={message}
                        own={message.sender === user?._id}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.chatBoxBottomContainer}>
                  <div className={styles.chatBoxBottom}>
                    <MessageField
                      currentChat={currentChat}
                      messages={messages}
                    />
                  </div>
                </div>
               
                {openVideoCall && (
                  <div className={styles.videoCall}>
                    <VideoCall chatId={currentChat._id}  setOpenVideoCall={setOpenVideoCall}/>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noConversationText}>
                <span>Выберите чат</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSupervision;
