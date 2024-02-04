import { ITableItem } from "@/components/ui/Admin-table/AdminTable/table.interface";
import { getServicePrice } from "@/config/api.config";

import { useAuth } from "@/hooks/useAuth";

import { ServicePriceService } from "@/services/service-price/servicePrice.service";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IServicePriceEditInput } from "./service-price-edit/edit-servicePrice.interface";
import { SubmitHandler } from "react-hook-form";

export const useServicePrice = () => {
  const router = useRouter();
  const { user } = useAuth();
  const id = user?._id;
  const [searchTerm, setSearchTerm] = useState("");

  const queryData = useQuery(
    ["service-price list"],
    () => ServicePriceService.getByContractor(id),
    {
      select: ({ data }) =>
        data.map(
          (servicePrice): ITableItem => ({
            _id: servicePrice._id,
            editUrl: getServicePrice(`service-price/edit/${servicePrice._id}`),

            title: servicePrice.title,
            price: servicePrice.price,
          })
        ),
      onError(error) {
        toast.error(error);
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: createAsync } = useMutation(
    "create service-price",
    async (data: IServicePriceEditInput) => {
		
      const priceAsNumber = parseFloat(data.price);

      const updatedData: IServicePriceEditInput = {
        ...data,
        contractorId: id as string,
        price: priceAsNumber,
      };

      try {
	
        await ServicePriceService.create(updatedData);
      } catch (error) {
		
        toast.error(error);
      }
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    "delete tag",
    (tagId: string) => ServicePriceService.delete(tagId),
    {
      onError(error) {
        toast.error(error);
        //toastError(error, 'Delete tag')
      },
      onSuccess() {
        queryData.refetch();
      },
    }
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit: SubmitHandler<IServicePriceEditInput> = async (data) => {
    await createAsync(data);
  };

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
    onSubmit,
    }),
    [queryData, searchTerm, deleteAsync, onSubmit]
  );
};
