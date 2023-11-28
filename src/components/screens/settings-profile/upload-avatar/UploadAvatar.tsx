import cn from "clsx";
import Image from "next/image";
import { CSSProperties, FC } from "react";

import styles from "./UploadAvatar.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { FieldError } from "react-hook-form";
import { useUpload } from "@/components/ui/Form-elements/upload-fields/useUpload";
import baseAvatar from "@/app/assets/images/base-avatar.jpg";
export interface IUploadField {
  folder?: string;
  image?: string;
  onChange: (...event: any[]) => void;
  placeholder: string;
  error?: FieldError;
  style?: CSSProperties;
  title: string;
  isNoImage?: boolean;
  images?: string[];
}

const UploadAvatar: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  image,
  folder,
  onChange,
  isNoImage = false,
}) => {
  const { uploadImage, isLoading } = useUpload(onChange, folder);

  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadImageContainer}>
        {isNoImage ? (
          <Image src={baseAvatar} alt="" />
        ) : (
          <Image width={72} height={72} src={image} alt=""  unoptimized />
        )}
      
      </div>
      <label>
        <input type="file" onChange={uploadImage} />
        {error && <div className={styles.error}>{error.message}</div>}
      </label>
    </div>
  );
};

export default UploadAvatar;
