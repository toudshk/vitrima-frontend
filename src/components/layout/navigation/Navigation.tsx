"use client";
import { ChangeEvent, MouseEvent } from "react";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import styles from "./Navigation.module.scss";
import SearchField from "@/components/ui/Search-field/SearchField";
import { useDebounce } from "@/hooks/useDebounce";
import { MainLogo } from "@/components/common/icons/MainLogo";
import clsx from "clsx";
const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { logout } = useActions();

  const { user } = useAuth();

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
          <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
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

export default Navigation;
