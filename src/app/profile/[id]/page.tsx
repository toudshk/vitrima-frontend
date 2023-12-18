import Profile from "@/components/screens/profile/Profile";


export default async function page({ params: { id } }: { params: { id: string } }) {

	
  return <Profile id={id} />;
}
