"use client";

import { FC, useState } from "react";
import styles from './ModalWindow.module.scss'
import Image from "next/image";
import { IWork } from "@/components/shared/types/work.types";
import { useSetMainWork } from "./useSetMainWork";
import { useAuth } from "@/hooks/useAuth";
const GalleryItem: FC<{
  item: IWork;
  handleWorkData: any;
  handleClickOpen: any;
}> = ({ item, handleWorkData, handleClickOpen }) => {
  const { user } = useAuth();
  const { onSubmit } = useSetMainWork(user?._id, item._id);
  const [isHovered, setIsHovered] = useState(false);

  

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="mb-4 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {user?._id === item.contractorId._id && isHovered && (
  <button
    onClick={onSubmit}
    className={styles.setMainWorkButton}
  >
    {item.isMainWork ? "Открепить работу" : "Закрепить работу"}
  </button>
)}

      
      <Image
        loading="lazy"
        width={600}
        height={800}
        src={item.images[0]}
        onClick={(e) => {
          handleWorkData(item);
          handleClickOpen("body");
        }}
        className="transition-all rounded-lg opacity-0 duration-700  transform-gpu hover:scale-[1.01] cursor-pointer hover:opacity-100"
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        alt={`Фотография работы ${item.title}`}
      />
    </div>
  );
};

export default GalleryItem;
