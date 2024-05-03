"use client";
import "@/utils/contact/utils";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { ContactInterface } from "./interfaces";
import Image from "next/image";
import { getContacts, getPanel } from "@/utils/contact/utils";

const ContactPanelContext = createContext<{
  panel: ContactInterface;
  setPanel: (x: ContactInterface) => void;
}>({
  panel: {},
  setPanel: (x: ContactInterface) => {},
});

const GetContactContext = () => useContext(ContactPanelContext);

const ContactMenuItem: React.FC<ContactInterface> = ({
  userName,
  img = "/def_user.jpg",
}) => {
  const imgSize = 48;
  const { panel, setPanel } = GetContactContext();
  var isActive = panel.userName === userName;
  return (
    <div
      className={
        "w-full flex hover:bg-white hover:text-black mt-2 py-2 dark:hover:bg-white dark:hover:text-black rounded-lg" +
        (isActive
          ? " bg-white text-black  dark:text-white dark:bg-gray-700"
          : "")
      }
      onClick={(e) => {
        setPanel(getPanel(userName || ""));
      }}
    >
      <Image
        src={img}
        alt={userName || ""}
        height={imgSize}
        width={imgSize}
        className="rounded-full ml-2 ring-2 ring-slate-700 h-fit w-fit my-auto"
      />
      <div className="flex flex-col ml-2">
        <div className="text-2xl">
          <p className=" font-[400]">{userName}</p>
        </div>
      </div>
    </div>
  );
};

const ContactSidePanel: React.FC = () => {
  const searchVal = useRef<string>("");
  const { data } = useSession();
  if (data == null) return <></>;
  return (
    <div
      className="flex flex-col h-screen w-[25vw] bg-slate-100 p-4 [&>*]:mx-auto [&>*]:w-full overflow-x-hidden dark:bg-gray-800 dark:text-white border-r-2 dark:border-slate-900 resize-x"
      style={{ alignContent: "flex-start" }}
    >
      <div className="text-2xl font-bold">Contact&apos;s</div>
      <input
        type="text"
        name="search"
        id="chatSearch"
        placeholder="Enter for search..."
        className="mt-4 p-2 px-4 rounded-md hover:ring-2 active:ring-4 ring-teal-300 dark:bg-gray-700 border-b-teal-700 border-b-2"
        onChange={(e) => {
          searchVal.current = e.target.value;
        }}
      />

      {getContacts(data).map((item, index) => {
        return <ContactMenuItem key={index} {...item} />;
      })}
    </div>
  );
};

const ContactPanel: React.FC = () => {
  var { panel, setPanel } = GetContactContext();
  if (panel.userName == undefined) return <></>;
  return (
    <div className="flex-grow m-8">
      <div className="flex flex-col justify-center bg-slate-100 shadow-sm dark:bg-gray-700 w-full h-full  rounded-lg">
        <img
          src={panel.img || "/def_user.jpg"}
          alt={panel.userName + "'s image"}
          className="rounded-full mx-auto"
        />
        <div className="text-center mt-5 text-3xl">{panel.userName}</div>
      </div>
    </div>
  );
};

const Contacts: React.FC = () => {
  const [panel, setpanel] = useState<ContactInterface>({});
  return (
    <ContactPanelContext.Provider
      value={{
        panel: panel,
        setPanel: setpanel,
      }}
    >
      <SessionProvider>
        <ContactSidePanel />
        <ContactPanel />
      </SessionProvider>
    </ContactPanelContext.Provider>
  );
};

export default Contacts;