import React from "react";
import "@/styles/globals.css";
import ChatNavSidePanel from "@/components/chat/chatSidePanel";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="h-screen sticky flex border-b-slate-500 pb-[5px] max-w-[100vw] border-b-2">
        <ChatNavSidePanel />

        <div className="flex h-screen flex-grow flex-shrink flex-wrap">
          {children}
        </div>
      </div>
    </>
  );
};

export default RootLayout;
