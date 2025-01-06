"use client";
import MyApplications from "@/components/screens/my-applications/MyApplications";
import ProjectsProfile from "@/components/screens/my-applications/projects-profile/ProjectsProfile";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { redirect, useRouter } from "next/navigation";

const Page: NextPageAuth = () => {
  const { user } = useAuth();
 
  if (!user) {
    redirect("/");
  }
  
  ProjectsProfile
  return <ProjectsProfile/>
};

export default Page;
