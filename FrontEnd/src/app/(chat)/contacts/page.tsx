"use client";
import "@/utils/contact/utils";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from "react";
import { ContactInterface } from "./interfaces";
import Image from "next/image";
import { getContacts, getPanel, addContact } from "@/utils/contact/utils";
import Error from "@/components/error";
import { useAppSelector } from "@/redux/hooks/hooks";

const ContactPanelContext = createContext<{
  panel: ContactInterface;
  setPanel: (x: ContactInterface) => void;
}>({
  panel: {},
  setPanel: (x: ContactInterface) => {},
});

const ErrorContext = createContext<{
  errorText: string;
  seterrorText: (x: string) => void;
}>({
  errorText: "",
  seterrorText: (x: string) => {},
});

const GetErrorContext = () => useContext(ErrorContext);
const GetContactContext = () => useContext(ContactPanelContext);

const PanelAddContactSection: React.FC = () => {
  const [isOpen, setisOpen] = useState(false);
  const addUsername = useRef("");
  const session = useAppSelector((s) => s.session);
  const [update, setupdate] = useState(false);
  const { errorText, seterrorText } = GetErrorContext();
  return (
    <div className="h-fit flex mt-auto w-full flex-row">
      <div
        className="flex my-auto  flex-grow px-1 transition-all overflow-hidden"
        style={{
          maxWidth: isOpen ? "100%" : "0",
          height: isOpen ? "max-content" : "0",
        }}
      >
        <input
          type="text"
          placeholder="User to Add"
          className="h-10 rounded-md w-full hover:ring-2 active:ring-4 ring-teal-300 dark:bg-gray-700 border-b-teal-700"
          onChange={(e) => {
            var ele = e.target as HTMLInputElement;
            if (ele) addUsername.current = ele.value;
          }}
        />
        <div
          className="bg-green-600 hover:bg-green-400 ml-[-45px] h-6 my-auto rounded-md pb-1 px-1 "
          onClick={async (e) => {
            if (session.username != "") {
              var resp = await addContact(
                session.username,
                session.private_key,
                addUsername.current
              );
              console.log(resp);
              if (resp == "ok") {
                location.reload();
              } else {
                seterrorText(resp);
                setupdate(!update);
              }
              console.log("Error text:", errorText);
            }
          }}
        >
          Add
        </div>
      </div>
      <div
        className="rounded-full p-4 px-6 text-3xl overflow-hidden text-center text-white bg-green-600 hover:bg-green-400 ml-auto"
        onClick={() => setisOpen(!isOpen)}
      >
        +
      </div>
    </div>
  );
};

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
        // setPanel(getPanel(userName || ""));
        setPanel({
          userName: userName,
          img: img,
        });
      }}
    >
      <Image
        src={img}
        alt={userName || ""}
        height={imgSize}
        width={imgSize}
        style={{
          maxHeight: imgSize,
          maxWidth: imgSize,
          minHeight: imgSize,
          minWidth: imgSize,
        }}
        className="rounded-full ml-2 ring-2 ring-slate-700 my-auto overflow-hidden"
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
  const [update, setupdate] = useState(false);
  const session = useAppSelector((s) => s.session);
  const list = useRef<ContactInterface[]>([]);
  const [contactList, setcontactList] = useState<ContactInterface[]>([]);
  useEffect(() => {
    const _ = async () => {
      if (session.password != "") {
        list.current = await getContacts(session.username, session.private_key);
        list.current.sort(function (a, b) {
          var x = a.userName || "";
          var y = b.userName || "";
          return x < y ? -1 : x > y ? 1 : 0;
        });
        setcontactList(list.current);
        setupdate((prevupdate) => !prevupdate);
      }
    };
    _();
    return () => {};
  }, [session]);
  function handleSearch() {
    if (searchVal.current === "") {
      setcontactList(list.current);
    } else {
      const filterBySearch = list.current.filter((item) => {
        if (
          item.userName?.toLowerCase().includes(searchVal.current.toLowerCase())
        ) {
          return item;
        }
      });
      setcontactList(filterBySearch);
    }
    setupdate((prevupdate) => !prevupdate);
  }
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
          handleSearch();
        }}
      />

      {contactList.map((item, index) => {
        return <ContactMenuItem key={index} {...item} />;
      })}
      <PanelAddContactSection />
    </div>
  );
};

const ContactPanel: React.FC = () => {
  var { panel, setPanel } = GetContactContext();
  if (panel.userName == undefined) return <></>;
  let imgSize: number = 400;
  return (
    <div className="flex-grow m-8">
      <div className="flex flex-col justify-center bg-slate-100 shadow-sm dark:bg-gray-700 w-full h-full  rounded-lg">
        <img
          src={panel.img}
          alt={panel.userName + "'s image"}
          style={{
            maxHeight: imgSize,
            maxWidth: imgSize,
            minHeight: imgSize,
            minWidth: imgSize,
          }}
          className="rounded-full mx-auto"
        />
        <div className="text-center mt-5 text-3xl">{panel.userName}</div>
      </div>
    </div>
  );
};

const Contacts: React.FC = () => {
  const [panel, setpanel] = useState<ContactInterface>({});
  const [error, seterror] = useState("");
  const [update, setupdate] = useState(0);
  useEffect(() => {
    console.log(error);
    setupdate((pu) => ~pu);
    return () => {};
  }, [error]);
  return (
    <ContactPanelContext.Provider
      value={{
        panel: panel,
        setPanel: setpanel,
      }}
    >
      <ErrorContext.Provider
        value={{
          errorText: error,
          seterrorText: seterror,
        }}
      >
        <Error key={update} text={error} setText={seterror} />

        <ContactSidePanel />
        <ContactPanel />
      </ErrorContext.Provider>
    </ContactPanelContext.Provider>
  );
};

export default Contacts;
