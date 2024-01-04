"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const ProfileMenu = () => {
  const { data } = useSession();

  const [menu, setMenu] = useState(false);

  return (
    <div>
      <button onClick={() => setMenu((prev) => !prev)}>
        {data?.user.image ? (
          <Image
            id="avatarButton"
            height={32}
            width={32}
            className="w-8 h-8 rounded-full"
            src={data.user.image}
            alt="User dropdown"
          />
        ) : (
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-400">
            <span> {data?.user.name?.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </button>
      {menu && (
        <div className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <div className="flex flex-col px-4 py-3 text-sm text-gray-900 ">
            <span className=" text-lg font-bold">
              {data?.user.name?.toLocaleUpperCase()}
            </span>
            <span className="font-medium truncate">{data?.user.email}</span>
          </div>
          <div
            className="py-2 text-sm text-gray-700"
            aria-labelledby="avatarButton"
          >
            <Link
              href="/dashboard"
              className="block px-4 py-2 hover:bg-btn-orange"
              onClick={() => setMenu(false)}
            >
              Dashboard
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={() => {
                setMenu(false);
                signOut({ redirect: false });
              }}
              className="block px-4 py-2 text-sm text-gray-700 w-full text-start hover:bg-btn-orange "
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
