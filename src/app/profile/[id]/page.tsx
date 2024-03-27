"use client";
import Profile from "@/components/screens/profile/Profile";
import { useUser } from "@/components/screens/profile/useUser";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading } = useUser(id);

  return <Profile data={data} isLoading={isLoading} />;
}
