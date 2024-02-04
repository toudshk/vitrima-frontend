import { BaseAvatar } from "@/components/common/icons/BaseAvatar";
import Image from "next/image";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import { FC, useEffect, useState } from "react";
import { useUserInfo } from "../useUserInfo";
import styles from "./ChatItems.module.scss";

interface IChatItem {
  chat: any;
  currentUser: string;
}

const ChatItem: FC< IChatItem> = ({ chat, currentUser }) => {


  const friendId = chat.members.find((m: any) => m !== currentUser);

  const { data } = useUserInfo(friendId);

  return (
    <div className={styles.item}>
      <Image
        src={data?.data.image || baseImage}
        alt={""}
        width={60}
        height={60}
        className={styles.avatar}
      />
      <span className={styles.nickname}>{data?.data.nickname}</span>
    </div>
  );
};
export default ChatItem;
