import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import Drawings from "@/components/screens/project/finished-project/drawings/Drawings";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <Drawings/>
    </>
  );
};

export default Page;
