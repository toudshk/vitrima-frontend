
import { ProjectService } from "@/services/project/project.service";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export const useListCarpenter = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useQuery({
    queryKey: ["carpenter data", id],
    queryFn: async () => {
      const data = await ProjectService.getCarpenterByProjectId(id);
     
   
      return data;
    },
  });
  return { data, isLoading };
};
