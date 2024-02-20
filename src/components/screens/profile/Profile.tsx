"use client";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";

import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useUser } from "./useUser";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const { data, isLoading } = useUser(id);
  const {user} = useAuth()
  

  if (isLoading) return <SkeletonLoader />;


  if(!user){
    redirect('/')
  }

  if (data?.isContractor) {
    return <ContractorProfile userData={data} id={id} />;
  } else {
    return <ApplicantProfile data={data} id={id} />;
  }
};

export default Profile;
