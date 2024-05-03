import React, { ReactNode } from "react";
import StoreProvider from "@/redux/providers/StoreProvider";
import "@/styles/globals.css";
export const metadata = {
  title: "Monke chat",
  description: "Reject humanity return to monke",
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <StoreProvider darkMode={false}>
        <head></head>
        <body className="w-screen">
          <div
            id="myRoot"
            className="min-h-screen bg-myBg pb-2 text-black dark:text-white"
          >
            {children}
          </div>
        </body>
      </StoreProvider>
    </html>
  );
};

export default RootLayout;
