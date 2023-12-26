"use client";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { BookOpenCheck, Briefcase, Contact, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Alert from "./Alert";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { getListingProgression } from "@/actions/userActions";
import { checkIfBusinessExists } from "@/actions/businessActions";

const OnBoardingTabs = () => {
  const {
    state: { showAlert },
  } = useFeatureContext();

  const router = useRouter();
  const url = usePathname();
  const { status } = useSession();

  const [exists, setExists] = useState(false);

  // const getProgression = async () => {
  //   const progress = await getListingProgression(data?.user.id as string);
  //   if (!progress) {
  //     setProgress(0);
  //   }
  //   setProgress(progress.progress);
  // };
  // useEffect(() => {
  // if (status === "unauthenticated") {
  //   return router.replace("/sign-in");
  // } else if (status === "authenticated") {
  //   getProgression();
  // }
  // switch (url) {
  //   case "/on-board/about":
  //     if (progress < 1) router.back();
  //   case "/on-board/support":
  //     if (progress < 2) router.back();
  //   case "/on-board/contacts":
  //     if (progress < 3) router.back();
  // }
  // }, []);

  const checkBusiness = async () => {
    const resp = await checkIfBusinessExists();
    if (resp) {
      setExists(true);
    } else {
      if (url === "/on-board/new") {
        router.back();
      }
      setExists(false);
    }
  };

  useEffect(() => {
    checkBusiness();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.back();
    }
  }, [status]);

  return (
    <div className="border-b border-gray-200 mb-4 md:mb-6">
      {showAlert && <Alert />}
      <ul className="flex flex-wrap -mb-px md:text-md text-sm font-semibold text-center text-gray-500 gap-2 md:gap-6 ">
        <li
          className={`${
            url === "/on-board" && "text-btn-orange"
          } me-2 hover:text-btn-orange`}
        >
          <Link
            href="/on-board"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg"
          >
            <Briefcase />
            Abn LookUp
          </Link>
        </li>
        {/* 
        <li
          className={`me-2 ${url === "/on-board/about" && "text-blue-800"} 
          `}
          // ${
          //   progress < 1 && "pointer-events-none"
          // }
        >
          <Link
            href="/on-board/about"
            aria-disabled={progress < 1}
            tabIndex={progress < 1 ? -1 : undefined}
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ay-300 group"
          >
            <BookOpenCheck />
            About
          </Link>
        </li>
        <li
          className={`me-2 ${url === "/on-board/support" && "text-blue-800"}  `}
          // ${
          //   progress < 2 && "pointer-events-none"
          // }
        >
          <Link
            href="/on-board/support"
            aria-disabled={progress < 2}
            tabIndex={progress < 2 ? -1 : undefined}
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ay-300 group"
          >
            <UserCog />
            Support
          </Link>
        </li> */}
        <li
          className={`me-2 ${url === "/on-board/new" && "text-btn-orange"} ${
            !exists && "pointer-events-none"
          }   hover:text-btn-orange`}
        >
          {/* <Link
            href="/on-board/contacts"
            aria-disabled={progress < 3}
            tabIndex={progress < 3 ? -1 : undefined}
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ay-300 group"
          >
            <Contact />
            Contacts
          </Link> */}
          <Link
            href="/on-board/new"
            aria-disabled={exists}
            tabIndex={!exists ? -1 : undefined}
            className="inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg "
          >
            <Contact />
            Business Page
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OnBoardingTabs;
