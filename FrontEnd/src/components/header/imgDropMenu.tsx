import React, { useRef } from "react";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setSignOut } from "@/redux/actions/sessionAction";

const ImgDropMenuItem: React.FC<{ href?: string; val: string }> = ({
  href = "#",
  val,
}) => {
  return (
    <li>
      <a
        href={href}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
      >
        {val}
      </a>
    </li>
  );
};

const ImgDropMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      id="dropdown"
      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2 ml-[-130px]"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <ImgDropMenuItem href="/home" val="Home" />
        <ImgDropMenuItem href="/settings" val="Settings" />
        <li>
          <button
            onClick={() => {
              dispatch(setSignOut());
              signOut();
            }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer w-full text-start"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ImgDropMenu;
