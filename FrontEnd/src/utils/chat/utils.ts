import { Session } from "next-auth";
import "../../app/(chat)/chat/interfaces";
import {
  MessageInterface,
  ChatMenuItemInterface,
  ChatPanelInterface,
} from "../../app/(chat)/chat/interfaces";
import {
  decryptData,
  decryptWithPrivateKey,
  encryptData,
} from "../general/general";

export const getChats: (
  name: string,
  private_key: string,
  password: string
) => Promise<ChatMenuItemInterface[]> = async function (
  name,
  private_key,
  password
) {
  try {
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

    var decPrikey = decryptData(password, private_key);
    toRet.forEach((item, index) => {
      toRet[index].encKey = decryptWithPrivateKey(decPrikey, item.encKey);
    });
    return toRet;
  } catch (e: any) {
    console.error("Get chat error:\n", e.message);
    return [];
  }
};

export const getMessagesAll: (
  userName: string | null,
  chatId: string | undefined,
  private_key: string,
  password: string,
  encKey: string
) => Promise<MessageInterface[]> = async function (
  userName,
  chatId,
  private_key,
  password,
  encKey
) {
  try {
    if (
      userName == null ||
      chatId == undefined ||
      private_key == undefined ||
      password == undefined ||
      encKey == undefined
    ) {
      console.log(
        `UserName: ${userName}, ChatId: ${chatId}, PrivateKey: ${private_key},encKey:${encKey}`
      );
      return [];
    }

    var resp = await fetch("/backEndApi/chat/getMessagesAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        private_key: private_key,
        chatId: chatId,
      }),
    });
    const r: MessageInterface[] = await resp.json();
    r.forEach((item, index) => {
      r[index].text = decryptData(encKey, item.text || "");
    });
    console.log("Got messages:", r);
    return r;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
};

export const sendMessage: (
  userName: string | null,
  private_key: string | null,
  message: string,
  chatId: string | undefined,
  encKey: string
) => Promise<boolean> = async function (
  userName,
  private_key,
  message,
  chatId,
  encKey
): Promise<boolean> {
  try {
    if (private_key == null || userName == null || chatId == undefined)
      return false;

    var resp = await fetch("/backEndApi/chat/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        private_key: private_key,
        chatId: chatId,
        text: encryptData(encKey, message),
      }),
    });
    if (resp.ok) return true;
    else return false;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
};
