import Navigation from "../navigation/Navigation";
import dynamic from 'next/dynamic';


const Header = () => {
  return (
    <div className="fixed top-0 w-full z-50   bg-white ">
    <Navigation />
  </div>
  );
};

export default Header;
