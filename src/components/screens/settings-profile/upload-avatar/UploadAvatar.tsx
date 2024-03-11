import cn from "clsx";
import Image from "next/image";
import { CSSProperties, FC, useEffect, useState } from "react";
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import styles from "./UploadAvatar.module.scss";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { FieldError } from "react-hook-form";
import { useUpload } from "@/components/ui/Form-elements/upload-fields/useUpload";
import baseAvatar from "@/app/assets/images/base-avatar.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "../../profile/useUser";
export interface IUploadField {
  folder?: string;
  image?: any;
  onChange: (...event: any[]) => void;
  placeholder: string;
  error?: FieldError;
  style?: CSSProperties;
  title: string;
  isNoImage?: boolean;
  images?: any;
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
  console.log(image)
  const { uploadImage } = useUpload(onChange, folder);
  const {user} = useAuth()
  const { data } = useUser(user!._id);
  return (
    <div
      className={cn(styles.field, styles.uploadField)}
      style={style}
      
    >
      <div className={styles.uploadImageContainer}>
     
          <div className={styles.changePhotoOverlay}>
            <label>
              <input type="file" onChange={uploadImage} /> <PhotoCameraOutlinedIcon />
            </label>
          </div>
        
        <Image
      
          width={72}
          height={72}
          src={isNoImage ? baseAvatar : image}
          alt=""
          unoptimized
        />

      </div>
    </div>
  );
};

export default UploadAvatar;
