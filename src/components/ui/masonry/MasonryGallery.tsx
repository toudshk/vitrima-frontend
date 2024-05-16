import { FC, useEffect, useRef, useState } from "react";
import ModalWindow from "./modal-window/ModalWindow";
import { DialogProps } from "@mui/material";
import Masonry from "react-masonry-css";
import GalleryItem from "./GalleryItem";

const MasonryGallery: FC<{ data: any; isLoading: boolean }> = ({
  data,
  isLoading,
}) => {
  const breakpointColumnsObj = {
    default: 6,
    900: 3,
    400: 2,
  };
  
  const [workData, setWorkData] = useState();

  const numObjects = 12;
  const fishArray = new Array(numObjects).fill({}); // Создаем массив из 6 пустых объектов

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("body");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
    // eslint-disable-next-line react-hooks/rules-of-hooks
   
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
    console.log(value.slug)
  
    setWorkData(value);
    setOpen(true);
   
  };

  if (!Array.isArray(data)) {
    // Handle the case where data is not an array (or is undefined)
    return <div>.</div>;
  }
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-3 mx-[1vw] "
    >
      {data.length !== 0
        ? data.map((item) => (
            <GalleryItem
              item={item}
              key={item._id}
              handleWorkData={handleWorkData}
              handleClickOpen={handleClickOpen}
            />
          ))
        : fishArray.map((object, index) => (
            <div
              key={index}
              className=" h-64 rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, transparent 100%)",
              }}
            ></div>
          ))}

      <ModalWindow
        open={open}
       
        scroll={scroll}
        workData={workData}
        handleClose={handleClose}
      
      />
    </Masonry>
  );
};

export default MasonryGallery;
