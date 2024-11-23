"use client";
import React, { useState, useEffect, FC, useRef } from "react";
import MessageField from "./MessageField";
import { Message } from "./message/Message";
import { useMessages } from "./useMessage";
import { useChats } from "./useChats";
import { useAuth } from "@/hooks/useAuth";
import ChatItem from "./chatItems/ChatItems";
import styles from "./Chat.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChat, setCurrentChat } from "@/store/chat/chat.slice";
import SecondButton from "@/components/ui/Button/SecondButton";
import { redirect } from "next/navigation";
import SocketApi from "@/api/socket";
import { useUserInfo } from "./useUserInfo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useChat } from "../author-supervision/application-forms/useCreateChat";

import { useChat as useCreateChat } from "@/hooks/chat/useChat";
const Chat: FC = () => {
  const [chats, setChats] = useState([]);

  const currentChat = useSelector(selectCurrentChat);

  const dispatch = useDispatch();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { nonEmptyChats, isLoading: isLoadingChats } = useChats(user?._id);

  const sortedChats = nonEmptyChats.sort(
    (a: any, b: any) =>
      new Date(b.lastMessageTime).getTime() -
      new Date(a.lastMessageTime).getTime()
  );

  let friendId: any;
  if (currentChat && currentChat.members) {
    friendId = currentChat.members.find((m: any) => m !== user?._id);
  }
  const { data: friendData } = useUserInfo(friendId);

  const { data: adminData } = useUserInfo("670cd5e6a4253287ebc155d0");

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on("client-path", (data) => {
      setArrivalMessage({
        chatId: data.chatId,
        sender: data.sender,
        receiverId: friendId,
        text: data.text,
        createdAt: Date.now(),
        drawings: data.drawings,
        images: data.images,
        status: "sent",
      });
    });
    SocketApi.socket?.on("user-last-online", (data) => {
      console.log(
        `Пользователь ${data.userId} был в сети последний раз: ${data.lastOnline}`
      );
      // Вы можете отобразить эту информацию в интерфейсе
    });

    // Слушаем обновление статуса пользователя
    SocketApi.socket?.on("user-status", (data) => {
      console.log(
        `Пользователь ${data.userId} сейчас ${
          data.isOnline ? "в сети" : "не в сети"
        }`
      );
    });
  }, []);

  if (!user) {
    redirect("/");
  }

  useEffect(() => {
    if (nonEmptyChats) {
      setChats(nonEmptyChats);
    }
  }, [nonEmptyChats]);

  const { data: messageData } = useMessages(currentChat?._id);

  useEffect(() => {
    if (messageData) {
      setMessages(messageData);
    }
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const scrollElement = scrollRef.current as HTMLElement | undefined;

    if (scrollElement) {
      scrollElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChatItemClick = (chat: any) => {
    dispatch(setCurrentChat(chat));
    setMenuOpen(!isMenuOpen);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const { onSubmit } = useCreateChat(user?._id, "669c8a959afed2548433df0f");
  return (
    <div className={styles.messenger}>
      <div
        className={clsx(styles.chatMenu, {
          [styles.menuOpen]: isMenuOpen,
        })}
      >
        {isLoadingChats ? (
          <SkeletonLoader
            count={4}
            width={"100%"}
            height={80}
            borderRadius={16}
          />
        ) : chats.length > 0 ? (
          sortedChats.map((chat: any) => (
            <div onClick={() => handleChatItemClick(chat)} key={chat._id}>
              <ChatItem
                chat={chat}
                currentUser={user!._id}
                currentChat={currentChat}
              />
            </div>
          ))
        ) : (
          <div>
            <button className="w-full" onClick={onSubmit}>
              <ChatItem
                chat={{ members: [adminData?.data._id, user._id] }}
                currentUser={user!._id}
                currentChat={currentChat}
              />
            </button>
            <div className="text-center">Нет доступных чатов</div>
          </div>
        )}
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxWrapper}>
          <div className={styles.chatBlockFriend}>
            <div className={styles.buttonBlock}>
              <button onClick={handleToggleMenu}>
                <ArrowBackIcon />
              </button>
            </div>
            {friendData?.data.image === undefined ? (
              <Image width={72} height={72} src={baseImage} alt="" />
            ) : (
              <Image
                width={72}
                height={72}
                src={friendData?.data.image}
                alt=""
              />
            )}
            <p>{friendData?.data.nickname}</p>{" "}
          </div>

          {currentChat ? (
            <>
              <div className={styles.chatBoxTop}>
                {friendData?.data._id === adminData?.data._id &&
                messages.length == 0 ? (
                  <div>
                    В этом чате наш специалист будет помогать вам быстро и без
                    нервов
                  </div>
                ) : (
                  messages?.map((message: any) => (
                    <div ref={scrollRef} key={message._id}>
                      <Message
                        message={message}
                        own={message.sender === user?._id}
                      />
                    </div>
                  ))
                )}
              </div>
              <div className={styles.chatBoxBottomContainer}>
                <div className={styles.chatBoxBottom}>
                  <MessageField currentChat={currentChat} messages={messages} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noConversationText}>
              <span>Выберите чат</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
