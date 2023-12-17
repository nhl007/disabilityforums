"use client";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { BookOpenCheck, Briefcase, Contact, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Alert from "./Alert";

const OnBoardingTabs = () => {
  const url = usePathname();
  const {
    state: { showAlert },
  } = useFeatureContext();

  return (
    <div className="border-b border-gray-200 mb-4 md:mb-6">
      {showAlert && <Alert />}
      <ul className="flex flex-wrap -mb-px md:text-md text-sm font-semibold text-center text-gray-500 gap-2 md:gap-6 ">
        <li className={`${url === "/on-board" && "text-btn-orange"} me-2`}>
          <Link
            href="/on-board"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 group"
          >
            <Briefcase />
            Abn LookUp
          </Link>
        </li>

        <li className={`${url === "/on-board/about" && "text-blue-800"} me-2`}>
          <Link
            href="/on-board/about"
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ay-300 group"
          >
            <BookOpenCheck />
            About
          </Link>
        </li>
        <li
          className={`${url === "/on-board/support" && "text-blue-800"} me-2`}
        >
          <Link
            href="/on-board/support"
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ay-300 group"
          >
            <UserCog />
            Support
          </Link>
        </li>
        <li
          className={`${url === "/on-board/contacts" && "text-blue-800"} me-2`}
        >
          <Link
            href="/on-board/contacts"
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ay-300 group"
          >
            <Contact />
            Contacts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OnBoardingTabs;
