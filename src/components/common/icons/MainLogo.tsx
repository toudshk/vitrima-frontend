import icon from "@/app/assets/images/MainLogo.svg";
import mobileIcon from "@/app/assets/images/WhiteIconLogo.svg"
import Image from "next/image";
import { FC, useEffect, useState } from "react";



export const MainLogo: FC<{ height: number }> = ({ height }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Очистка слушателя события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Выбор фотографии в зависимости от ширины окна
  const src = windowWidth <= 600 ? mobileIcon : icon;

  return (
    <Image
      height={height}
      src={src}
      alt="Vitrima"
      draggable={false}
    />
  );
};
export default MainLogo;