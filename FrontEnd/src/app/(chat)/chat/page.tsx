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
  getPanel,
  sendMessage,
} from "../../../utils/chat/utils";
import { useSession, SessionProvider, getSession } from "next-auth/react";
import { Session } from "next-auth";

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
      style={{ alignSelf: mine ? "flex-end" : "flex-start" }}
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
  userName,
  profileImg = "/def_user.jpg",
  status = "",
  lastMsg = "",
  isActive = false,
}) => {
  const imgSize = 48;
  const { panel, setPanel } = GetChatContext();
  isActive = panel.userName === userName;
  return (
    <div
      className={
        "w-full flex hover:bg-white hover:text-black mt-2 py-2 dark:hover:bg-white dark:hover:text-black rounded-lg" +
        (isActive
          ? " bg-white text-black  dark:text-white dark:bg-gray-700"
          : "")
      }
      onClick={(e) => {
        setPanel(getPanel(userName));
      }}
    >
      <Image
        src={profileImg}
        alt={userName}
        height={imgSize}
        width={imgSize}
        className="rounded-full ml-2 ring-2 ring-slate-700 h-fit w-fit my-auto"
      />
      <div className="flex flex-col ml-2">
        <div className="text-2xl">
          <p className=" font-[400]">{userName}</p>
          <p className=" text-xs ">{status}</p>
        </div>
        <div className="overflow-hidden text-sm">{lastMsg}</div>
      </div>
    </div>
  );
};

const ChatMenu: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const searchVal = useRef<string>("");
  const { data } = useSession();
  if (data == null) return <></>;
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
        }}
      />

      {getChats(data).map((item, index) => {
        return <ChatMenuItem key={index} {...item} />;
      })}
    </div>
  );
};

const MessageArea: React.FC<{
  children?: ReactNode;
  msgList?: MessageInterface[];
}> = ({ children = <></>, msgList = [] }) => {
  return (
    <div className="chatPanelMsgAreaLight dark:chatPanelMsgAreaDark flex  w-full flex-grow flex-col z-10 relative ">
      <div className="h-full overflow-x-hidden w-full space-y-2 flex flex-col overflow-y-scroll">
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
}) => {
  const { data } = useSession();
  const [update, doUpdate] = useState(0);
  const myMessages = useRef<MessageInterface[]>([]);
  var interval: any;
  useEffect(() => {
    myMessages.current = getMessagesAll(data, userName);
    return () => {};
  }, [data]);

  useEffect(() => {
    myMessages.current = getMessagesAll(data, userName);
    doUpdate(update - 1);
    return () => {};
  }, [userName]);

  useEffect(() => {
    interval = setInterval(() => {
      doUpdate(update + 1);
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (data == null || userName == null) return <></>;

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
              className="w-[102%] z-5 top-0 dark:bg-gray-700 px-8 ml-[-8px]"
              placeholder="Type a message..."
            />
            <div
              className="rounded-full self-end z-10 ml-[-55px] my-auto hover:bg-teal-600 p-2 py-3 cursor-pointer"
              id="textInput"
              onClick={() => {
                const textEle = document.getElementById(
                  "msgBox"
                ) as HTMLInputElement | null;
                const text = textEle?.value;

                if (text == null || text == undefined) {
                  console.log("Not sent due to:" + text);
                  return;
                }
                const toSend = {
                  text: text,
                  mine: text[text.length - 1] != "/",
                  time: Date.now(),
                };
                sendMessage(data, userName, toSend);
                myMessages.current.push(toSend);
                if (textEle?.value) textEle.value = "";
                doUpdate(update + 1);
              }}
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
  const [panel, setPanel] = useState<ChatPanelInterface>({
    userName: "kim-il-sung",
  });
  var session = useRef<Session | null>(null);
  useEffect(() => {
    let _ = async () => {
      session.current = await getSession();
    };
    _();
    return () => {};
  }, []);
  return (
    <ChatPanelContext.Provider value={{ panel, setPanel }}>
      <SessionProvider
        session={session.current}
        refetchInterval={10 * 60}
        refetchOnWindowFocus={false}
      >
        <ChatMenu />
        <ChatPanel {...panel}>
          {/* <MessageBox text="Hello" />
          <MessageBox text="Bye" mine={true} /> */}
        </ChatPanel>
      </SessionProvider>
    </ChatPanelContext.Provider>
  );
};

export default Chat;
