"use client";
import React, { FC, useEffect, useState } from "react";
import { useGallery } from "./UseGallery";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import MasonryGallery from "@/components/ui/masonry/MasonryGallery";
import { useSelector } from "react-redux";
import { selectFilter } from "@/store/work/filter.slice";
import { useInView } from "react-intersection-observer";

const Gallery: FC<{slug: string}> = ({slug}) => {
  

  const { ref, inView } = useInView();

  
  const { minPrice, maxPrice, subTypes, contractorType, buildingTechnique,location } = useSelector(selectFilter);
 
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
  useGallery(slug, { minPrice, maxPrice, subTypes, contractorType, buildingTechnique, location});
  
  useEffect(() => {
    const loadInitialPage = async () => {
      // Если компонент уже виден, загрузите первую страницу
      if (inView) {
      
        await fetchNextPage({
          pageParam: data!.pages[data!.pages.length - 1]!.pageParam + 1,
        });
      }
    };
  
    loadInitialPage(); // Вызовите функцию при монтировании компонента
  
    // Добавьте существующую логику для последующих изменений inView
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage({
        pageParam: data!.pages[data!.pages.length - 1]?.pageParam + 1,
      });
    }
  }, [inView, hasNextPage, fetchNextPage, data, isFetchingNextPage])
  const objects = data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <MasonryGallery data={objects} isLoading={isLoading}   />
      {data?.pages[data.pages.length - 1]?.data.length <= 5 ? (
        <h1 className="text-center text-[3vw] my-16 text-gray-450 select-none">На этом всё</h1>
      ) : (
        <button ref={ref} className="mt-1"/>
      )}
    </div>
  );
};

export default Gallery;
