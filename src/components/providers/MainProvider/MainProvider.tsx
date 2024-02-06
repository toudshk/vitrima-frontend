"use client";

import { FC } from "react";
import 'react-toastify/scss/main.scss'
import { ReduxProvider } from "../ReduxProvider";
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

// eslint-disable-next-line react-hooks/rules-of-hooks
const queryClient = new QueryClient();

const MainProvider: FC<{children: any}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      
      <ReduxProvider>
        <Header />
         <div className="mt-[7vh]">{children}</div>
      </ReduxProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default MainProvider;
