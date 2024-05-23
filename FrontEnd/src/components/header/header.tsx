"use client";
import Image from "next/image";
import SignInOrLogo from "./SignBtn";
import SidePanelButton from "./sidePanel";
import { useAppSelector } from "@/redux/hooks/hooks";

const HeaderLeftItems: React.FC<{ text: string; func: Function }> = ({
  text,
  func,
}) => {
  return (
    <div
      onClick={() => func()}
      title=""
      className="text-base  font-bold cursor-pointer hover:underline hover:decoration-teal-800 hover:decoration-4 transition-underline ease-in-out delay-150 underline-offset-4 "
    >
      {text}
    </div>
  );
};

const Header: React.FC = () => {
  //   var session = useAppSelector((s) => s.session); //useRef<Session | null>(null);
  return (
    <header id="headerThing" className="fixed top-0 max-w-fit z-20 ">
      <div
        id="myHeaderbgp"
        className="w-screen border-b-[1px] border-slate-400 text-black dark:text-white  bg-gray-100 dark:bg-gray-900 "
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-16 lg:h-20">
            <div className="hidden lg:flex lg:items-center lg:space-x-10 ">
              <SidePanelButton />
              <HeaderLeftItems
                text="Feature's"
                func={() => {
                  if (window != undefined)
                    window.location.href = "/home#features";
                }}
              />
              <HeaderLeftItems
                text="Chat's"
                func={() => {
                  if (window != undefined) window.location.href = "/chat";
                }}
              />
            </div>
            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
              <div className="flex-shrink-0">
                <a href="/home" title="" className="flex">
                  <Image
                    className="w-auto h-8 lg:h-10"
                    src="/favicon.svg"
                    width={80}
                    height={80}
                    alt=""
                  />
                </a>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center ml-auto  bg-black dark:bg-gray-50 rounded-full w-9 h-9 lg:hidden"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <SignInOrLogo />
          </nav>
        </div>
      </div>
      <nav className="py-4 bg-white lg:hidden">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Menu
            </p>

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Features{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Solutions{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Resources{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Pricing{" "}
              </a>
            </div>

            <hr className="my-4 border-gray-200" />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
