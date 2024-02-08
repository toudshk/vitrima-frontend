
import { FC, useEffect, useRef, useState } from "react";
import ModalWindow from "./modal-window/ModalWindow";
import { DialogProps } from "@mui/material";
import Masonry from 'react-masonry-css'
import GalleryItem from "./GalleryItem";


const MasonryGallery: FC<{ data: any; isLoading: boolean  }> = ({
  data,
  isLoading,
  
}) => {
 
  const breakpointColumnsObj = {
    default: 6,
    900: 3,
  400:2,
  };

  
  const [workData, setWorkData] = useState();
  

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
    return <div>.</div>;
  }

  return (
    <Masonry breakpointCols={breakpointColumnsObj}  className="flex gap-3 mx-[1vw] ">
      {data.map((item) => (
        <GalleryItem item={item} key={item._id} handleWorkData={handleWorkData} handleClickOpen={handleClickOpen} />
      ))}
      <ModalWindow open={open} scroll={scroll} workData={workData} handleClose={handleClose} isLoading={isLoading}/>
    </Masonry>
  );
};

export default MasonryGallery;
