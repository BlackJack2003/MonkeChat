export interface ChatMenuItemInterface {
	userName: string;
	profileImg?: string;
	status?: string;
	lastMsg?: string;
	isActive?: boolean;
  }

  export interface MessageInterface
  {
	mine?:boolean,
	text?:string,
	time?:number
  }

  
  export interface ChatPanelInterface {
	imgSrc?: string;
	userName?: string;
	status?: boolean;
	children?: React.ReactNode;
	messages?:MessageInterface[];
  }