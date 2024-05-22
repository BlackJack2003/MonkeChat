//layout.tsx
import React, { ReactNode } from "react";
import StoreProvider from "@/redux/providers/StoreProvider";
import "@/styles/globals.css";
import Footer from "@/components/appfooter";
// import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { makeStore, persistor } from "@/redux/store/nstore";
import { hydrateRoot } from "react-dom/client";

export const metadata = {
  title: "Monke chat",
  description: "Reject humanity return to monke",
};

const Main: React.FC<{ children?: ReactNode }> = ({ children }) => {
  var store = makeStore();
  return (
    <body className="w-screen">
      <Provider store={store}>
        <div
          id="myRoot"
          className="min-h-screen bg-myBg pb-2 text-black dark:text-white min-w-screen"
        >
          {children}
          <Footer />
        </div>
      </Provider>
    </body>
  );
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html id="root">
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <head></head>
      <Main>{children}</Main>
      {/* </PersistGate> */}
    </html>
  );
};

persistor.subscribe(() => {
  /* Hydrate React components when persistor has synced with redux store */
  const { bootstrapped } = persistor.getState();

  if (bootstrapped) {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      hydrateRoot(rootElement, <Main />);
    }
  }
});

export default RootLayout;
