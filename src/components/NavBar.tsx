"use client";

import { Phone, User, UserPlus } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ProfileMenu from "./ProfileMenu";
import { useSession } from "next-auth/react";
import MobileNav from "./MobileNavMenu";

const NavBar = () => {
  const { status } = useSession();
  return (
    <MaxWidthWrapper>
      <nav className="flex flex-col relative font-semibold">
        <div className=" self-end flex items-center py-2 h-[40px]">
          {/* <Link
            href="tel:09999999"
            className="flex gap-1 items-center hover:text-btn-orange"
          >
            <Phone size={18} />
            1300 2888 93
          </Link> */}
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
              <Link
                href="/sign-up"
                className="flex gap-1 items-center hover:text-btn-orange"
              >
                <UserPlus size={18} /> Register
              </Link>
            </div>
          )}
        </div>
        <div className=" divide-solid border" />
        <div className="flex gap-7 h-[48px] md:h-[84px] justify-between md:justify-start items-center">
          <Link className=" hover:text-btn-orange" href="/">
            Home
          </Link>
          <div className=" hidden md:flex items-center gap-7">
            {/* <Link
              className=" hover:text- px-6 py-3 bg-btn-orange hover:bg-txt-blue hover:text-white rounded-lg"
              href="/"
            >
              Get Started
            </Link> */}

            <Link className=" hover:text-btn-orange" href="/directory">
              Directory
            </Link>
          </div>
          <MobileNav />
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default NavBar;
