"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import ErrorBox from "@/components/errorBox";
import { hashString } from "@/utils/general/general";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setPassword } from "@/redux/actions/sessionAction";

const LoginPage: React.FC = () => {
  const errorMsg = useRef<string | string[]>("");
  const [update, setupdate] = useState(false);

  useEffect(() => {
    const resetIds = ["email", "password"];
    resetIds.forEach((id) => {
      try {
        var ele = document.getElementById(id) as HTMLInputElement | null;
        if (ele) ele.value = "";
      } catch (e) {
        console.error(e);
      }
    });
    return () => {};
  }, []);
  //   useEffect(() => {
  //     const _ = async () => {
  //       const session = await getSession();
  //       if (session && window != undefined) {
  //         window.location.href = "home";
  //       }
  //     };
  //     _();
  //   });
  const logoSize: number = 80;
  const imUrlRef: string = 'url("/login_back_light.jpeg")';
  const search = useSearchParams();
  const error: any = search?.get("error");
  if (error != undefined && error != null) {
    errorMsg.current = error;
  }
  const userName = useRef("");
  const pass = useRef("");
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-slate-900"
        style={{
          backgroundImage: imUrlRef,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "105vw",
        }}
      >
        <div
          id="loginBoxCont"
          className="sm:mx-auto backdrop-blur-sm p-10 rounded-xl"
          style={{ width: 30 + "vw" }}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto w-auto rounded-full"
              src="/Monke.webp"
              alt="Your Company"
              width={logoSize}
              height={logoSize}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-100">
              {" "}
              Sign in to your account{" "}
            </h2>{" "}
          </div>{" "}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {" "}
            <form className="space-y-6" action="#" method="POST">
              {" "}
              <div>
                {" "}
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-sky-100"
                >
                  {" "}
                  Email address/Username{" "}
                </label>{" "}
                <div className="mt-2">
                  {" "}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => (userName.current = e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-black-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-sky-100"
                  >
                    {" "}
                    Password{" "}
                  </label>{" "}
                </div>{" "}
                <div className="mt-2">
                  {" "}
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => (pass.current = e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <ErrorBox errVal={errorMsg.current} />
              <div>
                {" "}
                <button
                  type="button"
                  className="flex w-full justify-center rounded-xl bg-stone-500 text-black dark:text-white dark:bg-slate-600  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={async (e) => {
                    e.preventDefault();
                    const toSend = {
                      username: userName.current,
                      password: hashString(pass.current),
                    };
                    var resp = await fetch("/backEndApi/login/validate", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(toSend),
                    });
                    if (resp.ok) {
                      console.log("Dispatching setPassword");
                      dispatch(setPassword(pass.current));
                      signIn("credentials", {
                        username: userName.current,
                        password: hashString(pass.current),
                        redirect: true,
                        callbackUrl: "/home",
                      });
                    } else {
                      var t = await resp.text();
                      errorMsg.current = t;
                      setupdate(!update);
                    }
                  }}
                >
                  {" "}
                  Sign in{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
            <div className="text-center text-sky-100 mt-2">
              Dont have an account? 
              <a href="/signup" className=" text-sky-500">
                Sign up!!
              </a>
            </div>
            <div className="h-5"></div>
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
};

const LPage: React.FC = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default LPage;
