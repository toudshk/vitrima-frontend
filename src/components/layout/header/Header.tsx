import Navigation from "../navigation/Navigation";
import dynamic from 'next/dynamic';

const DynamicNavigationPage = dynamic(() => import('../navigation/Navigation'), { ssr: false });

const Header = () => {
  return (
    <div className="bg-primary">
      <div className="max-w-[1736px] mx-auto   h-20   ">
        <DynamicNavigationPage />
        </div>
    </div>
  );
};

export default Header;
