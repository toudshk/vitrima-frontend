"use client";
import React, { useState, useEffect, FC, useRef } from "react";
import MessageField from "./MessageField";
import { Message } from "./message/Message";
import { useMessages } from "./useMessage";
import { useChats } from "./useChats";
import { useAuth } from "@/hooks/useAuth";
import ChatItem from "./chatItems/ChatItems";
import styles from "./Chat.module.scss";

const Chat: FC = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const { user } = useAuth();
console.log(chats)
  const { data: chatData } = useChats(user?._id);
  useEffect(() => {
    if (chatData) {
      setChats(chatData);
    }
  }, [chatData]);

  const { data: messageData } = useMessages(currentChat?._id);
  useEffect(() => {
    if (messageData) {
      setMessages(messageData);
    }
  }, [messageData]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  return (
    <div className={styles.messenger}>
      <div className={styles.chatMenu}>
        {chats.map((chat) => (
          <div onClick={() => setCurrentChat(chat)} key={chat._id}>
            <ChatItem chat={chat} currentUser={user?._id} />
          </div>
        ))}
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxWrapper}>
          {currentChat ? (
            <>
            <div className={styles.chatBoxTop}>
              {messages?.map((message) => (
                <div ref={scrollRef}  key={message._id}> 
                <Message
                 
                  message={message}
                  own={message.sender === user?._id}
               
                />
                   </div>
              ))}
            </div>
            <div className={styles.chatBoxBottom}>
            <MessageField
              currentChat={currentChat}
              setMessages={setMessages}
              messages={messages}
            />
          </div>
          </>
          ) : (
            <span className={styles.noConversationText}>Выберите чат</span>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Chat;
