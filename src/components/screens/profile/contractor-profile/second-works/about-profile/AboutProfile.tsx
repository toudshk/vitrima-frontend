import { FC } from "react";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import styles from "./AboutProfile.module.scss";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ru";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import VkIcon from "@/components/common/icons/VkIcon";

const AboutProfile: FC<{ userData: any }> = ({ userData }) => {
  const formattedDate = dayjs(userData.createdAt)
    .locale("ru")
    .format("MMM YYYY");

  const socialProfiles = userData?.socialProfiles || {};
  const socialLinks = [
    {
      platform: "instagram",
      icon: <InstagramIcon />,
      text: socialProfiles.instagram,
    },
    {
      platform: "telegram",
      icon: <TelegramIcon />,
      text: socialProfiles.telegram,
    },
    {
      platform: "vk",
      icon: <VkIcon />,
      text: socialProfiles.vk,
    },
    {
      platform: "website",
      icon: <LanguageIcon />,
      text: socialProfiles.webSite,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftBlock}>
        <p className="font-bold text-2xl text-gray-700 mb-3">Биография</p>
        {userData.description || "Нет информации о биографии."}
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.grayBlock}>
          <ul>
            <li>
              <LocationOnOutlinedIcon /> {userData.location || "Не указано"}
            </li>
            <li>
              <PermIdentityOutlinedIcon /> С нами с {formattedDate}
            </li>
          </ul>
        </div>
        <div className={styles.socialLinksBlock}>
          <h2 className="text-2xl font-bold mb-4">Социальные сети</h2>
          {socialLinks.some(link => link.text) ? (
            socialLinks.map(({ platform, icon, text }) =>
              text ? (
                <div
                  key={platform}
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <div className="mr-2 text-gray-700">{icon}</div>
                  <div className="font-semibold">{text}</div>
                </div>
              ) : null
            )
          ) : (
            <p className="text-gray-400 font-bold text-base ">Пока что пусто</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutProfile;
