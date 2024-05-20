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

export interface MessageInterface {
  mine?: boolean;
  text?: string;
  time?: number | string;
}

export interface ChatPanelInterface {
  imgSrc?: string;
  userName?: string;
  status?: boolean;
  children?: React.ReactNode;
  messages?: MessageInterface[];
  ChatId?: string;
  encKey?: string;
}
