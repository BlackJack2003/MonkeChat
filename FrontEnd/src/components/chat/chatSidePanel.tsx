import Image from "next/image";
import React from "react";
import { Session, getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const ChatNavSmallComponent: React.FC<{ imgSrc: string; href: string }> = ({
  imgSrc,
  href,
}) => {
  return (
    <a
      href={href}
      className="rounded-full hover:bg-slate-200 p-[12px] [&>*]:dark:hover:invert-0"
    >
      <Image
        src={imgSrc}
        height={30}
        width={30}
        alt="home"
        className="filter brightness-0 saturate-100  dark:invert dark:sepia-0 dark:hover:invert-0"
      />
    </a>
  );
};

const ChatNavSidePanel: React.FC = async () => {
  const session: Session = await getServerSession(options).then((x) => x);

  const iSrc = session.user?.image as string;
  const size = 50;
  return (
    <div className="dark h-screen dark:bg-gray-900 bg-white w-fit">
      <div className="flex w-full justify-center first:ml-[2px] first:mt-2">
        <div
          className="w-fit rounded-full border-2 hover:border-teal-600 active:border-teal-600 border-gray-400 overflow-hidden"
          style={{ height: size, width: size }}
        >
          <img
            className=" w-full h-full object-fill"
            src={iSrc}
            alt="User Image"
          />
        </div>
      </div>
      <div className="flex flex-col  pb-2 justify-center space-y-4 h-[82vh] w-full px-2 first:mt-auto">
        <ChatNavSmallComponent imgSrc="/home.svg" href="/home" />
        <ChatNavSmallComponent imgSrc="/chat.png" href="/chat" />
        <ChatNavSmallComponent imgSrc="/person.png" href="/contacts" />
      </div>
      <div className="w-full first:m-auto flex justify-center">
        <ChatNavSmallComponent imgSrc="/settings.svg" href="/settings" />
      </div>
    </div>
  );
};

export default ChatNavSidePanel;
