"use client";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./AddDesigner.module.scss";
import { Meta } from "@/utils/meta";
import "react-dadata/dist/react-dadata.css";
import clsx from "clsx";
import Link from "next/link";
import { useDesigner } from "./useDesigner";
import MainButton from "@/components/ui/Button/MainButton";
import { useContractors } from "./useContractors";
import { IContractor } from "@/components/shared/types/user.types";
import baseImage from "@/app/assets/images/base-avatar.jpg";
import Image from "next/image";
import { useState } from "react";
import { useFinishedProject } from "../useFinishedProject";

const AddDesignerForProject: NextPageAuth = () => {
  const [selectedDesigners, setSelectedDesigners] = useState<IContractor[]>([]);
  const { data, handleSearch, searchTerm } = useContractors();
  const { onSubmit, data: selectedData } = useDesigner(selectedDesigners);
  const { data: projectData } = useFinishedProject();
  const toggleDesignerSelection = (designer: IContractor) => {
    setSelectedDesigners((prev) =>
      prev.some((d) => d._id === designer._id)
        ? prev.filter((d) => d._id !== designer._id)
        : [...prev, designer]
    );
  };
console.log(projectData)
  return (
    <Meta title="Personal info">
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className="mt-[9vh]">
        <div className={styles.mainBlock}>
          <div className={styles.leftBlock}>
            <h2 className={styles.title}>Потенциальные дизайнеры:</h2>
            {selectedData?.map((item: IContractor) => (
              <Link
                key={item._id}
                className={styles.chosenDesigner}
                href={`/profile/${item._id}`}
              >
                <Image
                  alt="image"
                  width={80}
                  height={80}
                  src={item.image ? item.image : baseImage}
                  className={styles.avatar}
                />
                <div className="flex justify-between w-full items-center">
                  <div className={styles.nickname}>{item.nickname}</div>

                  {projectData?.chosenDesigner?._id === item._id && (
                    <CheckCircleIcon color="success" />
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.rightBlock}>
            <input
              placeholder="Поиск"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchBar}
            />
            <div className={styles.potentialDesignersList}>
              {data?.map((user: IContractor) => {
                const isSelected = selectedDesigners.some(
                  (d) => d._id === user._id
                );
                return (
                  <button
                    key={user._id}
                    onClick={() => toggleDesignerSelection(user)}
                    className={clsx(
                      styles.potentialDesigner,
                      isSelected && styles.chosenPotentialDesigner
                    )}
                  >
                    <Image
                      alt="image"
                      width={80}
                      height={80}
                      src={user.image ? user.image : baseImage}
                      className={styles.avatar}
                    />
                    <div className={styles.nickname}>{user.nickname}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <MainButton
            className={styles.button}
            onClick={() => onSubmit(selectedDesigners)}
          >
            Сохранить
          </MainButton>
        </div>
      </div>
      {/* </form> */}
    </Meta>
  );
};
export default AddDesignerForProject;
