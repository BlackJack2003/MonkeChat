import { Session } from "next-auth";
import "../../app/(chat)/chat/interfaces";
import {
  MessageInterface,
  ChatMenuItemInterface,
  ChatPanelInterface,
} from "../../app/(chat)/chat/interfaces";

export const getPanel: (userName: string) => ChatPanelInterface = function (
  userName: string
) {
  try {
    return {
      userName: userName,
    };
  } catch (e) {
    return {};
  }
};

export const getChats: (
  session: Session | null
) => Promise<ChatMenuItemInterface[]> = async function (session) {
  try {
    if (session == null) return [];
    const data = session.user;
    var { name, private_key } = data;
    var resp = await fetch("/backEndApi/chat/getChats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        private_key,
      }),
    });
    var toRet: ChatMenuItemInterface[] = await resp.json();
    return toRet;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
};

export const getMessagesAll: (
  session: Session | null,
  userName: string | null
) => MessageInterface[] = function (session, userName) {
  if (session == null || userName == null) return [];
  return [
    {
      text: `Hello ${session.user?.name}, ${userName} speaking`,
      mine: false,
      time: Date.now(),
    },
  ];
};

export const sendMessage: (
  session: Session | null,
  userName: string | null,
  message: MessageInterface
) => boolean = function (session, userName, message) {
  return true;
};
// export const sendMessage:(session:Session)=>void=function
