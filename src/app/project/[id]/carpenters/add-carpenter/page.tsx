import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import AddCarpenterForProject from "@/components/screens/project/finished-project/carpenters/list-carpenters/add-carpenter/AddCarpenterForProject";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <AddCarpenterForProject/>
    </>
  );
};

export default Page;
