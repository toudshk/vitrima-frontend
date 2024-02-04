import icon from "@/app/assets/images/calendar.svg";
import Image from "next/image";
import { FC } from "react";



export const Calendar:FC = () => {
  return (
      <Image
        width={14}
        src={icon}
        alt={"Vitrima"}
        draggable={false}
      />
  );
};

