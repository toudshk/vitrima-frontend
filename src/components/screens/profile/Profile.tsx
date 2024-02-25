"use client";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";

import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useUser } from "./useUser";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
interface ProfileProps {
  data: any;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {


  

  if (data?.isContractor) {
    return <ContractorProfile userData={data} id={data._id} />;
  } else {
    return <ApplicantProfile data={data} id={data._id} />;
  }
};

export default Profile;

