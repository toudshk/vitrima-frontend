import { IContractor } from "@/components/shared/types/user.types";
import { UserService } from "@/services/user/user.service";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

export const useUser = (setValue: UseFormSetValue<IContractor>) => {
    const params = useParams();
    const userId = params.id;
  
    const queryData = useQuery(
      ["user by id"],

      () => UserService.getUserById(userId),
      {
        onSuccess({ data }) {
            const fieldsToSet = ["email", "nickname", "image", "description"];

        // Пройдемся по массиву и установим значения для каждого поля
        fieldsToSet.forEach((field) => {
          if (data[field]) {
            setValue(field, data[field]);
          }
        });
        },
        onError(error) {
            console.log(error, 'Get user')
        },
        enabled: !!userId,
    }
    )
    return useMemo(() => ({ ...queryData }), [queryData]);
  };