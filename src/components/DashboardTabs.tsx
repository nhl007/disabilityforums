"use client";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import {
  ActivityIcon,
  BriefcaseIcon,
  CircleDollarSignIcon,
  PersonStandingIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Alert from "./Alert";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardTabs = () => {
  const {
    state: { showAlert },
  } = useFeatureContext();

  const router = useRouter();
  const url = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.replace("/");
    }
  }, [status]);

  return (
    <div className="border-b border-gray-200 mb-4 md:mb-6">
      {showAlert && <Alert />}
      <ul className="flex flex-wrap -mb-px md:text-md text-sm font-semibold text-center text-gray-500 gap-2 md:gap-6 ">
        <li>
          <Link
            href="/on-board"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg"
          >
            <BriefcaseIcon />
            Create/Edit Business Listing
          </Link>
        </li>
        <li
          className={`${
            url === "/dashboard" && "text-btn-orange"
          } me-2 hover:text-btn-orange`}
        >
          <Link
            href="/dashboard"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg"
          >
            <PersonStandingIcon />
            Profile/Account Settings
          </Link>
        </li>
        <li
          className={`${
            url === "/dashboard/payments" && "text-btn-orange"
          } me-2 hover:text-btn-orange`}
        >
          <Link
            href="/dashboard/payments"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg"
          >
            <CircleDollarSignIcon />
            Billing/Payments
          </Link>
        </li>
        <li
          className={`${
            url === "/dashboard/analytics" && "text-btn-orange"
          } me-2 hover:text-btn-orange`}
        >
          <Link
            href="/dashboard/analytics"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg"
          >
            <ActivityIcon />
            Analytics
          </Link>
        </li>
        <li
          className={`${
            url === "/dashboard/settings" && "text-btn-orange"
          } me-2 hover:text-btn-orange`}
        >
          <Link
            href="/dashboard/settings"
            className="me-2 inline-flex gap-2 items-center justify-center md:pr-4 py-4 border-b-2 border-transparent rounded-t-lg"
          >
            <SettingsIcon />
            Account Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardTabs;
