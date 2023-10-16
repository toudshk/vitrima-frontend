import icon from "@/app/assets/images/mainIcon.svg";
import Image from "next/image";
import { FC } from "react";



export const MainIcon:FC<{width: number}> = ({width }) => {
  return (
      <Image
        width={width}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};
