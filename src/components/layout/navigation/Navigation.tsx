"use client";
import { ChangeEvent, MouseEvent, useEffect } from "react";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import styles from "./Navigation.module.scss";
import SearchField from "@/components/ui/Search-field/SearchField";

import { MainLogo } from "@/components/common/icons/MainLogo";
import clsx from "clsx";

const Navigation = () => {
 

  const {user} = useAuth();

  const { logout } = useActions();

  const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };
  return (
    <div
      className={clsx({
        [styles.navigationAuth]: user !== null,
        [styles.navigationNotAuth]: user === null,
      })}
    >
      <Link href="/">
        <MainLogo width={200} />
      </Link>
      {user ? (
        <>
          <SearchField />
          <div className={styles.buttons}>
            <button>ЛЕНТА</button>
            <button>ФИЛЬТР</button>
            <a onClick={logoutHandler}>ВЫХОД</a>
          </div>
        </>
      ) : (
        <Link className={styles.button} href={"/login"}>
          ВХОД / РЕГИСТРАЦИЯ
        </Link>
      )}
    </div>
  );
};

// export const getServerSideProps = async () => {
//   // Получите данные пользователя (роль) с сервера или из вашего API
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { user } = useAuth();

//   return {
//     props: {
//       isUser: user,
//     },
//   };
// };

export default Navigation;
