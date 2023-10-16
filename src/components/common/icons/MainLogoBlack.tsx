import icon from "@/app/assets/images/MainLogoBlack.svg";
import Image from "next/image";
import { FC } from "react";



export const MainLogoBlack:FC<{width: number}> = ({width }) => {
  return (
      <Image
        width={width}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};