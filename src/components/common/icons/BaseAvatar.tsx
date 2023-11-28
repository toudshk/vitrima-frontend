import icon from "@/app/assets/images/base-avatar.jpg";
import Image from "next/image";
import { FC } from "react";



export const BaseAvatar:FC<{width: number}> = ({width }) => {
  return (
      <Image
        width={width}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};
