
import { useAuth } from "@/hooks/useAuth";
import { ProjectService } from "@/services/project/project.service";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";


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
