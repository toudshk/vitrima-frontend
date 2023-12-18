"use client"
import { WorkService } from '@/services/work/work.service'
import { useSearchParams } from 'next/navigation'
 
import { useQuery } from 'react-query'


export const useSimilarWorks = (subTypes: string[]) => {

  const { data, isLoading } = useQuery({
    queryKey: ["get similar works", subTypes],
    queryFn: async () => {
      const workData = await WorkService.getSimilarWorks(subTypes);
      return workData;
    },
  });
  
  
  return { data, isLoading };
  };
