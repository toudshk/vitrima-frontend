import icon from "@/app/assets/images/WhiteIconLogo.svg";
import Image from "next/image";
import { FC } from "react";



export const WhiteIconLogo:FC<{width: number}> = ({width }) => {
  return (
      <Image
        width={width}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};
