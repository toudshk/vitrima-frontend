
import { UserService } from "@/services/user/user.service";
import ContractorProfile from "./contractor-profile/ContractorProfile";
import { FC } from "react";
import { WorkService } from "@/services/work/work.service";
import ApplicantProfile from "./applicant-profile/ApplicantProfile";

const Profile: FC<{ id: string }> = async ({ id }) => {

	
	try {
		
		const response = await UserService.getUserById(id) ;
		const works = await WorkService.getByContractor(id)
 		if (response.data.isContractor) {
		  return <ContractorProfile works={works.data} data={response.data} id={id}/>
		} else{

		  return <div><ApplicantProfile data={response.data}  id={id}/></div>;
		}

	  } catch (error) {
		console.error(error);
		return <div>Такого пользователя не существует</div>;
	  }
};

export default Profile;
