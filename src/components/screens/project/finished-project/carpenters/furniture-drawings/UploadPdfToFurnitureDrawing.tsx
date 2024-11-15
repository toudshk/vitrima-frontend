"use client";
import cn from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Page, pdfjs } from "react-pdf";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styles from "./FurnitureDrawings.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { IUploadField } from "@/components/ui/Form-elements/form.interface";
import { useUpload } from "@/components/ui/Form-elements/upload-fields/useUpload";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import Link from "next/link";

const UploadFurniturePdf: FC<IUploadField> = ({
  placeholder,

  style,
  image: initialPdfArray = [],
  folder,
  onChange,
}) => {
  const { uploadImage, isLoading } = useUpload((url) => {
    setPdfList((prev) => [...prev, url]);
    onChange([...pdfList, url]);
  }, folder);
  const [pdfList, setPdfList] = useState<string[]>([]);
  console.log(pdfList);
  useEffect(() => {
    setPdfList(initialPdfArray);
  }, [initialPdfArray]);

  const handleRemoveFile = (index: number) => {
    const newImageList = [...pdfList];
    newImageList.splice(index, 1);
    setPdfList(newImageList);
    onChange(newImageList); // Update parent component with the new list
  };
  return (
    <div className={styles.block}>
      <div className={styles.field}>
        {pdfList.length > 0 && (
          <div className={styles.pdfList}>
            {pdfList.map((item, index) => {
              const startIndex = item.indexOf("/uploads/project-furniture-drawings/");
              const displayText =
                startIndex !== -1
                  ? item
                      .substring(startIndex + "/uploads/chat-drawings/".length)
                      .split("_")
                      .pop()
                  : item;

              return (
                <div className={styles.item} key={index}>
                  {/* <button
                    className={styles.removeImageButton}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <CloseIcon />
                  </button> */}

                  {isLoading ? (
                    <SkeletonLoader />
                  ) : (
                    <>
                      <p>{displayText}</p>{" "}
                      <Link
                        href={item}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        открыть
                      </Link>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        className={cn(
          styles.uploadImageContainer,
          pdfList.length > 0 && styles.uploadImageContainerWithImage
        )}
      >
        <label className={styles.addButton} htmlFor="pdf-file-upload-input">
          Добавить файл
        </label>
        <div className={styles.button}>
          <input
            type="file"
            accept=".pdf"
            onChange={uploadImage}
            multiple
            style={{ display: "none" }}
            id="pdf-file-upload-input"
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default UploadFurniturePdf;
