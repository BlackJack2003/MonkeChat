"use client";
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Source_Sans_3 } from "next/font/google";
import AccountSection from "./userSetting/account";
import { SessionProvider } from "next-auth/react";

const NoneMenu: React.FC = () => {
  return <></>;
};
interface MenuItemsItem {
  val: string;
  MenuNode: React.ReactNode;
}

const noItemMenuItem: MenuItemsItem = { val: "none", MenuNode: <NoneMenu /> };
const accountsMenuItem: MenuItemsItem = {
  val: "Accounts",
  MenuNode: <AccountSection />,
};
enum MenuItems {
  noItems = "none",
  Accounts = "Accounts",
  Privacy = "Privacy",
}

const menuItemLookUp: Record<MenuItems, MenuItemsItem> = {
  [MenuItems.noItems]: noItemMenuItem,
  [MenuItems.Accounts]: accountsMenuItem,
  [MenuItems.Privacy]: noItemMenuItem,
};

interface settingsContext {
  selected: MenuItems;
  setSelected: (newValues: MenuItems) => void;
}

const SettingsContext = createContext<settingsContext>({
  selected: MenuItems.noItems,
  setSelected: () => {},
});

const useSettingsContext = () => useContext(SettingsContext);

const source_sans = Source_Sans_3({
  weight: "400",
  subsets: ["cyrillic"],
});

const SettingSidePanelItem: React.FC<{
  panelName: MenuItems;
}> = ({ panelName }) => {
  const { selected, setSelected }: settingsContext = useSettingsContext();
  useEffect(() => {
    return () => {};
  }, [selected]);
  return (
    <li
      className={
        "mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700" +
        (selected == panelName ? " border-l-blue-700" : "")
      }
      onClick={() => {
        setSelected(panelName);
      }}
    >
      {panelName}
    </li>
  );
};

const SettingSidePanel: React.FC = () => {
  return (
    <div className="col-span-2 sm:block">
      <ul>
        <SettingSidePanelItem panelName={MenuItems.Accounts} />
        <SettingSidePanelItem panelName={MenuItems.Privacy} />
      </ul>
    </div>
  );
};

export const Setting = () => {
  const [selected, setSelected] = useState<MenuItems>(MenuItems.noItems);
  useEffect(() => setSelected(MenuItems.Accounts), []);
  return (
    <SettingsContext.Provider value={{ selected, setSelected }}>
      <div
        className={
          source_sans.className +
          "bg-white dark:bg-black text-black dark:text-white"
        }
      >
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
          <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <SettingSidePanel />
            <div className="col-span-8 overflow-x-hidden rounded-xl sm:px-8 sm:shadow bg-white dark:bg-gray-900 min-h-[75vh]">
              <SessionProvider>
                {selected == MenuItems.Accounts &&
                  menuItemLookUp.Accounts.MenuNode}
              </SessionProvider>
            </div>
          </div>
        </div>
      </div>
    </SettingsContext.Provider>
  );
};

export default Setting;
