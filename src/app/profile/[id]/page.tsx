"use client";
import Profile from "@/components/screens/profile/Profile";
import { useUser } from "@/components/screens/profile/useUser";
import SkeletonLoader from "@/components/ui/skeleton-loader/skeletonLoader";
import { useParams } from 'next/navigation'
 
export default function Page() {
  const params = useParams()
  
  let userId = params.id
  const { data, isLoading } = useUser(userId);


  return <Profile data={data} isLoading={isLoading} />
 
}
