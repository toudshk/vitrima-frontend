import icon from "@/app/assets/images/MainLogo.svg";
import Image from "next/image";
import { FC } from "react";



export const MainLogo:FC<{width: number}> = ({width }) => {
  return (
      <Image
        width={width}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};
