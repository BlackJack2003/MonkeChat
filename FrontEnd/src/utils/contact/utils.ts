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
  session: Session | null
): Promise<ContactInterface[]> => {
  if (session?.user == undefined) return [];
  else {
    try {
      if (session == null) return [];
      const data = session.user;
      var { name, private_key } = data;
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
  }
};

export const addContact: (
  session: Session,
  nuname: string
) => Promise<boolean> = async (session: Session | null, nuname: string) => {
  if (session?.user == undefined) return false;
  if (session == null) return false;
  const data = session.user;
  var { name, private_key } = data;
  var resp = await fetch("/backEndApi/contacts/getContacts", {
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
};
