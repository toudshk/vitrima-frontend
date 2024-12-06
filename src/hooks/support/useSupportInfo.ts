import { IContractor } from "@/components/shared/types/user.types";
import { UserService } from "@/services/user/user.service";
import { AxiosResponse } from "axios";
import { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";


export const useSupportInfo = () => {
    const queryData = useQuery(
      ["get support info"],
      () => UserService.getSupport("support"),
      {
        select: (response: AxiosResponse<any>) => response.data[0], // Обращаемся к `data`, а затем берем первый элемент массива
        onError(error) {
          console.log(error, "Get support");
        },
      }
    );
  
    return useMemo(() => ({ ...queryData }), [queryData]);
  };