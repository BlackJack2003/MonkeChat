"use client";
import React, { useState, useRef, useEffect } from "react";
import ImgDropMenu from "./imgDropMenu";
import { useAppSelector } from "@/redux/hooks/hooks";
import { signOut } from "next-auth/react";

interface SignBtnInterface {
  val: string;
  onC: () => any;
}

const SignBtn: React.FC<SignBtnInterface> = ({ val, onC }) => {
  return (
    <button
      onClick={() => {
        // signOut();
        onC();
      }}
      title=""
      className="py-2 px-4 rounded-full text-base font-medium focus:text-blue-600 cursor-pointer mx-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-2 align-middle"
    >
      {val}
    </button>
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    const target = event.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
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
        className="rounded-full border-2 hover:border-teal-600 active:border-teal-600 border-gray-400 overflow-hidden bg-white dark:bg-gray-700"
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
  const data = useAppSelector((s) => s.session);
  const [update, setupdate] = useState(false);
  var image = useRef("");
  var email = useRef("");
  var name = useRef("");
  useEffect(() => {
    image.current = data.image;
    email.current = data.email;
    name.current = data.username;
    setupdate((pu) => !pu);
    return () => {};
  }, [data]);

  return (
    <div className="flex space-y-2 align-center">
      {name.current.length > 0 ? (
        <ProfImg imgSrc={image.current} />
      ) : (
        <div className="flex align-baseline">
          <SignBtn
            val="Sign in"
            onC={() => {
              if (window != undefined) {
                window.location.href = "/";
              }
            }}
          />
          <SignBtn
            val="Sign Up"
            onC={() => {
              if (window != undefined) {
                window.location.href = "/signup";
              }
            }}
          ></SignBtn>
        </div>
      )}
    </div>
  );
};
export default SignInOrLogo;
