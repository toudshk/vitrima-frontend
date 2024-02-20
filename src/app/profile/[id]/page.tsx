import Profile from "@/components/screens/profile/Profile";

export default async function Page({ params: { id } }: { params: { id: string } }) {
 

  return <Profile id={id} />;
}
