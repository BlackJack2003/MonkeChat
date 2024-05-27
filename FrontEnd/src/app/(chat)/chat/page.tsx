"use client";
import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import Image from "next/image";
import "@/styles/chat.css";
import {
  MessageInterface,
  ChatMenuItemInterface,
  ChatPanelInterface,
} from "./interfaces";
import "../../../utils/chat/utils";
import {
  getChats,
  getMessagesAll,
  getMessagesNew,
  sendMessage,
} from "../../../utils/chat/utils";
import { useAppSelector } from "@/redux/hooks/hooks";

const ChatPanelContext = createContext<{
  panel: ChatPanelInterface;
  setPanel: (x: ChatPanelInterface) => void;
}>({
  panel: {},
  setPanel: (x: ChatPanelInterface) => {},
});

const SideArrow: React.FC<{ mine: boolean }> = ({ mine = false }) => {
  return (
    <div
      className={
        "mt-[8px]  bg-transparent border-b-[30px] border-b-transparent w-0 h-0 " +
        (mine
          ? "ml-[-25px] mr-4 border-l-[#2e8b57] border-l-[25px]"
          : "ml-4 mr-[-25px]  dark:border-r-[#374151] border-r-[25px] border-r-white")
      }
    ></div>
  );
};

const GetChatContext = () => useContext(ChatPanelContext);

const MessageBox: React.FC<MessageInterface> = ({
  mine = false,
  text = "",
  time = Date.now(),
}) => {
  const dateObj = new Date(time);
  const timeString = `${
    dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()
  }-${
    dateObj.getMonth() < 10 ? "0" + dateObj.getMonth() : dateObj.getMonth()
  }-${dateObj.getFullYear()} ${
    dateObj.getHours() % 12
  }:${dateObj.getMinutes()} ${dateObj.getHours() > 12 ? "PM" : "AM"}`;
  return (
    <div
      className="relative flex h-max"
      style={{ alignSelf: mine ? "flex-start" : "flex-end", direction: "ltr" }}
    >
      {mine == false && <SideArrow mine={mine} />}

      <div
        className="rounded-sm w-fit h-fit py-1 px-4 mx-4 z-10 my-2 text-lg dark:bg-gray-700 bg-white"
        style={{
          alignSelf: mine ? "flex-end" : "flex-start",
          backgroundColor: mine ? "seagreen" : " ",
          textAlign: mine ? "right" : "left",
        }}
      >
        {text}
        <div className="flex mt-auto text-xs font-light justify-end">
          {timeString}
        </div>
      </div>
      {mine && <SideArrow mine={mine} />}
    </div>
  );
};

const ChatMenuItem: React.FC<ChatMenuItemInterface> = ({
  Name,
  Img = "/def_user.jpg",
  status = "",
  lastMsg = "",
  isActive = false,
  ChatId,
  encKey,
  updateAt = "0",
}) => {
  const imgSize = 48;
  const { panel, setPanel } = GetChatContext();
  isActive = panel.userName === Name;
  const dateObj = new Date(Date.parse(updateAt) || 0);
  const timeString = `${
    dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()
  }/${
    dateObj.getMonth() < 10 ? "0" + dateObj.getMonth() : dateObj.getMonth()
  } ${dateObj.getHours() % 12}:${dateObj.getMinutes()} ${
    dateObj.getHours() > 12 ? "PM" : "AM"
  }`;
  return (
    <div
      className={
        "w-full flex hover:bg-white hover:text-black mt-2 py-2 dark:hover:bg-white dark:hover:text-black rounded-lg" +
        (isActive
          ? " bg-white text-black  dark:text-white dark:bg-gray-700"
          : "")
      }
      onClick={(e) => {
        // setPanel(getPanel(Name, ChatId));
        setPanel({ userName: Name, ChatId: ChatId, encKey: encKey });
      }}
    >
      <img
        src={Img}
        alt={Name}
        style={{
          height: imgSize,
          width: imgSize,
          maxHeight: imgSize,
          maxWidth: imgSize,
          minHeight: imgSize,
          minWidth: imgSize,
        }}
        className="rounded-full ml-2 ring-2 ring-slate-700 h-fit w-fit my-auto"
      />
      <div className="flex flex-col ml-2 flex-grow">
        <div className="text-2xl">
          <p className=" font-[400]">{Name}</p>
          <p className=" text-xs ">{status}</p>
        </div>
        <div className="overflow-hidden text-sm flex w-full">
          {lastMsg} <p className="ml-auto mr-2">{timeString}</p>{" "}
        </div>
      </div>
    </div>
  );
};

const ChatMenu: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const searchVal = useRef<string>("");
  var session = useAppSelector((s) => s.session);
  const [update, setupdate] = useState(false);
  var list = useRef<ChatMenuItemInterface[]>([]);
  const [contactList, setcontactList] = useState<ChatMenuItemInterface[]>([]);
  useEffect(() => {
    const _ = async () => {
      list.current = await getChats(
        session.username,
        session.private_key,
        session.password
      );
      list.current.sort(function (a, b) {
        var x = Date.parse(a.updateAt) || 0;
        var y = Date.parse(b.updateAt) || 0;
        return x < y ? -1 : x > y ? 1 : 0;
      });
      setcontactList(list.current);
      setupdate((prevupdate) => !prevupdate);
    };
    _();
    return () => {};
  }, [session]);
  function handleSearch() {
    if (searchVal.current === "") {
      setcontactList(list.current);
    } else {
      const filterBySearch = list.current.filter((item) => {
        if (item.Name.toLowerCase().includes(searchVal.current.toLowerCase())) {
          return item;
        }
      });
      setcontactList(filterBySearch);
    }
    setupdate((prevupdate) => !prevupdate);
  }
  if (session.username == "") return <></>;
  //   handleSearch();
  return (
    <div
      className="flex flex-col h-screen w-[25vw] bg-slate-100 p-4 [&>*]:mx-auto [&>*]:w-full overflow-x-hidden dark:bg-gray-800 dark:text-white border-r-2 dark:border-slate-900 resize-x"
      style={{ alignContent: "flex-start" }}
    >
      <div className="text-2xl font-bold">Chat&apos;s</div>
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
        return <ChatMenuItem key={index} {...item} />;
      })}
    </div>
  );
};

const MessageArea: React.FC<{
  children?: ReactNode;
  msgList?: MessageInterface[];
}> = ({ children = <></>, msgList = [] }) => {
  // var ting =
  return (
    <div className="chatPanelMsgAreaLight dark:chatPanelMsgAreaDark flex w-full flex-grow flex-col z-10 relative overflow-y-auto">
      <div
        className="h-full overflow-x-hidden w-full space-y-2 flex flex-col overflow-y-scroll"
        style={{ direction: "rtl" }}
      >
        {children}
        {msgList.map((item, index) => {
          return <MessageBox key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

const ChatPanel: React.FC<ChatPanelInterface> = ({
  imgSrc = "/def_user.jpg",
  userName = null,
  status = false,
  children,
  ChatId,
  encKey,
}) => {
  const [update, doUpdate] = useState(0);
  const myMessages = useRef<MessageInterface[]>([]);
  var interval = useRef<NodeJS.Timeout>();
  var inputEle = useRef<null | HTMLInputElement>(null);
  var session = useAppSelector((s) => s.session);
  var realEncKey: string = encKey || "";
  const sendMsg = async () => {
    const textEle = document.getElementById(
      "msgBox"
    ) as HTMLInputElement | null;
    const text = textEle?.value;

    if (text == null || text == undefined) {
      console.log("Not sent due to:" + text);
      return;
    }

    var _ = await sendMessage(
      session.username,
      session.private_key,
      text,
      ChatId,
      realEncKey
    );

    myMessages.current = myMessages.current.concat(
      await getMessagesNew(
        session.username,
        ChatId,
        session.private_key,
        session.password,
        realEncKey,
        myMessages.current.length > 0
          ? myMessages.current[myMessages.current.length - 1].MessageId || ""
          : ""
      )
    );
    if (textEle?.value) textEle.value = "";
    doUpdate((pu) => pu + 1);
  };

  useEffect(() => {
    const _ = async () => {
      if (ChatId != null && realEncKey != undefined)
        myMessages.current = await getMessagesAll(
          session.username,
          ChatId,
          session.private_key,
          session.password,
          realEncKey
        );
      doUpdate((pu) => pu - 1);
    };
    _();
    const handleKeyDown = async (event: any) => {
      if (event.key === "Enter") {
        await sendMsg();
      }
    };
    interval.current = setInterval(async () => {
      var newmsgs = await getMessagesNew(
        session.username,
        ChatId,
        session.private_key,
        session.password,
        realEncKey,
        myMessages.current.length > 0
          ? myMessages.current[myMessages.current.length - 1].MessageId || ""
          : ""
      );
      if (newmsgs.length > 0) {
        // console.log("Got new msgs:", newmsgs);
        myMessages.current = myMessages.current.concat(newmsgs);
        doUpdate((pu) => pu + 1);
      }
    }, 5000);
    const inputElement = inputEle.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        clearInterval(interval.current);
        if (inputElement) {
          inputElement.removeEventListener("keydown", handleKeyDown);
        }
      };
    }

    return () => {};
  }, [session, realEncKey, ChatId]);

  if (userName == null) return <div></div>;

  return (
    <div className="h-screen flex-grow flex-shrink resize-x">
      <div className="flex flex-col h-full">
        <div className="flex w-full space-x-4 h-fit py-1">
          <Image
            src={imgSrc}
            height={40}
            width={50}
            alt={userName + " Image"}
            className="rounded-full mx-4 hover:ring-2 ring-teal-400"
          />
          <div className="ml-8">
            <p className="text-2xl font-semibold">{userName}</p>
            <p>{status ? "Online" : "Offline"}</p>
          </div>
        </div>
        <MessageArea msgList={myMessages.current} key={update}>
          {children}
        </MessageArea>
        <div
          style={{ alignSelf: "end" }}
          className="mb-[20px] w-full px-2 h-fit"
        >
          <div className="flex w-full relative mb-[-20px]">
            <input
              type="text"
              id="msgBox"
              ref={inputEle}
              className="w-[102%] z-5 top-0 dark:bg-gray-700 px-8 ml-[-8px]"
              placeholder="Type a message..."
            />
            <div
              className="rounded-full self-end z-10 ml-[-55px] my-auto hover:bg-teal-600 p-2 py-3 cursor-pointer"
              id="textInput"
              onClick={() => sendMsg()}
            >
              <Image
                height={22}
                width={22}
                src="/send.png"
                alt="send"
                className="ml-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const [panel, setPanel] = useState<ChatPanelInterface>({});
  return (
    <ChatPanelContext.Provider value={{ panel, setPanel }}>
      <ChatMenu />
      <ChatPanel {...panel}></ChatPanel>
    </ChatPanelContext.Provider>
  );
};
export default Chat;
