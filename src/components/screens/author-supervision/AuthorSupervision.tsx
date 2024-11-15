"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import ApplicationFormsItem from "./application-forms/ApplicationFormsItem";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useProjectForm } from "./useProjectForm";
import styles from "./AuthorSupervision.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChat, setCurrentChat } from "@/store/chat/chat.slice";
import { useUserInfo } from "../chat/useUserInfo";
import { useAuth } from "@/hooks/useAuth";
import { Message } from "../chat/message/Message";
import MessageField from "../chat/MessageField";
import { useMessages } from "../chat/useMessage";
import SocketApi from "@/api/socket";
import clsx from 'clsx';
import Link from "next/link";
import VideoCall from "./video-call/VideoCall";
import PhoneIcon from "@mui/icons-material/Phone";
import { IApplicationForm } from "@/components/shared/types/applicationForm";
import { IProject } from "@/components/shared/types/project.types";
const AuthorSupervision: FC = () => {
  const currentChat = useSelector(selectCurrentChat);
  const dispatch = useDispatch();

  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [openVideoCall, setOpenVideoCall] = useState(false);

  const { data, isLoading } = useProjectForm();

  const [currentAppWork, setCurrentAppWork] = useState<IProject>();

  let friendId: any;
  if (currentChat && currentChat.members) {
    friendId = currentChat.members.find((m: any) => m !== user?._id);
  }
  const { data: friendData } = useUserInfo(friendId);

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on("client-path", (data) => {
      setArrivalMessage({
        chatId: data.chatId,
        sender: data.sender,
        receiverId: friendId,
        text: data.text,
        createdAt: Date.now(),
        status: "sent",
      });
    });
  }, []);

  const { data: messageData } = useMessages(currentChat?._id);
  useEffect(() => {
    if (messageData && messageData.length) {
      setMessages(messageData); // Обновляем только когда данные есть
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

  useEffect(() => {
    const scrollElement = scrollRef.current as HTMLElement | undefined;

    if (scrollElement) {
      scrollElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChatItemClick = (chat: any, item: any) => {
    dispatch(setCurrentChat(chat));
    setCurrentAppWork(item);
  };
console.log(currentAppWork)
  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        {isLoading ? (
          <SkeletonLoader count={1} height={48} className="mt-4" />
        ) : (
          data!.map((item: any) => (
            <button
              key={item._id}
              // href={`author-supervision/room/${item?.chatId?._id}`}
              onClick={() => handleChatItemClick(item.chatId, item)}
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
                <button
                  onClick={() => setOpenVideoCall(true)}
                  className={styles.callButton}
                >
                  <PhoneIcon />
                </button>
              )}
            </div>
            {currentAppWork?.applicationForm && (
              <div className={styles.workBlock}>
                Данные клиента:{" "}
                <p>
                  {currentAppWork?.applicationForm.location}, комментарий:
                  {currentAppWork?.applicationForm.description}
                </p>
              </div>
            )}

            {currentChat ? (
              <>
                <div className={clsx(styles.chatBoxTop, currentAppWork && styles.chatBotTopLong)}>
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
                    <VideoCall
                      chatId={currentChat._id}
                      setOpenVideoCall={setOpenVideoCall}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noConversationText}>
                {/* <span>Выберите чат</span> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSupervision;
