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
  setImageIsUpload,
    image
}) => {
  const { uploadImage, isLoading } = useUpload(onChange,  folder);
  const container = document.querySelector('.uploadImageContainer');
console.log(image.length)
  const [tempImage, setTempImage] = useState<string | ArrayBuffer | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setImageIsUpload(true)
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
      <div className={cn(styles.uploadImageContainer, image.length === 0 &&  styles.uploadImageContainerWithoutImage)}  style={aspectRatioStyle}>
      <label >
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className=""
          />

          {error && <div className={styles.error}>{error.message}</div>}
        </label>
        {image.length !== 0 ? (
          isLoading ? (
            <SkeletonLoader className={styles.loader} />
          ) : (
            <Image
              src={image.length > 1 ? image : image[0]}
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