"use client";
import React, { FC, useEffect, useState } from "react";
import { useGallery } from "./UseGallery";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import MasonryGallery from "@/components/ui/masonry/MasonryGallery";
import { useSelector } from "react-redux";
import { selectFilter } from "@/store/work/filter.slice";
import { useInView } from "react-intersection-observer";
const Gallery: FC<{ slug: string }> = ({ slug }) => {
  const { ref, inView } = useInView();
  const {
    minPrice,
    maxPrice,
    subTypes,
    purposeTypes,
    contractorType,
    buildingTechnique,
    location,
  } = useSelector(selectFilter);

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGallery(slug, {
    minPrice,
    maxPrice,
    subTypes,
    purposeTypes,
    contractorType,
    buildingTechnique,
    location,
  });

  useEffect(() => {
    const loadInitialPage = async () => {
      if (inView && data?.pages && data.pages.length > 0) {
        const minPage = data.pages[data.pages.length - 1]?.pageParam + 1 || 1;
        await fetchNextPage({
          pageParam: minPage,
        });
      }
    };

    loadInitialPage();
  }, [inView, data, fetchNextPage]);

  const objects = data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <MasonryGallery data={objects} isLoading={isLoading} />
      {data?.pages[data.pages.length - 1]?.data.length <= 5 ? (
        <h1 className="text-center text-[3vw] my-16 text-gray-450 select-none">
          На этом всё
        </h1>
      ) : (
        <button ref={ref} className="mt-1" />
      )}
    </div>
  );
};

export default Gallery;
