"use client"
import Profile from "@/components/screens/profile/Profile";
import { useUser } from "@/components/screens/profile/useUser";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading } = useUser(id);


 const {user} = useAuth()
 
 if (isLoading) return <SkeletonLoader />;

  if(!user){
    redirect('/')
  }
  return <Profile data={data} />;
}
