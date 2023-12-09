"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileMenu = () => {
  const { data } = useSession();
  const [menu, setMenu] = useState(false);

  if (!data?.user) return null;

  return (
    <div>
      <button onClick={() => setMenu((prev) => !prev)}>
        <Image
          id="avatarButton"
          height={40}
          width={40}
          className="w-10 h-10 rounded-full"
          src="https://disabilityforums.com.au/user_avatar/disabilityforums.com.au/nihal/96/13_2.png"
          alt="User dropdown"
        />
      </button>
      {menu && (
        <div className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <div className="px-4 py-3 text-sm text-gray-900 ">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="avatarButton"
          >
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
