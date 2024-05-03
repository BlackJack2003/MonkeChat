import React, { useRef } from "react";
import { signOut } from "next-auth/react";

const ImgDropMenu: React.FC = () => {
  return (
    <div
      id="dropdown"
      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2 ml-[-130px]"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Settings
          </a>
        </li>
        <li>
          <div
            onClick={() => signOut()}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ImgDropMenu;
