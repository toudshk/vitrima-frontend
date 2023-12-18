import { IWork } from "@/components/shared/types/work.types";
import Masonry from "@mui/lab/Masonry";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import SkeletonLoader from "../skeleton-loader/skeletonLoader";
import ModalWindow from "./ModalWindow";
import { DialogProps } from "@mui/material";


const MasonryGallery: FC<{ data: IWork[]; isLoading: any }> = ({
  data,
  isLoading,
}) => {
  const getRandomDimension = () => {
    // Generate random dimensions, you can adjust the range as needed

    const height = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    return { height };
  };


  
  const [workData, setWorkData] = useState();
  console.log(workData)

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('body');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);

  };
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const handleWorkData = (value: any) => {
    setWorkData(value);
    setOpen(true);
  };



  if (!Array.isArray(data)) {
    // Handle the case where data is not an array (or is undefined)
    return <div>No data available.</div>;
  }

  return (
    <Masonry columns={6} spacing={2}>
      {data.map((item, index) => (
        <div key={item._id}>
          {isLoading ? (
            // Render skeleton loader while data is loading
            <SkeletonLoader {...getRandomDimension()} />
          ) : (
            // Render the image if it's available, otherwise render the skeleton loader

            <Image
              width={350}
              height={100}
              src={item.images[0]}
              onClick={(e) => {
                handleWorkData(item);
                handleClickOpen('body');
              }}
              alt={`Фотография работы ${item.title}`}
            />
          )}
        </div>
      ))}
      <ModalWindow open={open} scroll={scroll} workData={workData} handleClose={handleClose} isLoading={isLoading}/>
    </Masonry>
  );
};

export default MasonryGallery;
