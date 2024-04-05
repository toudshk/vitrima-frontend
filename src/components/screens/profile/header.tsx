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
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
const Header: FC<{
  data: IUser;
  id: string;
  setOpen?: any;
  isLoading: boolean;
}> = ({ data, id, setOpen, isLoading }) => {
  //let isLoading = true
  const { user } = useAuth();
  const { onSubmit } = useChat(user?._id, id);
  const isOwner = user && user._id === id;
  const { data: works } = useWork();

  let worksLength = works ? works.length : 0;

  return (
    <div className={styles.header}>
      <div className={styles.leftBlock}>
        {isLoading ? (
          <SkeletonLoader width={"5.3vw"} height={"5.3vw"} borderRadius={100} />
        ) : (
          <Image
            width={120}
            height={120}
            src={data.image ? data.image : baseImage}
            alt={"аватарка"}
          />
        )}
        {isLoading ? (
          <SkeletonLoader
            width={150}
            height={30}
            borderRadius={16}
            className="ml-3"
          />
        ) : (
          <p>{data.nickname}</p>
        )}
      </div>
      {isLoading ? (
        <SkeletonLoader width={200} height={50} />
      ) : isOwner ? (
        <div className={styles.rightBlock}>
          {/* {user.isContractor && (
        worksLength > 5 ? (
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
        )
      )} */}

          {user.isContractor && (
            <Link className={styles.firstLink} href={"/add-work"}>
              Добавить работу
            </Link>
          )}
          <Link
            className={styles.secondLink}
            href={
              user.isContractor ? "/contractor/settings" : "/applicant/settings"
            }
          >
            Изменить профиль
          </Link>
        </div>
      ) : user ? (
        <div>
          <SecondButton className="text-xs" onClick={onSubmit}>
            Отправить сообщение
          </SecondButton>
        </div>
      ) : (
        <div>
          <Link className={styles.notAuthButton} href={"/signup"}>
            Отправить сообщение
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
