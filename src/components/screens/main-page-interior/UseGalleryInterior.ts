"use client"
import { WorkService } from '@/services/work/work.service'
import { useSearchParams } from 'next/navigation'
 
import { useQuery } from 'react-query'
import { IFilterInput } from '../filter/Filter.interface';


export const useGalleryInterior = (slug: string, filters: IFilterInput) => {

  const { data, isLoading } = useQuery({
    queryKey: ["get works by workType", slug, filters],
    queryFn: async () => {
      const workData = await WorkService.getWorkByWorkType(slug, filters);
     
      return workData;
    },
  });
  
  
  return { data, isLoading };
  };
