
import { ServicePriceService } from "@/services/service-price/servicePrice.service";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "react-query";

export const useServicesPrice = () => {
  const params = useParams();
  const {id} = params;
console.log(id)
  const queryData = useQuery(
    ["service-price list by other users"],
    () => ServicePriceService.getByContractor(id),
    {
      select: ({ data }) =>
        data.map((servicePrice) => ({
          _id: servicePrice._id,
          title: servicePrice.title,
          price: servicePrice.price,
        })),
      onError(error) {
        console.log(error, "tag list");
      },
    }
  );

  return useMemo(
    () => ({
      ...queryData,
    }),
    [queryData]
  );
};
