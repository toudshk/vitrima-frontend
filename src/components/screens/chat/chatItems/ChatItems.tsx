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
import { useAuth } from "@/hooks/useAuth";
import SocketApi from "@/api/socket";

interface IChatItem {
  chat: any;
  currentUser: string;
  currentChat: any;
}
dayjs.extend(advancedFormat);
dayjs.locale("ru"); // Устанавливаем локаль

const ChatItem: FC<IChatItem> = ({ chat, currentUser, currentChat }) => {
  const [lastMessage, setLastMessage] = useState<any>(undefined);
  const [isNotRead, setIsNotRead] = useState(true);
  const { user } = useAuth();
  const friendId = chat.members.find((m: any) => m !== currentUser);
  const { data } = useUserInfo(friendId);
  const { data: messageData, isLoading } = useMessages(chat._id);

  const markAsRead = () => {
    messageData.forEach((message: any) => {
      if (user!._id !== message.sender) {
        setIsNotRead(false);

        mutation.mutate(message._id, {});
      }
    });
  };

  const mutation = useMutation("create message", (_id: any) =>
    MessagesService.updateStatus(_id)
  );
  // SocketApi.createConnection();
  // SocketApi.socket?.on("client-path", (data) => {
  //   {
  //     chat._id === data.chatId &&
  //       setLastMessage({
  //         chatId: data.chatId,
  //         sender: data.sender,
  //         receiverId: friendId,
  //         text: data.text,
  //         createdAt: Date.now(),
  //         status: "sent",
  //       });
  //   }
  // });

  useEffect(() => {
    if (currentChat?._id === chat._id) {
      // Проверяем, что lastMessage определено и не равно null
      if (lastMessage && user && user._id !== lastMessage.sender) {
        mutation.mutate(lastMessage._id);
        markAsRead();
      }
    }
  }, [currentChat]);

  useEffect(() => {
    if (messageData && messageData.length > 0) {
      setLastMessage(messageData[messageData.length - 1]);
    } else {
      console.log("Массив сообщений пуст или отсутствует");
    }
  }, [messageData]);

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
  return (
    <div
      className={clsx(styles.item, {
        [styles.activeChat]: chat._id === currentChat?._id,
      })}
    
    >
      <Image
        src={data?.data.image || baseImage}
        alt={""}
        width={120}
        height={120}
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
                  <div className="flex  justify-between items-center w-[120%]">
                    <span className={styles.text}>{lastMessage.text}</span>

                    <div>
                      {isNotRead &&
                        lastMessage.status === "sent" &&
                        lastMessage?.sender === friendId && (
                          <div className=" h-4 w-4 bg-blue-500 mr-3  rounded-full"></div>
                        )}
                    </div>
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
