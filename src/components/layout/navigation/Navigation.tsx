import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import styles from "./Navigation.module.scss";
import { MainLogo } from "@/components/common/icons/MainLogo";
import clsx from "clsx";
import Search from "./search/search";
import { motion } from "framer-motion";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import Filter from "@/components/screens/filter/Filter";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SocketApi from "@/api/socket";
import { useSelector } from "react-redux";
import { useUnreadMessages } from "@/hooks/chat/useUnreadMessages";

const animation = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const Navigation = () => {
  SocketApi.createConnection();

  const { data } = useUnreadMessages();
  let countUnreadMessages = data?.length ?? 0;
  
  const { user } = useAuth();
  const pathname = usePathname().substring(1);
  const [arrivalMessage, setArrivalMessage] = useState(false);

  useEffect(() => {
    SocketApi.socket?.on("client-path", (data) => {
      if (user && user._id === data.receiver) {
        setArrivalMessage(true);
      }
    });
    
  }, []);
  // Обработчик события для ссылки "чат", который сбрасывает уведомление
  const handleChatLinkClick = () => {
    setArrivalMessage(false);
    countUnreadMessages = 0
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      whileInView="visible"
      variants={animation}
    >
      <div
        className={clsx({
          [styles.navigationAuth]: user !== null,
          [styles.navigationNotAuth]: user === null,
        })}
      >
        <Link className={styles.logo} href="/">
          <MainLogo height={30} />
        </Link>
        {user ? (
          <>
            <div className="w-[65vw] mx-[2.5vw]">
              <Search />
            </div>
            <div className={styles.buttons}>
            
            {(pathname !== "chat") && (
                <Link
                className={styles.chatButton}
                href={"/chat"}
                onClick={handleChatLinkClick} // Добавим обработчик события
              >
                ЧАТ
                {(countUnreadMessages > 0  || arrivalMessage) && (
                  <div className={styles.notification} />
                )}
              </Link>
              )}
             
              {(pathname === "architecture" || pathname === "interior") && (
                <Filter />
              )}
              <DropdownMenu />
            </div>
          </>
        ) : (
          <div className="flex select-none">
            <Link className={styles.button} href={"/login"}>
              ВХОД
            </Link>
            <p className={styles.apost}>&nbsp;/&nbsp;</p>
            <Link className={styles.button} href={"/signup"}>
              РЕГИСТРАЦИЯ
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navigation;
