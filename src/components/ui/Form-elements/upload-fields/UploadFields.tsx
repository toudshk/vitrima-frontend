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
  imageIsUpload,
}) => {
  const { uploadImage, isLoading } = useUpload(onChange, imageIsUpload, folder);
  const container = document.querySelector('.uploadImageContainer');

  const [tempImage, setTempImage] = useState<string | ArrayBuffer | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

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
  const aspectRatioStyle = {
    aspectRatio: `${imageDimensions.width / imageDimensions.height}`,
  };
  

 
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };
  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadImageContainer}  style={aspectRatioStyle}>
        <label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className=""
          />

          {error && <div className={styles.error}>{error.message}</div>}
        </label>
        {tempImage !== null ? (
          isLoading ? (
            <SkeletonLoader className={styles.loader} />
          ) : (
            <Image
              src={tempImage as string}
              alt=""
              layout="fill"
              className={styles.imageWork}
              unoptimized
              onLoad={handleImageLoad}
            />
          )
        ) : (
          <div className={styles.uploadContainerSvg}>
            <Image src={imgChoosePhoto} alt="" />

            <p>Загружайте только те файлы, на которые у вас есть права.</p>
            <p>Не более 5МБ. </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default UploadField;