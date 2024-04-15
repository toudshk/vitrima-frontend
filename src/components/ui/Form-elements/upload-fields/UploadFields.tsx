import { useUpload } from "./useUpload";
import cn from "clsx";
import Image from "next/image";
import { FC, useState } from "react";
import imgChoosePhoto from "@/app/assets/images/choosePhotosvg.svg";
import SkeletonLoader from "../../skeleton-loader/skeletonLoader";
import { IUploadField } from "../form.interface";
import styles from "../Form.module.scss";

const UploadField: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  folder,
  onChange,
}) => {
 
  const { uploadImage, isLoading } = useUpload(onChange, folder);

  const [tempImage, setTempImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
  
      reader.readAsDataURL(file);
  
      uploadImage(e);
    }
  };

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadImageContainer}>
        {tempImage !== null ? (
          isLoading ? (
            <SkeletonLoader className="h-full absolute -top-1" />
          ) : (
            <Image src={tempImage as string} alt="" layout="fill" unoptimized />
          )
        ) : (
          <Image
            className={styles.uploadContainerSvg}
            src={imgChoosePhoto}
            alt=""
          />
        )}
      </div>
      <label>
        <span>{placeholder}</span>

        <input   type="file"
                  accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="" />

        {error && <div className={styles.error}>{error.message}</div>}
      </label>
    </div>
  );
};

export default UploadField;