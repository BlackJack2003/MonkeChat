import User from "../schemas/User";
import Chat, { Message } from "../schemas/Chat";

export interface ChatMenuItemInterface {
  Name: string;
  Img?: string;
  status?: string;
  lastMsg?: string;
  updateAt: string;
  isActive?: boolean;
  ChatId: string;
  encKey: string;
}

export async function getChats(
  userId: string
): Promise<ChatMenuItemInterface[]> {
  try {
    const user = await User.findById(userId);
    var rl: ChatMenuItemInterface[] = [];
    for (let i = 0; i < user.contacts.length; i++) {
      const userB = await User.findById(user.contacts[i].cid);
      if (userB == null) continue;
      const chat = await Chat.findById(user.contacts[i].chat);
      var userChatPrivateKey = "";
      chat.people.forEach((item: any, index: number) => {
        if (item.pid.toString() == userId) {
          userChatPrivateKey = item.encKey;
        }
      });
      if (userChatPrivateKey == "") {
        console.log("User:" + userB.name + " not found in chat");
        return [];
      }
      rl.push({
        Name: userB.name,
        Img: userB.image,
        ChatId: chat._id.toString(),
        updateAt: chat.updatedAt,
        encKey: userChatPrivateKey,
      });
    }
    for (let i = 0; i < user.groupChats.length; i++) {
      const chatB = await Chat.findById(user.contacts[i].chat);
      const userChatPrivateKey = chatB.people.find(
        (p: any) => String(p.pid) === userId
      )?.encKey;
      rl.push({
        Name: chatB.name,
        Img: chatB.image,
        ChatId: chatB._id,
        lastMsg: chatB.updatedAt,
        encKey: userChatPrivateKey,
        updateAt: chatB.updatedAt,
      });
    }
    return rl;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
}

interface MessageInterface {
  mine?: boolean;
  text?: string;
  time?: string | number;
}

export async function getMessagesAll(
  userId: string,
  ChatID: string
): Promise<MessageInterface[]> {
  try {
    var chat = await Chat.findById(ChatID);
    console.log("Getting messages for user:" + userId);
    if (chat == null) {
      console.log(
        "No chat found with id:" +
          ChatID +
          " when getting messages for userId: " +
          userId
      );
      return [];
    }
    var ra: MessageInterface[] = [];
    for (let i = 0; i < chat.messages.length; i++) {
      const message = await Message.findById(chat.messages[i]);
      ra.push({
        mine: message.sender.toString() == userId,
        text: message.text,
        time: Date.parse(message.createdAt),
      });
    }
    return ra;
  } catch (e: any) {
    console.error("Failed getmessage all func:", e.message);
    return [];
  }
}

export async function sendMessage(
  senderId: string,
  chatId: string,
  text: string
): Promise<boolean> {
  try {
    const chat = await Chat.findById(chatId);
    var newmsg = await Message.create({
      text: text,
      sender: senderId,
    });
    chat.messages.push(newmsg);
    chat.save();
    return true;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
}
