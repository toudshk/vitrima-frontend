"use client";
import { useAuth } from "@/hooks/useAuth";
import { MessagesService } from "@/services/messages/messages.service";

import {  useMemo } from "react";
import { useQuery } from "react-query";


export const useMessages = (id: string) => {
  const { user } = useAuth();

  const queryData = useQuery(
    ["message list", id],
    () => MessagesService.getMessages(id),
    { select: (data) => data }
  );

//   const { mutateAsync: createAsync } = useMutation(
//     "create message",
//     (data: any) => MessagesService.createMessage(data)
//   );

  return useMemo(
    () => ({
      ...queryData,
      //createAsync,
    }),
    [queryData]
  );
};
