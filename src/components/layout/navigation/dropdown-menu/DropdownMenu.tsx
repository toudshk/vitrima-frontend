import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import styles from "./DropdownMenu.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import clsx from "clsx";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import iconLogo from "@/app/assets/images/BlackIconLogo.svg";
import { redirect } from "next/navigation";
import ModalSubscription from "@/components/screens/profile/contractor-profile/ModalSubscription";
import Image from "next/image";

const DropdownMenu = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const logoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div
      className={clsx(styles.dropdown, { [styles.open]: menuOpen })}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <Avatar id={user!._id} />
      <div className={clsx(styles.dropdownItems, { [styles.open]: menuOpen })}>
        <a href={`/profile/${user?._id}`}>
          {" "}
          <PersonIcon /> Профиль
        </a>
        {user?.isContractor === true && (
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
        )}

        <ModalSubscription setOpen={setOpen} open={open} />
        <a onClick={logoutHandler}>
          <LogoutIcon /> Выход
        </a>
      </div>
    </div>
  );
};

export default DropdownMenu;
