"use client";

import UnsubscribeModal from "@/components/screens/unsubscribe/UnsubscribeModal";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { user } = useAuth();
 
  return <UnsubscribeModal/>
};

export default Page;