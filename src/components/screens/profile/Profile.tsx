"use client";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useUser } from "./useUser";



const Profile: React.FC = () => {
  const params = useParams()
  
  let userId = params.id
  const { data, isLoading } = useUser(userId);

    return (
      <>
      {data?.isContractor ? (
        <ContractorProfile userData={data} id={data?._id} isLoading={isLoading} />
      ) : (
        <ApplicantProfile data={data} id={data?._id} isLoading={isLoading} />
      )}
    </>
    );

};

export default Profile;
