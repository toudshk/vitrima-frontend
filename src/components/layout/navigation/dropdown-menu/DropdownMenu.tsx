import React, { useEffect, useRef, useState } from "react";
import Avatar from "../avatar/Avatar";
import styles from "./DropdownMenu.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import clsx from "clsx";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import iconLogo from "@/app/assets/images/BlackIconLogo.svg";
import ModalSubscription from "@/components/screens/profile/contractor-profile/ModalSubscription";
import Image from "next/image";
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import EmailIcon from '@mui/icons-material/Email';

const DropdownMenu = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref для ссылки на меню
  

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const logoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div
      ref={dropdownRef} // Привязать ref к компоненту
      className={clsx(styles.dropdown, { [styles.open]: menuOpen })}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Avatar id={user!._id} />
      <div className={clsx(styles.dropdownItems, { [styles.open]: menuOpen })}>
        <Link href={`/profile/${user?._id}`}>
          {" "}
          <PersonIcon /> Профиль
        </Link>
        {/* {user?.isContractor === true && (
          <a
            onClick={(e) => {
              setOpen(true);
            }}
          >
            <div className="flex">
              <Image
                src={iconLogo}
                width={12}
                height={12}
                alt={""}
                className="max-w-[15%] mr-2"
              />
              Подписка
            </div>
          </a>
        )} */}

        <ModalSubscription setOpen={setOpen} open={open} />
        <a onClick={logoutHandler}>
          <LogoutIcon /> Выход
        </a>
        <Link href={'/feedback'}>
          <EmailIcon className="max-w-[15%] mr-1" />
          Обратная связь
        </Link>
      </div>

      
    </div>
  );
};

export default DropdownMenu;
