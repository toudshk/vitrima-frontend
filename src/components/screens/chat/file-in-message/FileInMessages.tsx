import cn from "clsx";
import { FC, useEffect, useState } from "react";

import styles from "./FileInMessage.module.scss";
import { usePathname } from "next/navigation";
import { IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image"; // Иконка изображения
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useUpload } from "@/components/ui/Form-elements/upload-fields/useUpload";
import { IUploadField } from "@/components/ui/Form-elements/form.interface";

const UploadFileInMessage: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  folder,
  onChange,
  setImageIsUpload,
  image: initialImages = [],
}) => {
  const { uploadImage, isLoading } = useUpload((url) => {
    onChange((prev: any) => [...prev, url]); // Обновляем список изображений
  }, folder);
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    setImageList(initialImages);
  }, [initialImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageIsUpload(true);
      uploadImage(e); // Загрузка файлов
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
    onChange(newImageList); // Обновляем список изображений
  };

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      {imageList.length > 0 && (
        <div className={styles.imageList}>
          {imageList.map((image, index) => (
            <div key={index} className={styles.uploadedImageContainer}>
              <Image width={200} height={200} src={image} alt="Uploaded" />
              <button
                className={styles.removeImageButton}
                onClick={() => handleRemoveImage(index)}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={cn(
          styles.uploadImageContainer,
          imageList.length > 0 && styles.uploadImageContainerWithImage
        )}
      >
        {/* Скрытое поле ввода для выбора файлов */}
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }} // Скрываем стандартный input
          id="file-upload-input"
        />

        {/* Иконка для открытия диалога выбора файла */}
        <label htmlFor="file-upload-input">
          <IconButton component="span" className={styles.uploadIconButton}>
            <ImageIcon />
          </IconButton>
        </label>

        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    </div>
  );
};

export default UploadFileInMessage;
