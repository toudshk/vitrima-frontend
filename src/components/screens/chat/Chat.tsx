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
// ... (previous imports)
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChat, setCurrentChat } from "@/store/chat/chat.slice";
import SecondButton from "@/components/ui/Button/SecondButton";
import { redirect } from "next/navigation";
import SocketApi from "@/api/socket";

const Chat: FC = () => {
  const [chats, setChats] = useState([]);
  const currentChat = useSelector(selectCurrentChat);
  const dispatch = useDispatch();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null)
console.log(arrivalMessage)
 const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const nonEmptyChats = useChats(user?._id);

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on("client-path", (data) => {
      
      setArrivalMessage({
        chatId: data.chatId,
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      })
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
    if (messageData){
      setMessages(messageData);
    }
  }, [messageData]);
  
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
        <h2 className={styles.title}>Собеседники</h2>
        {chats.map((chat: any) => (
          <div onClick={() => handleChatItemClick(chat)} key={chat._id}>
            <ChatItem chat={chat} currentUser={user!._id} />
          </div>
        ))}
      </div>
      <div className={styles.chatBox}>
        <div className={styles.buttonBlock}>
        <SecondButton  onClick={handleToggleMenu}>
        {'< Чаты'}
        </SecondButton>
        </div>
        <div className={styles.chatBoxWrapper}>
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
              </div></div>
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
