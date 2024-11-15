"use client";

import { ITableItem } from "@/components/ui/Admin-table/AdminTable/table.interface";
import { getAdminUrl } from "@/config/url.config";
import { useDebounce } from "@/hooks/useDebounce";
import { UserService } from "@/services/user/user.service";
import { convertMongoDate } from "@/utils/date/ConverMongoDate";
import { getKeys } from "@/utils/object/getKeys";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

export const useWorkers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryData = useQuery(
    ["worker list", debouncedSearch],
    () => UserService.getWorkers(debouncedSearch),
    {
      select: ({ data }) => data[0],
      onError(error) {
        console.log(error, "user list");
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
    }),
    [queryData, searchTerm]
  );
};
