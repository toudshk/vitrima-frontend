import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import CarpenterForProject from "@/components/screens/project/finished-project/carpenters/list-carpenters/carpenter/CarpenterForProject";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <CarpenterForProject/>
    </>
  );
};

export default Page;
