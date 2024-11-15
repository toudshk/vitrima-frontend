import React from "react";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { Metadata } from "next";
import Project from "@/components/screens/project/Project";

const Page: NextPageAuth = () => {
 

  return (
    <>
       <Project/>
    </>
  );
};

export default Page;
