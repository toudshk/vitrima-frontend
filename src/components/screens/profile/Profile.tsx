"use client";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";
import { useAuth } from "@/hooks/useAuth";

interface ProfileProps {
  data: any;
  isLoading: boolean
}

const Profile: React.FC<ProfileProps> = ({ data, isLoading }) => {
const {user} = useAuth()

  if (user?.isContractor) {
    return <ContractorProfile userData={data} id={data?._id} isLoading={isLoading} />;
  
  } else {
    return <ApplicantProfile data={data} id={data?._id} isLoading={isLoading} />;

  }
};

export default Profile;

