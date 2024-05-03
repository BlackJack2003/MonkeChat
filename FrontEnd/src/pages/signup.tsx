import React, { useRef } from "react";
import Image from "next/image";
import ErrorBox from "@/components/errorBox";
import { useRouter } from "next/router";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import options from "../app/api/auth/[...nextauth]/options";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/contact" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

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
            Sign up with {provider.name}
          </button>
        </div>
      );
  });
  return <>{rows}</>;
}

export const Signup: React.FC<any> = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const userEmail = useRef("");
  const pass = useRef("");
  const userName = useRef("");
  const errorMsg = useRef<string | string[]>("");
  const router = useRouter();
  const { query } = router;
  if (query.error != undefined) {
    errorMsg.current = query.error;
  }
  return (
    <>
      <div
        className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-slate-900"
        style={{
          backgroundImage: "url(/login_back_light.jpeg)",
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
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-100">
              {" "}
              Sign up today!{" "}
            </h2>{" "}
          </div>{" "}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {" "}
            <form className="space-y-6" action="#" method="POST">
              {" "}
              <div>
                {" "}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-sky-100"
                >
                  {" "}
                  Name{" "}
                </label>{" "}
                <div className="mt-2">
                  {" "}
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    placeholder="  John Doe"
                    onChange={(e) => (userName.current = e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-black-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />{" "}
                </div>{" "}
              </div>{" "}
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
                    placeholder="John_Doe@mycompany.com"
                    onChange={(e) => (userEmail.current = e.target.value)}
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
                    placeholder="John_Doe"
                    onChange={(e) => (pass.current = e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <ErrorBox errVal={errorMsg.current as string} />
              <div>
                {" "}
                <button
                  type="button"
                  className="flex w-full justify-center rounded-xl bg-stone-500 text-black dark:text-white dark:bg-slate-600  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    signIn("credentials", {
                      username: userEmail.current,
                      password: pass.current,
                      redirect: true,
                      callbackUrl: "/test",
                    });
                  }}
                >
                  {" "}
                  Sign up{" "}
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
};

export default Signup;
