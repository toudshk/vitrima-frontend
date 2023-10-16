
import { MainIcon } from "../../common/icons/MainIcon";
import Navigation from "../navigation/Navigation";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-20  px-24 py-6 bg-primary ">
      <div className="max-w-screen-2xl mx-auto flex justify-between">
        <Link href="/">
          <MainIcon width={200} />
        </Link>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
