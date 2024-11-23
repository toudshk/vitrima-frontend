import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
import { useQuery } from "react-query";

export const useProjects = (id:string) => {
   
    const { data, isLoading } = useQuery({
      queryKey: ["projects by applicant", id],
      queryFn: async () => {
        const workData = await ProjectService.getProjectsByApplicantId(id);
        const  data = workData;
     
        return data;
      },
    });
    return { data, isLoading };
  };
  