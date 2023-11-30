"use client"

import { TypeComponentAuthFields } from "@/components/shared/types/auth.types";
import { store } from "@/store/store";
import { FC, useState } from "react";


import { ReduxProvider } from "../ReduxProvider";
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";

// eslint-disable-next-line react-hooks/rules-of-hooks
const queryClient = new QueryClient()

const MainProvider: FC<TypeComponentAuthFields> = ({ children }) => {
  return (
   
      <QueryClientProvider client={queryClient}>
        <ReduxProvider>
            <Header />
          {children}
          </ReduxProvider>
        
      </QueryClientProvider>
     
  );
};

export default MainProvider;
