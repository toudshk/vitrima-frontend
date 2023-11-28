"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { IServicePriceEditInput } from "./edit-servicePrice.interface";
import { useAuth } from "@/hooks/useAuth";
import { ServicePriceService } from "@/services/service-price/servicePrice.service";
import { getKeys } from "@/utils/object/getKeys";
import { useParams } from "next/navigation";

export const useServicePriceEdit = (
  setValue: UseFormSetValue<IServicePriceEditInput>
) => {
  const { user } = useAuth();
  const pathname = useParams();
  const id = String(pathname.id);
const router = useRouter()
  const { isLoading } = useQuery(
    ["service-price", id],
    () => ServicePriceService.getById(id),
    {
		onSuccess({ data }) {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
      onError(error) {
        console.log(error, "Редактирование услуги");
      },
      enabled: !!user?._id,
    }
  );

  const { mutateAsync } = useMutation(
    "update service-price",
    (data: IServicePriceEditInput) => {
      // Добавляем айди пользователя в данные
      const updatedData = {
        ...data,
        contractorId: user?._id,
      };
      console.log(updatedData);
      return ServicePriceService.update(id, updatedData);
    },
    {
      onError(error) {
        console.log(error, "Update serviceprice");
      },
      onSuccess() {
        console.log("Update serviceprice", "update was successful");
		router.push('/contractor/settings#works')
      },
    }
  );

  const onSubmit: SubmitHandler<IServicePriceEditInput> = async (data) => {
	const numericPrice = parseFloat(data.price);

    // Передать на сервер с числовым значением
    await mutateAsync({ ...data, price: numericPrice });
  };

  return { onSubmit, isLoading };
};
