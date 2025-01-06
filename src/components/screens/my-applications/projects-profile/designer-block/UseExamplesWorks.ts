import { useQuery } from "react-query";
import { WorkService } from "@/services/work/work.service";

export const useExamplesWorks = (designerId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get examples of works", designerId],
    queryFn: async () => {
      const workData = await WorkService.getByContractor(designerId);
      return workData.data.slice(0, 6); // Возвращаем только первые 6 объектов
    },
  });

  return { data, isLoading };
};

