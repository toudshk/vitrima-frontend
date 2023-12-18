"use client"
import { UserService } from "@/services/user/user.service";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";

import { useQuery } from "react-query";

import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["user", id],
		queryFn: async (userId) => {
		  const userData = await UserService.getUserById(id);
		  const { data } = userData;
		 
	return data
      
    },
  });

  if (isLoading) return <SkeletonLoader />;


  if (data?.isContractor) {
    return <ContractorProfile userData={data} id={id}  />;
  } else {
    return <ApplicantProfile data={data} id={id} />;
  }
};

export default Profile;
