import User from "../schemas/User";
import Chat, { ChatInt, Message } from "../schemas/Chat";
import { binarySearchMember } from "./general";

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
      let index = binarySearchMember(chat.people, userId);
      var userChatPrivateKey = index != -1 ? chat.people[index].encKey : "";
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
      let index = binarySearchMember(chatB.people, userId);
      var userChatPrivateKey = index != -1 ? chatB.people[index].encKey : "";
      rl.push({
        Name: chatB.name,
        Img: chatB.image,
        ChatId: chatB._id.toString(),
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
  MessageId?: string;
}

export async function getMessagesNew(
  userId: string,
  ChatID: string,
  messageId: string
): Promise<MessageInterface[]> {
  try {
    var chat: ChatInt | null = await Chat.findById(ChatID);
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
    var ind = -1;
    for (let i = chat.messages.length - 1; i >= 0; i--) {
      if (chat.messages[i].toString() == messageId) {
        ind = i;
        break;
      }
    }
    for (let i = ind + 1; i < chat.messages.length; i++) {
      const message = await Message.findById(chat.messages[i]);
      ra.push({
        mine: message.sender.toString() == userId,
        text: message.text,
        time: Date.parse(message.createdAt),
        MessageId: message._id.toString(),
      });
    }
    return ra;
  } catch (e: any) {
    console.error("Failed to send new msgs due to:" + e.message);
    return [];
  }
}

export async function getMessagesAll(
  userId: string,
  ChatID: string
): Promise<MessageInterface[]> {
  try {
    var chat = await Chat.findById(ChatID);
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
        MessageId: message._id.toString(),
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
