"use client";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";

import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useUser } from "./useUser";
interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const { data, isLoading } = useUser(id);
  
  if (isLoading) return <SkeletonLoader />;

  if (data?.isContractor) {
    return <ContractorProfile userData={data} id={id} />;
  } else {
    return <ApplicantProfile data={data} id={id} />;
  }
};

export default Profile;
