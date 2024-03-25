"use client"
import Profile from "@/components/screens/profile/Profile";
import { useUser } from "@/components/screens/profile/useUser";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading } = useUser(id);

 
 if (isLoading) return <SkeletonLoader />;

  
  return <Profile data={data} />;
}
