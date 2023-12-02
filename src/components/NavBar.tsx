import { PhoneCall, User, UserPlus } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const NavBar = () => {
  return (
    <MaxWidthWrapper>
      <nav className="flex flex-col">
        <div className="flex justify-between items-center py-2">
          <span className="flex gap-2">
            <PhoneCall />
            1300 2888 93
          </span>
          <div className="flex gap-4">
            <span className="flex gap-2">
              <User /> Login
            </span>
            <span className="flex gap-2">
              <UserPlus /> Register
            </span>
          </div>
        </div>
        <div className=" divide-solid border" />
        <div className="flex gap-7 h-[84px] items-center">
          <Link href="/">Logo</Link>
          <Link href="/">Get Started</Link>
          <Link href="/">About</Link>
          <Link href="/">Directory</Link>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default NavBar;
