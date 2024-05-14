import User from "../schemas/User";
import Chat from "../schemas/Chat";

export interface ChatMenuItemInterface {
  Name: string;
  Img?: string;
  status?: string;
  lastMsg?: string;
  updateAt: string;
  isActive?: boolean;
  ChatId?: string;
}

export async function getChats(
  userId: string
): Promise<ChatMenuItemInterface[]> {
  try {
    const user = await User.findById(userId);
    var rl: any[] = [];
    for (let i = 0; i < user.contacts.length; i++) {
      const userB = await User.findById(user.contacts[i].cid);
      const chat = await Chat.findById(user.contacts[i].chat);
      rl.push({
        Name: userB.name,
        Img: userB.image,
        ChatId: user.contacts[i].cid,
        updateAt: chat.updatedAt,
      });
    }
    for (let i = 0; i < user.groupChats.length; i++) {
      const chatB = await Chat.findById(user.contacts[i].chat);
      rl.push({
        Name: chatB.name,
        Img: chatB.image,
        lastMsg: chatB.updatedAt,
      });
    }
    return rl;
  } catch (e: any) {
    console.error(e.message);
    return [];
  }
}
