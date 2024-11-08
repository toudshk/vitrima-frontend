"use client";
import { IApplicationForm } from "@/components/shared/types/applicationForm";
import React, { FC, useState } from "react";
import styles from "./ApplicationFormsItems.module.scss";
import { useChat } from "./useCreateChat";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/app/admin-page/users/UseUsers";
import { useUserInfo } from "../../chat/useUserInfo";
import Image from "next/image";

import baseImage from "@/app/assets/images/base-avatar.jpg";
const ApplicationFormsItem: FC<{ item: any }> = ({ item }) => {
  const { user } = useAuth();

  const [invitedUser, setInvitedUser] = useState("");
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers();
  const friendId = item.chatId?.members.find((m: any) => m !== user!._id);
  const { data: friendData } = useUserInfo(friendId);

  const [modalWindow, setModalWindow] = useState(false);
  const { onSubmit } = useChat(
    user!._id,
    invitedUser,
    item._id,
    setModalWindow
  );
  return (
    <div className={styles.item}>
      <p className="mr-3">
      {item.phoneNumber}
      </p>
      {
  item.chatId === undefined ? (
    user?.isAdmin && (
      <button
        onClick={() => setModalWindow(true)}
        className="rounded-full border border-gray-700 px-2"
      >
        +
      </button>
    )
  ) : (
    <Image
      src={friendData?.data.image || baseImage}
      alt="Friend's Avatar"
      width={35}
      height={35}
      className="rounded-full h-8 w-8"
    />
  )
}
      {modalWindow && (
        <div className={styles.modalWindow}>
          <div className={styles.windowContent}>
            <h2>Список пользователей</h2>
            {invitedUser && (
              <div>
                Создать чат с {invitedUser} ?{" "}
                <button onClick={() => onSubmit()}>Создать чат</button>
              </div>
            )}

            <input
              placeholder="Поиск"
              value={searchTerm}
              onChange={handleSearch}
            />
            <table className={styles.userTable}>
              {data?.map((user, index) => (
                <a onClick={() => setInvitedUser(user._id)} key={index}>
                  {user.items[0]}
                </a>
              ))}
            </table>
            <button onClick={() => setModalWindow(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationFormsItem;
