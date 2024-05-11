"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ImgDropMenu from "./imgDropMenu";
import { redirect } from "next/dist/server/api-utils";

interface SignBtnInterface {
  val: string;
  onC: () => any;
}

const SignBtn: React.FC<SignBtnInterface> = ({ val, onC }) => {
  return (
    <div
      onClick={onC}
      title=""
      className="py-2 px-4 rounded-full text-base font-medium focus:text-blue-600 cursor-pointer mx-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-2 align-middle"
    >
      {val}
    </div>
  );
};

interface ProfImgInt {
  imgSrc?: string | null;
}

export const ProfImg: React.FC<ProfImgInt> = ({ imgSrc }) => {
  var iSrc: string = "/def_user.jpg";
  const size = 40;
  if (!(imgSrc == null || imgSrc == undefined)) {
    iSrc = imgSrc;
  }
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={() => toggleDropdown()} className="mr-5" ref={dropdownRef}>
      <div
        className="rounded-full border-2 hover:border-teal-600 active:border-teal-600 border-gray-400 overflow-hidden"
        style={{ height: size, width: size }}
      >
        <img
          src={iSrc}
          alt="User Image"
          style={{ objectFit: "fill" }}
          className="w-full h-full"
        />
      </div>
      {isOpen && <ImgDropMenu></ImgDropMenu>}
    </div>
  );
};

const SignInOrLogo: React.FC = () => {
  const { status, data } = useSession();
  if (data?.user.public_key != undefined) console.log(data?.user.public_key);
  else {
    console.log("No public key");
  }
  const {
    name = undefined,
    email = undefined,
    image = undefined,
  }: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } = data?.user || {};
  var x =
    status == "authenticated" ? (
      <ProfImg imgSrc={image} />
    ) : (
      <div className="flex align-baseline">
        <SignBtn
          val="Sign in"
          onC={() => {
            window.location.href = "/";
          }}
        />
        <SignBtn
          val="Sign Up"
          onC={() => (window.location.href = "/signup")}
        ></SignBtn>
      </div>
    );
  return <div className="flex space-y-2 align-center">{x}</div>;
};
export default SignInOrLogo;
