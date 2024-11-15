import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import FurnitureDrawingsForm from "@/components/screens/project/finished-project/carpenters/furniture-drawings/FurnitureDrawings";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <FurnitureDrawingsForm/>
    </>
  );
};

export default Page;
