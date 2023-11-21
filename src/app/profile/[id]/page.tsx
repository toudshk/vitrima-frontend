import Profile from "@/components/screens/profile/Profile";
import { NextPageAuth } from "@/components/shared/types/auth.types";
import { IContractor } from "@/components/shared/types/user.types";
import { UserService } from "@/services/user/user.service";
import { GetStaticProps, NextPage } from "next";

export default async function page({ params: { id } }) {
  return <Profile id={id} />;
}
