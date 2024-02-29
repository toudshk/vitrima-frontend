"use client";
import ContractorProfile from "./contractor-profile/ContractorProfile";

import ApplicantProfile from "./applicant-profile/ApplicantProfile";

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

