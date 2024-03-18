"use client";

import { FC, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { ReduxProvider } from "../ReduxProvider";
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation'
 
import { useActions } from "@/hooks/useActions";
const animation = {
  hidden: {
  
    opacity: 0,
  },
  visible: {
  
    opacity: 1,
  },
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const queryClient = new QueryClient();

const MainProvider: FC<{ children: any }> = ({ children }) => {
  const pathname = usePathname()
console.log(pathname)  // Определяем, является ли текущий путь главной страницей
  
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
      {pathname !== '/' &&  <Header />}
        <motion.div
          className="mt-[7vh]"
          variants={animation}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      </ReduxProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default MainProvider;