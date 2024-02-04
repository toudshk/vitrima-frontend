import { IContractor } from "@/components/shared/types/user.types";
import { UserService } from "@/services/user/user.service";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";

export const useUser = (id: string ) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const userData = await UserService.getUserById(id);
      const { data } = userData;

      return data;
    },
  });

  

  return { data, isLoading };
}