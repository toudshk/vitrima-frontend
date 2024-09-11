import cn from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import imgChoosePhoto from "@/app/assets/images/choosePhotosvg.svg";
import { IUploadField } from "../form.interface";
import styles from "../Form.module.scss";
import { useUpload } from "./useUpload";

import CloseIcon from "@mui/icons-material/Close";
const UploadField: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  folder,
  onChange,
  setImageIsUpload,
  image: initialImages = [], // Default to an empty array if no initial images
}) => {
  const { uploadImage, isLoading } = useUpload((url) => {
  
    setImageList((prev) => [...prev, url]);
    onChange([...imageList, url]);
  }, folder);
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    setImageList(initialImages);
  }, [initialImages])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageIsUpload(true)
      uploadImage(e);
    }
  };

 

  const handleRemoveImage = (index: number) => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
    onChange(newImageList); // Update parent component with the new list
  };

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={cn(styles.uploadImageContainer, imageList.length > 0 && styles.uploadImageContainerWithImage)}>
        <label>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            multiple // Allow multiple file selection
          />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>

        <div className={styles.uploadContainerSvg}>
          <Image src={imgChoosePhoto} alt="" />
          <p>Загружайте только те файлы, на которые у вас есть права.</p>
          <p>Не более 5МБ. </p>
        </div>
      </div>

      {imageList.length > 0 && (
        <div className={styles.imageList}>
          {imageList.map((image, index) => (
            <div key={index} className={styles.uploadedImageContainer}>
              <Image
                width={200}
                height={200}
                src={image}
                alt="Uploaded"
           
              />
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



    </div>
  );
};

export default UploadField;
