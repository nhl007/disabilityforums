import { PhoneCall, User, UserPlus } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ProfileMenu from "./ProfileMenu";
// import Image from "next/image";

const NavBar = () => {
  return (
    <MaxWidthWrapper>
      <nav className="flex flex-col relative">
        <div className="flex justify-between items-center py-2">
          <Link href="tel:09999999" className="flex gap-2">
            <PhoneCall />
            1300 2888 93
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/sign-in" className="flex gap-2">
              <User /> Login
            </Link>
            <Link href="/register" className="flex gap-2">
              <UserPlus /> Register
            </Link>
            <ProfileMenu />
          </div>
        </div>
        <div className=" divide-solid border" />
        <div className="flex gap-7 h-[84px] items-center">
          <Link href="/">Logo</Link>
          <Link href="/">Get Started</Link>
          <Link href="/">About</Link>
          <Link href="/business">Directory</Link>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default NavBar;
