
import dynamic from 'next/dynamic';

const DynamicFirstPage = dynamic(() => import('../components/screens/first-page/FirstPage/FirstPage'), { ssr: false });

export default function Home() {
  
  return (
    <DynamicFirstPage  />
  );
}
