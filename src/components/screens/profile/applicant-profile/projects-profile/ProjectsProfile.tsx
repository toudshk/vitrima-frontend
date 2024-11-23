"use client";
import { FC, useState } from "react";
import plusMarkSvg from "@/app/assets/images/plus.svg";
import styles from "./ProjectProfile.module.scss";
import { IProject } from "@/components/shared/types/project.types";

import { convertMongoDate } from "@/utils/date/ConverMongoDate";
interface IData {
  data: IProject;
}

const ProjectsProfile: FC<IData> = ({ data }) => {
  return (
    <div className={styles.item}>
      <div className={styles.topBlock}>
        <div>
          <h2>подбор:</h2>
        <p>
          {(data.chosenDesigners === null || data.chosenDesigners) && (
            <p> дизайнера</p>
          )}
        </p>
        <p>
          {(data.chosenBuilders === null || data.chosenBuilders) && (
            <p> строителя</p>
          )}
        </p>
        <p>
          {(data.chosenCarpenter === null || data.chosenCarpenter) && (
            <p> производителя</p>
          )}
        </p>
        </div>
        <p>
          {(data.constructionManagement === null ||
            data.constructionManagement) && <p>ведение стройки онлайн</p>}
        </p>
        <p>
          {(data.drawings === null || data.drawings) && (
            <p>ведение проверка чертежей</p>
          )}
        </p>
      </div>
      <p className={styles.createdAt}>{convertMongoDate(data.createdAt)}</p>
    </div>
  );
};

export default ProjectsProfile;
