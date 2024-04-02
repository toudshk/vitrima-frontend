"use client"
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
  const [currentImage, setCurrentImage] = useState(image)
  useEffect(() => {
    setCurrentImage(uploadImage);
  }, [onChange]);

  return (
    <div
      className={cn(styles.field, styles.uploadField)}
      style={style}
      
    >
      <div className={styles.uploadImageContainer}>
     
          <div className={styles.changePhotoOverlay}>
            <label>
              <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={uploadImage} /> <PhotoCameraOutlinedIcon />
            </label>
          </div>
        
          {currentImage === "" ? (
          <Image width={72} height={72} src={baseAvatar} alt="Аватар" />
        ) : (
          <Image width={72} height={72} src={image} alt="Аватар" />
        )}

      </div>
    </div>
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
