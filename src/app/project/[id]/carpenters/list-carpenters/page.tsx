import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import ListCarpenters from "@/components/screens/project/finished-project/carpenters/list-carpenters/ListCarpenters";
import Link from "next/link";

const Page: NextPageAuth = () => {
 

  return (
    <>
      <ListCarpenters/>
       </>
  );
};

export default Page;
