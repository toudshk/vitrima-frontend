import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/user/user.service";
import Image from "next/image";
import { FC } from "react";
import { useQuery } from "react-query";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import styles from "../Navigation.module.scss";
const Avatar: FC<{id:string}> = async ({id}) => {
  const response = await UserService.getUserById(id)

  return (
    <Image
      width={32}
      height={32}
      className={styles.avatar}
      src={response && response.data && response.data.image ? response.data.image : baseImage}
   alt={""}
    />
  );
};

export default Avatar;
