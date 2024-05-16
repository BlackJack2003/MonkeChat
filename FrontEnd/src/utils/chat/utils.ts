import { Session } from "next-auth";
import "../../app/(chat)/chat/interfaces";
import {
  MessageInterface,
  ChatMenuItemInterface,
  ChatPanelInterface,
} from "../../app/(chat)/chat/interfaces";

// export const getPanel: (
//   userName: string,
//   ChatId: string | undefined
// ) => ChatPanelInterface = function (userName: string) {
//   try {
//     return {
//       userName: userName,
//     };
//   } catch (e: any) {
//     console.error(e.message);
//     return {};
//   }
// };

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
  userName: string | null,
  chatId: string | undefined
) => Promise<MessageInterface[]> = async function (session, userName, chatId) {
  try {
    if (session == null || userName == null || chatId == undefined) return [];
    const data = session.user;
    var { name, private_key } = data;
    var resp = await fetch("/backEndApi/chat/getMessagesAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        private_key,
        chatId,
      }),
    });
    const r = await resp.json();
    console.log("Got messages:", r);
    return r;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
};

export const sendMessage: (
  session: Session | null,
  userName: string | null,
  message: string,
  chatId: string | undefined
) => Promise<boolean> = async function (
  session,
  userName,
  message,
  chatId
): Promise<boolean> {
  try {
    if (session == null || userName == null || chatId == undefined)
      return false;
    const data = session.user;
    var { name, private_key } = data;
    //name, private_key, chatId, text
    var resp = await fetch("/backEndApi/chat/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        private_key: private_key,
        chatId: chatId,
        text: message,
      }),
    });
    if (resp.ok) return true;
    else return false;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
};
// export const sendMessage:(session:Session)=>void=function
