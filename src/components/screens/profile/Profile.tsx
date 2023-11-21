import { errorCatch } from "@/api/api.helpers";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { IContractor } from "@/components/shared/types/user.types";
import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/user/user.service";
import ContractorProfile from "./contractor-profile/ContractorProfile";
import { FC } from "react";
import { WorkService } from "@/services/work/work.service";

const Profile: FC<{ id: string }> = async ({ id }) => {
	try {
		const response = await UserService.contractorById(id);
		const works = await WorkService.getByContractor(id)
	
		if (response.data.isContractor) {
		  return <ContractorProfile works={works.data} data={response.data} />
		} else {
		  return <div>{response.data.email}</div>;
		}
	  } catch (error) {
		console.error(error);
		return <div>Такого пользователя не существует</div>;
	  }
};

export default Profile;
