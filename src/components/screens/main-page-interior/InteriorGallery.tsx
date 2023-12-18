"use client"
import React, { FC, useState } from 'react'
import { useGalleryInterior } from './UseGalleryInterior'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import MasonryGallery from '@/components/ui/masonry/MasonryGallery'
import { useSelector } from 'react-redux'
import { selectFilter } from '@/store/work/filter.slice'



const InteriorGallery:FC = () => {
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const router = useRouter();

  if (!user) {
    router.push("/");
  }

  const slug = 'interior'
  const { minPrice, maxPrice, subTypes } = useSelector(selectFilter);
  const {data, isLoading} = useGalleryInterior(slug, { minPrice, maxPrice, subTypes })
 

 


  return (
    
    <div>
      
      <MasonryGallery data={data} isLoading={isLoading}/>
    </div>
  )
}

export default InteriorGallery