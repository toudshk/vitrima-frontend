import Navigation from "../navigation/Navigation";
import dynamic from 'next/dynamic';

const DynamicNavigationPage = dynamic(() => import('../navigation/Navigation'), { ssr: false });

const Header = () => {
  return (
    <div className="h-20  px-24 py-6 bg-primary">
      <div className="max-w-screen-[1736px] mx-auto flex justify-between">
        <DynamicNavigationPage />
      </div>
    </div>
  );
};

export default Header;
