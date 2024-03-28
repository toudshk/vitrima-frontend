import { BaseAvatar } from "@/components/common/icons/BaseAvatar";
import Image from "next/image";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import { FC, useEffect, useState } from "react";
import { useUserInfo } from "../useUserInfo";
import styles from "./ChatItems.module.scss";
import { useMessages } from "../useMessage";
import "dayjs/locale/ru";
import clsx from "clsx";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useMutation } from "react-query";
import { MessagesService } from "@/services/messages/messages.service";

interface IChatItem {
  chat: any;
  currentUser: string;
  currentChat: any;
}
dayjs.extend(advancedFormat);
dayjs.locale("ru"); // Устанавливаем локаль

const ChatItem: FC<IChatItem> = ({ chat, currentUser, currentChat }) => {
  const [lastMessage, setLastMessage] = useState<any>(undefined);
 

  const friendId = chat.members.find((m: any) => m !== currentUser);

  const { data } = useUserInfo(friendId);

  const markAsRead = () => {
    setLastMessage((prevMessage: any) => ({
      ...prevMessage,
      status: 'read',
    }));
  };
  const mutation = useMutation(
    "create message",
    (_id:any) => MessagesService.updateStatus(_id),
   
  );


  useEffect(() => {
    // Вызов markAsRead только при монтировании компонента
    if (currentChat?._id === chat._id ) {
      console.log(lastMessage);
      
      mutation.mutate(lastMessage._id);
 
      markAsRead();
    }
  }, [currentChat]);
 

  const { data: messageData, isLoading } = useMessages(chat._id);
  useEffect(() => {
    if (messageData && messageData.length > 0) {
      setLastMessage(messageData[messageData.length - 1]);
    } else {
      console.log("Массив сообщений пуст или отсутствует");
    }
  }, [messageData]);

  console.log(lastMessage)

  const formatTimestamp = (createdAt: any) => {
    const messageDate = dayjs(createdAt);
    const today = dayjs();
    const yesterday = today.subtract(1, "day");
    const lastWeek = today.subtract(1, "week");

    if (messageDate.isSame(today, "day")) {
      return messageDate.format("HH:mm");
    } else if (messageDate.isSame(yesterday, "day")) {
      return messageDate.format("DD.MM");
    } else if (messageDate.isAfter(lastWeek)) {
      return messageDate.format("dd");
    } else {
      return messageDate.format("DD.MM");
    }
  };
console.log(lastMessage?.sender, friendId)
  return (
    <div
      className={clsx(styles.item, {
        [styles.activeChat]: chat._id === currentChat?._id,
      })}
    >
      <Image
        src={data?.data.image || baseImage}
        alt={""}
        width={60}
        height={60}
        className={styles.avatar}
      />
      <div className={styles.textBlock}>
        <span className={styles.nickname}>{data?.data.nickname}</span>
        <div className={styles.lastMessage}>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {lastMessage ? (
                <>
                  <div className="flex  justify-between  w-full">
                    <div>
                      <span className={styles.text}>{lastMessage.text}</span>
                    </div>
                    <div>{lastMessage.status === "sent" && lastMessage?.sender === friendId && <div>new</div>}</div>
                  </div>
                  <span className={styles.timestamp}>
                    {formatTimestamp(lastMessage.createdAt)}
                  </span>
                </>
              ) : (
                <span className={styles.text}>Нет сообщений</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatItem;
