"use client";
import { FC, useState } from "react";
import styles from "./DesignerBlock.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import { IContractor } from "@/components/shared/types/user.types";
import Image from "next/image";
import Link from "next/link";
import { useExamplesWorks } from "./UseExamplesWorks";
import { IWork } from "@/components/shared/types/work.types";
import MainButton from "@/components/ui/Button/MainButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAddDesigner } from "./UseAddDesigner";

const DesignerBlock: FC<{
  data: IContractor | any;
  projectId: string;
  isChosenDesigner: boolean;
}> = ({ data, projectId, isChosenDesigner }) => {
  const { data: worksData, isLoading } = useExamplesWorks(data._id); // Ensure `useExamplesWorks` is defined correctly
  const { onSubmit } = useAddDesigner(projectId); // Use the hook with projectId

  return (
    <div key={data._id} className={styles.designerItem}>
      <Link href={`/profile/${data._id}`}>
      <p
         
          className={styles.titleLink}
        >
          Перейти в профиль
          <ArrowForwardIcon fontSize='small'/>
        </p>
        <Image
          alt="image"
          src={data.image ? data.image : baseImage}
          width={350}
          height={400}
          className={styles.designerImage}
        />
      </Link>
      {/* {worksData?.map((work: IWork) => (
        <Image 
          src={work.images[0] ? work.images[0] : baseImage} 
          width={40} 
          height={40} 
          alt='work image' 
          key={work._id}
        />
      ))} */}
      <div className={styles.bottomBlock}>
        <p>
          {data.nickname}{" "}
          {isChosenDesigner && (
            <CheckCircleIcon color="success" fontSize="large" />
          )}
        </p>
        {!isChosenDesigner && (
          <MainButton
            className="text-base w-full bg-blue-500"
            onClick={() => onSubmit(data._id)}
          >
            Выбрать
          </MainButton>
        )}
      </div>
    </div>
  );
};

export default DesignerBlock;
