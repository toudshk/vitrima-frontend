import { useQuery } from "react-query";
import { WorkService } from "@/services/work/work.service";

import { useParams } from "next/navigation";

export const useWork = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useQuery({
    queryKey: ["work", id],
    queryFn: async () => {
      const workData = await WorkService.getByContractor(id);
      const { data } = workData;
   
      return data;
    },
  });
  return { data, isLoading };
};
