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
const Chat: FC = () => {
  const [chats, setChats] = useState([]); 

  const currentChat = useSelector(selectCurrentChat);

  const dispatch = useDispatch();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const nonEmptyChats = useChats(user?._id);
  console.log(nonEmptyChats.length)
  const sortedChats = nonEmptyChats.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  let friendId = null;
  if (currentChat && currentChat.members) {
    friendId = currentChat.members.find((m: any) => m !== user?._id);
  }
  const { data: friendData } = useUserInfo(friendId);

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on("client-path", (data) => {
      console.log(data);
      setArrivalMessage({
        chatId: data.chatId,
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
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
    // Set the current chat using Redux

    dispatch(setCurrentChat(chat));
    setMenuOpen(!isMenuOpen);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.messenger}>
      <div
        className={clsx(styles.chatMenu, {
          [styles.menuOpen]: isMenuOpen,
        })}
      >
        {/* <h2 className={styles.title}>Собеседники</h2> */}

        {chats.length > 0 ? (
          chats.map((chat: any) => (
            <div onClick={() => handleChatItemClick(chat)} key={chat._id}>
              <ChatItem
                chat={chat}
                currentUser={user!._id}
                currentChat={currentChat}
              />
            </div>
          ))
        ) : (
          <div className="text-center">Нет доступных чатов</div>
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
