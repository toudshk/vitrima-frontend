"use client";
import cn from "clsx";
import Image from "next/image";
import { CSSProperties, FC, useEffect, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
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
  isLoading: boolean;
}
const UploadAvatar: FC<IUploadField> = ({
  placeholder,
  error,
  style,
  image,
  folder,
  onChange,
  isNoImage = false,
  isLoading,
}) => {
  const { uploadImage, isLoading: uploadLoading } = useUpload(onChange, folder);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader
          width={"100px"}
          height={"100px"}
          borderRadius={"100px"}
        />
      ) : (
        <div className={cn(styles.field, styles.uploadField)} style={style}>
          <div className={styles.uploadImageContainer}>
            <div className={styles.changePhotoOverlay}>
              <label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={uploadImage}
                />{" "}<div className={styles.iconCamera}>
                <PhotoCameraOutlinedIcon height={100}/>
                </div>
              </label>
            </div>
            <div className={styles.borderImage}>
              {image === "" ? (
                <Image width={200} height={200} src={baseAvatar} alt="Аватар" />
              ) : (
                <Image width={200} height={200} src={image} alt="Аватар" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadAvatar;

// // export default UploadAvatar;
// const UploadField: FC<IUploadField> = ({
//   placeholder,
//   error,
//   style,
//   image,
//   folder,
//   onChange,
//   isNoImage = false,
// }) => {
//   const { uploadImage, isLoading } = useUpload(onChange, folder);

//   return (
//     <div
//           className={cn(styles.field, styles.uploadField)}
//           style={style}

//         >
//           <div className={styles.uploadImageContainer}>

//               <div className={styles.changePhotoOverlay}>
//                 <label>
//                   <input type="file" onChange={uploadImage} /> <PhotoCameraOutlinedIcon />
//                 </label>
//               </div>

//               {isLoading ? (
// 							<SkeletonLoader count={1} className="w-full h-full" />
// 						) : (
// 							image ? <Image src={image} alt="" layout="fill" unoptimized /> :   <Image src={baseAvatar} alt="" layout="fill" unoptimized />
// 						)}

//           </div>
//         </div>
//   );
// };

// export default UploadField;
