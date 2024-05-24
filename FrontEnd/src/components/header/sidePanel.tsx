"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const SidePanelItem: React.FC<{ href: string; src: string; text?: string }> = ({
  href,
  src,
  text,
}) => {
  return (
    <div
      className="w-full flex justify-center cursor-pointer p-4 py-6 hover:bg-slate-200 hover:text-black [&>*]:dark:hover:invert-0 [&>*]:dark:hover:sepia"
      onClick={() => {
        if (window != undefined) window.location.href = href;
      }}
    >
      <Image
        src={src}
        height={30}
        width={30}
        alt="home"
        className="self-start  filter brightness-0 saturate-100 dark:invert dark:sepia-0 "
      />
      <p className="mx-2 text-xl self-center">{text}</p>
    </div>
  );
};

const SidePanel = () => {
  return (
    <div className="flex absolute mt-[26px] ml-[-46px] text-black dark:text-white">
      <div className=" rounded-tr-lg rounder-br-lg shadow-sm shadow-slate-500 z-10 h-[90vh] w-[20vw] bg-gray-100 dark:bg-gray-800 top-0 flex flex-col">
        <div className="my-2"></div>
        <SidePanelItem href="home" src="/home.svg" text="Home" />
        <SidePanelItem href="chat" src="/chat.png" text="Chat" />
        <SidePanelItem href="contacts" src="/person.png" text="Contacts" />
      </div>
    </div>
  );
};

const SidePanelButton: React.FC = () => {
  const btnSize = 30;
  const [isOpen, setIsOpen] = useState(false);
  const sidePanelRef = useRef<HTMLDivElement>(null);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const closeSidePanel = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    if (
      sidePanelRef.current &&
      !sidePanelRef.current.contains(event.target as Node)
    ) {
      closeSidePanel();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="hover:cursor-pointer hover:bg-slate-400 p-4 rounded-full "
      ref={sidePanelRef}
    >
      <Image
        src="/3-l.svg"
        alt="SidePanelButton"
        height={btnSize}
        width={btnSize}
        className="filter brightness-0 saturate-100  dark:invert dark:sepia-0 dark:saturate-0 dark:hue-rotate-[49deg] dark:brightness-105 dark:contrast-125"
        onClick={() => toggleSidePanel()}
      ></Image>
      {isOpen && <SidePanel />}
    </div>
  );
};

export default SidePanelButton;
