"use client";
import React, { FC } from "react";
import Link from "next/link";
import MainButton from "@/components/ui/Button/MainButton";
import styles from "./Profile.module.scss";
import { IUser } from "./Profile.interface";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/chat/useChat";
import SecondButton from "@/components/ui/Button/SecondButton";
import { useWork } from "./contractor-profile/profile-works/useWork";
const Header: FC<{ data: IUser; id: string; setOpen?: any }> = ({
  data,
  id,
  setOpen,
}) => {
  const { user } = useAuth();
  const { onSubmit } = useChat(user?._id, id);
  const isOwner = user && user._id === id;
  const { data: works } = useWork();

  let worksLength = works ? works.length : 0;

  return (
    <div className={styles.header}>
      <div className={styles.leftBlock}>
        <Image
          width={72}
          height={72}
          src={data.image ? data.image : baseImage}
          alt={"аватарка"}
        />
        <p>{data.nickname}</p>
      </div>
      {isOwner ? (
        <div className={styles.rightBlock}>
          {user.isContractor &&
            (worksLength > 30 ? (
              <button
                className={styles.firstLink}
                onClick={(e) => {
                  setOpen(true);
                }}
              >
                Добавить работу
              </button>
            ) : (
              <Link className={styles.firstLink} href={"/add-work"}>
                Добавить работу
              </Link>
            ))}

          <Link
            className={styles.secondLink}
            href={
              user.isContractor ? "/contractor/settings" : "/applicant/settings"
            }
          >
            Редактировать профиль
          </Link>
        </div>
      ) : (
        <div>
          <SecondButton className="text-xs" onClick={onSubmit}>
            написать
          </SecondButton>
        </div>
      )}
    </div>
  );
};

export default Header;
