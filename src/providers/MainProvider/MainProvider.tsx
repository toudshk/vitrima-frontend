"use client"

import { TypeComponentAuthFields } from "@/components/shared/types/auth.types";
import { store } from "@/store/store";
import { FC } from "react";


import { ReduxProvider } from "../ReduxProvider";
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
