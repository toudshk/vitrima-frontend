import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import styles from "./DropdownMenu.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import clsx from 'clsx'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { redirect } from 'next/navigation'

const DropdownMenu = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    redirect('/')
  };

  return (
    <div
      className={clsx(styles.dropdown, { [styles.open]: menuOpen })}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Avatar id={user!._id} />
      <div className={clsx(styles.dropdownItems, { [styles.open]: menuOpen })}>
        <a href={`/profile/${user?._id}`}> <PersonIcon/> Профиль</a>
        <a onClick={logoutHandler}><LogoutIcon/> Выход</a>
      </div>
    </div>
  );
};


export default DropdownMenu;
