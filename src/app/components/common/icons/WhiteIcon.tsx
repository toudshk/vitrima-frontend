import icon from "@/app/assets/images/whiteIcon.svg";
import Image from "next/image";
import { FC } from "react";



export const WhiteIcon:FC<{width: number}> = ({width }) => {
  return (
      <Image
        width={width}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};
