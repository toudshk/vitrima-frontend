"use client";
import { WorkService } from "@/services/work/work.service";
import { useSearchParams } from "next/navigation";

import { useInfiniteQuery, useQuery } from "react-query";
import { IFilterInput } from "../filter/Filter.interface";
import { useEffect, useState } from "react";

export const useGallery = (slug: string, filters: IFilterInput) => {
  console.log(filters)
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["get works by workType", slug, filters],
      queryFn: async ({ pageParam = 1 }) => {
        
        const workData = await WorkService.getWorksWithPagination(
          slug,
          filters,
          pageParam
        );
        
        return workData;
      },
      getNextPageParam: (lastPage) => lastPage?.pages?.pageParam + 1,
    });

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};
