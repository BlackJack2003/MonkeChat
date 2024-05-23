import "@/app/(chat)/contacts/interfaces";
import { ContactInterface } from "@/app/(chat)/contacts/interfaces";
import { Session, User } from "next-auth";

export const getPanel: (userName: string) => ContactInterface = function (
  userName = "1"
) {
  try {
    return {
      userName: userName,
    };
  } catch (e) {
    return {};
  }
};

export const getContacts = async (
  name: string,
  private_key: string
): Promise<ContactInterface[]> => {
  try {
    if (name == undefined || private_key == undefined) return [];
    var resp = await fetch("/backEndApi/contacts/getContacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        private_key,
      }),
    });
    if (resp.ok) {
      var c: ContactInterface[] = await resp.json();
      return c;
    } else {
      return [];
    }
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
};

export const addContact: (
  name: string,
  private_key: string,
  nuname: string
) => Promise<boolean> = async (
  name: string,
  private_key: string,
  nuname: string
) => {
  try {
    var resp = await fetch("/backEndApi/contacts/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        private_key: private_key,
        user_to_add: nuname,
      }),
    });
    return resp.ok;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
};
