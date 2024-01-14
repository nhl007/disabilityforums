"use client";

import { User, UserPlus } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ProfileMenu from "./ProfileMenu";
import { useSession } from "next-auth/react";
// import MobileNav from "./MobileNavMenu";

const NavBar = () => {
  const { status } = useSession();
  return (
    <MaxWidthWrapper>
      <nav className="flex flex-col relative font-semibold">
        <div className=" self-end flex items-center py-2 h-[40px]">
          {status === "authenticated" ? (
            <ProfileMenu />
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/sign-in"
                className="flex gap-1 items-center hover:text-btn-orange"
              >
                <User size={18} /> Login
              </Link>
              {/* <Link
                href="/sign-up"
                className="flex gap-1 items-center hover:text-btn-orange"
              >
                <UserPlus size={18} /> Register
              </Link> */}
            </div>
          )}
        </div>
        <div className=" divide-solid border" />
        <div className="flex gap-3 md:gap-7 h-[48px] md:h-[84px] justify-start items-center">
          <Link className=" hover:text-btn-orange" href="/directory">
            Directory
          </Link>

          <Link className=" hover:text-btn-orange" href="/list-business">
            List Business
          </Link>
          {/* <MobileNav /> */}
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default NavBar;
