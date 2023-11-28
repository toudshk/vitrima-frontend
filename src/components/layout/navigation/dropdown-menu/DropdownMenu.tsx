import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import styles from "./DropdownMenu.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
const DropdownMenu = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const logoutHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className={styles.dropdown}>
      <Avatar id={user._id}/>
      <div className={styles.dropdownItems}>
        <a href={`/profile/${user?._id}`} >
          Профиль
        </a>

        <a onClick={logoutHandler}>Выход</a>
      </div>
    </div>
  );
};

export default DropdownMenu;
