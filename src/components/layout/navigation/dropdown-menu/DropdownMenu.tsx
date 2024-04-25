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
import EmailIcon from "@mui/icons-material/Email";
import { useUser } from "@/components/screens/profile/useUser";

import baseImage from "@/app/assets/images/base-avatar.jpg";
const DropdownMenu = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref для ссылки на меню
  const { data: userData } = useUser(user!._id);

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
        <div className={styles.topBlock}>
          <Image src={userData && userData.image ? userData.image : baseImage} alt={""} className={styles.avatar} width={250} height={250}/>
          <h2>{userData?.nickname}</h2>
        </div>
        {user?.isContractor === true && (  <Link href={"/add-work"}>
         
          Добавить новую работу
        </Link>)}
        <Link href={"/feedback"}>
          {/* <EmailIcon className="max-w-[15%] mr-1" /> */}
          Обратная связь
        </Link>
        <Link href={`/profile/${user?._id}`}>
          
          {/* <PersonIcon /> */}
           Профиль
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
        <div className={styles.line}></div>
        <a onClick={logoutHandler}>
          {/* <LogoutIcon /> */}
           Выход
        </a>
     
      </div>
    </div>
  );
};

export default DropdownMenu;
