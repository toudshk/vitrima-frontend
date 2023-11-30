import { useUpload } from "./useUpload";
import cn from "clsx";
import Image from "next/image";
import { FC } from "react";
import imgChoosePhoto from "@/app/assets/images/choosePhotosvg.svg";
import SkeletonLoader from "../../skeleton-loader/skeletonLoader";
import { IUploadField } from "../form.interface";
import styles from "../Form.module.scss";

const UploadField: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  image,
  folder,
  onChange,
  isNoImage = false,
}) => {
  const { uploadImage, isLoading } = useUpload(onChange, folder);
  console.log(image);
  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadImageContainer}>
        {image !== null ? (
          <Image src={image[0]} alt="" layout="fill" unoptimized />
        ) : (
          <Image
            className={styles.uploadContainerSvg}
            src={imgChoosePhoto}
            alt={""}
          />
        )}
      </div>
      <label>
        <span>{placeholder}</span>
        <input type="file" onChange={uploadImage} />
        {error && <div className={styles.error}>{error.message}</div>}
      </label>
    </div>
  );
};

export default UploadField;
