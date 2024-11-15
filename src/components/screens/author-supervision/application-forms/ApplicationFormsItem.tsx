"use client";
import React, { FC, useState } from "react";
import styles from "./ApplicationFormsItems.module.scss";
import { useChat } from "./useCreateChat";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/app/admin-page/users/UseUsers";
import { useUserInfo } from "../../chat/useUserInfo";
import Image from "next/image";

import baseImage from "@/app/assets/images/base-avatar.jpg";
import Link from "next/link";
import { IProject } from "@/components/shared/types/project.types";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { useWorkers } from "./useWorker";
import { IWorker } from "@/components/shared/types/user.types";
const ApplicationFormsItem: FC<{ item: IProject }> = ({ item }) => {
  const { user } = useAuth();

  const [invitedUser, setInvitedUser] = useState("");
  const { handleSearch, searchTerm, data } = useWorkers();
  const friendId = item.chatId?.members.find((m: any) => m !== user!._id);
  const { data: friendData } = useUserInfo(friendId);
  const [modalWindow, setModalWindow] = useState(false);
  const { onSubmit } = useChat(
    user!._id,
    invitedUser,
    item._id,
    setModalWindow
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options); // 'ru-RU' для русского формата
  };
  return (
    <div className={styles.item}>
      <div>
        {item.applicationForm ? (
          <div className="flex gap-1">
            <p>{item?.applicationForm?.name}</p>
            <p className="mr-3">{item.applicationForm?.objectArea} м²</p>
          </div>
        ) : (
          <div>Данные не заполнены</div>
        )}
        <div className='flex'>Дата: {convertMongoDate(item.createdAt)}</div>
        <div className="flex items-center gap-2">
          <Link
            href={`project/${item._id}`}
            className="flex text-xs text-gray-400"
          >
            Перейти к проекту
          </Link>
          <p className="text-xs">{item.applicationForm?.location}</p>
        </div>
        {modalWindow && (
          <div className={styles.modalWindow}>
            <div className={styles.windowContent}>
              <h2>Список пользователей</h2>
              <button className={styles.closeButton} onClick={() => setModalWindow(false)}>x</button>
              

              <input
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleSearch}
                className="mt-2 mx-auto"
              />
              <table className={styles.userTable}>
                {/* @ts-ignore */}
                {data?.map((user:IWorker, index: number) => (
                  <a onClick={() => setInvitedUser(user._id)} key={index}>
                    {user.email}
                  </a>
                ))}
              </table>
              {invitedUser && (
                <div className="mt-auto">
                  Создать чат с {invitedUser} ?{" "}
                  <button className="" onClick={() => onSubmit()}>Создать чат</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="border-l border-gray-300 px-2 pt-1">
        {item.chatId === undefined ? (
          (user?.isAdmin || user?.isInspector) && (
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
            className="rounded-full h-8 w-8 image-like-bg"
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationFormsItem;
