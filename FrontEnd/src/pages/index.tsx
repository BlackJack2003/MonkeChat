import React, { useEffect } from "react";
import "../styles/globals.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import options from "../app/api/auth/[...nextauth]/options";
import ErrorBox from "@/components/errorBox";

function ProviderList({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let rows: JSX.Element[] = [];
  Object.values(providers).map((provider) => {
    if (provider.name != "Credentials")
      rows.push(
        <div
          key={provider.name}
          className="w-full max-h-fit mx-auto my-auto bg-gray-700 text-white text-center py-2 px-4 border-2 rounded-xl hover:border-x-4 hover:border-violet-700 "
        >
          <button
            onClick={() => signIn(provider.id)}
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={"/" + provider.name + ".svg"}
              height={32}
              width={32}
              alt="github"
              style={{ marginRight: 10 }}
            />
            Sign in with {provider.name}
          </button>
        </div>
      );
  });
  return <>{rows}</>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/home" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

function LoginPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const errorMsg = useRef<string | string[]>("");
  const router = useRouter();
  const resetIds = ["email", "password"];
  useEffect(() => {
    resetIds.forEach((id) => {
      try {
        var ele = document.getElementById(id);
        if (ele) ele.value = "";
      } catch (e) {
        console.error(e);
      }
    });
    return () => {};
  }, []);

  const logoSize: number = 80;
  const imUrlRef: string = 'url("/login_back_light.jpeg")';
  const { query } = router;
  if (query.error != undefined) {
    errorMsg.current = query.error;
  }
  const userName = useRef("");
  const pass = useRef("");

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
                  Email address{" "}
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
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("credentials", {
                      username: userName.current,
                      password: pass.current,
                      redirect: true,
                      callbackUrl: "/home",
                    });
                  }}
                >
                  {" "}
                  Sign in{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
            <div className="h-5"></div>
            <ProviderList providers={providers} />{" "}
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
}

export default LoginPage;
