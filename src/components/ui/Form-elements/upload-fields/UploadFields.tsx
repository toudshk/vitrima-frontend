import { useUpload } from "./useUpload";
import cn from "clsx";
import Image from "next/image";
import { FC } from "react";

import SkeletonLoader from "../../skeleton-loader/skeletonLoader";
import { IUploadField } from "../form.interface";
import styles from "../form.module.scss";

const UploadField: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  image,
  folder,
  onChange,
}) => {
  const { uploadImage, isLoading } = useUpload(onChange, folder);

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadFlex}>
        <label>
          <span>{placeholder}</span>
          <input type="file" onChange={uploadImage} />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>

        <div className={styles.uploadImageContainer}>
          {isLoading ? (
            <SkeletonLoader count={1} className="w-full h-full" />
          ) : (
            image && <Image src={image} alt="" layout="fill" unoptimized />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadField;
