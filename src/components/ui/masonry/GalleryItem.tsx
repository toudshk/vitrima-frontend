import {FC}from 'react'

import Image from "next/image";
import { IWork } from '@/components/shared/types/work.types';
const GalleryItem:FC<{ item: IWork, handleWorkData: any, handleClickOpen: any }> = ({item, handleWorkData, handleClickOpen}) => {


  return (
    <div className=' mb-4'>
    
      <Image
      loading="lazy"
        width={600}
        height={800}
        src={item.images[0]}
        onClick={(e) => {
          handleWorkData(item);
          handleClickOpen('body');
        }}
        
        className="transition-all rounded-lg opacity-0 duration-700  transform-gpu hover:scale-[1.01] cursor-pointer hover:opacity-100"
 
 onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        alt={`Фотография работы ${item.title}`}
      />
    
  </div>
  )
}

export default GalleryItem