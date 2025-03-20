import React, { FC } from "react";

import baseImage from "@/app/assets/images/base-avatar.jpg";
import icon from "@/app/assets/images/MainLogoBlack.svg";
import Image from "next/image";
import styles from "./Header.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "../../profile/useUser";
import Link from "next/link";
const Header: FC = () => {
  const { user } = useAuth();
  const { data: userData } = useUser(user?._id);
  return (
    <header className={styles.header}>
        <div className={styles.logoBlock}>
          <Image
            src={icon}
            alt={""}
            width={93}
            height={50}
            className={styles.image}
          />
        </div>
       
      <div className={styles.authButtons}>
        {!user ? (
          <>
            {" "}
            <Link href={"/login"}>Вход</Link>
            <Link href={"/signup"} className={styles.lastLink}>
              Регистрация
            </Link>
          </>
        ) : (
          <div className={styles.blockForAuth}>
            <div className={styles.userData}>
              <div className={styles.avatarWrapper}>
                <Image
                  className={styles.image}
                  src={userData?.image ? userData.image : baseImage}
                  width={100}
                  height={100}
                  alt=""
                />{" "}
              </div>
              <div className={styles.textBlock}>
                <p className={styles.nickName}>{userData?.nickname}</p>
                <p className={styles.email}>{userData?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
