
import icon from "@/app/assets/images/MainLogo.svg";
import mobileIcon from "@/app/assets/images/WhiteIconLogo.svg"
import Image from "next/image";
import { FC, useEffect, useState } from "react";



export const MainLogo: FC<{ height: number }> = ({ height }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Check if window is defined before adding event listener
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    // Cleanup listener on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Choose the photo based on window width
  const isMobile = windowWidth <= 600;
  const src = isMobile ? mobileIcon : icon;
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