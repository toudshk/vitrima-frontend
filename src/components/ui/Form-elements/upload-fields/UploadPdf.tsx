import { useUpload } from "./useUpload";
import cn from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Page, pdfjs } from "react-pdf";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IUploadField } from "../form.interface";
import styles from "./UploadPdf.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SkeletonLoader from "../../skeleton-loader/skeletonLoader";
const UploadPdf: FC<IUploadField> = ({
  placeholder,

  style,
  image: initialPdfArray = [],
  folder,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const { uploadImage, isLoading } = useUpload((url) => {
    setPdfList((prev) => [...prev, url]);
    onChange([...pdfList, url]);
  }, folder);
  const [pdfList, setPdfList] = useState<string[]>([]);

  useEffect(() => {
    setPdfList(initialPdfArray);
  }, [initialPdfArray]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleRemoveImage = (index: number) => {
    const newPdfList = [...pdfList];
    newPdfList.splice(index, 1);
    setPdfList(newPdfList);
    onChange(newPdfList); // Обновляем список изображений
  };

  const handleWorkData = (value: any) => {
    setOpen(true);
  };
  const [scroll, setScroll] = useState("body");

  const handleRemoveFile = (index: number) => {
    const newImageList = [...pdfList];
    newImageList.splice(index, 1);
    setPdfList(newImageList);
    onChange(newImageList); // Update parent component with the new list
  };
  console.log(pdfList.length)
  return (
    <div className={styles.block}>
      <div className={cn(styles.field, { [styles.inactiveField]: pdfList.length === 0 })}>
        {pdfList.length > 0 && (
          <div className={styles.pdfList}>
            {pdfList.map((item, index) => {
              const startIndex = item.indexOf("/uploads/chat-drawings/");
              const displayText =
                startIndex !== -1
                  ? item
                      .substring(startIndex + "/uploads/chat-drawings/".length)
                      .split("_")
                      .pop()
                  : item;

              return (
                <div className={styles.uploadedPdfBlock} key={index}>
                  <button
                    className={styles.removeImageButton}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <CloseIcon />
                  </button>
                  {isLoading ? <SkeletonLoader /> : <p>{displayText}</p>}
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
        <label className={styles.topBlock} htmlFor="pdf-file-upload-input">
          <IconButton component="span" className={styles.uploadIconButton}>
            <AttachFileIcon />
          </IconButton>
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

export default UploadPdf;
