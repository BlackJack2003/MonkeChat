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

export const getChats: (session: Session) => ChatMenuItemInterface[] =
  function (session: Session) {
    if (session?.user == undefined) return [];
    else return [
      {
        userName:"kim-il-sung",
        status:"bye",
        lastMsg:"goodbye comrade"},
    {
          userName:"kim-jong-un",
          status:"hello",
          lastMsg:"Hello comrade"
    }
  ];
  };

export const getMessagesAll:(session:Session|null,userName:string|null)=>MessageInterface[]=function(session,userName)
{
  if(session==null||userName==null)
    return [];
  return [
  {
    text:`Hello ${session.user?.name}, ${userName} speaking`,
    mine:false,
    time:Date.now()
  }
  ];
}


export const sendMessage:(session:Session|null,userName:string|null,message:MessageInterface)=>boolean=function(session,userName,message)
{
  return true;
}
// export const sendMessage:(session:Session)=>void=function