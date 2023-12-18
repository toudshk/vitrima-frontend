import { IContractor } from "@/components/shared/types/user.types";
import { UserService } from "@/services/user/user.service";
import { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

export const useUserInfo = (id) => {
  const queryData = useQuery(
    ["user info for chat", id],
    () => UserService.getUserById(id),
    {
      select: (data) => data,
      onError(error) {
        console.log(error, "Get user");
      },
    }
  );

  return useMemo(() => ({ ...queryData }), [queryData]);
};