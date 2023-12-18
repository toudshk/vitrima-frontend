import { useAuth } from "@/hooks/useAuth";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import dayjs from "dayjs";
import Image from "next/image";
import { IMessage } from "../Chat.types";
import clsx from "clsx";
import styles from "./Message.module.scss";

export function Message({ message, own }: { message: IMessage; own: boolean }) {

  const { user } = useAuth();
  const messageClasses = clsx({
    [styles.ownMessage]: own,
    [styles.message]: !own,
  });
  return (
    <div 
    className={clsx([styles.message], {
    [styles.ownMessage]: own,
    [styles.friendMessage]: !own,
    })}>
      <div className={styles.messageTop}>
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>
        {dayjs(message.createdAt).format("HH:mm")}
      </div>
    </div>
  );
}
