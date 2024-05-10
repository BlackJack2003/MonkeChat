import React, { useRef, useEffect, useState } from "react";
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
import { hashString } from "@/utils/genral/genral";
import imageCompression from "browser-image-compression";

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
  const imgString = useRef(
    "data:image/jpeg;base64,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"
  );
  const { query } = router;
  const [update, setUpdate] = useState(false);
  if (query.error != undefined) {
    errorMsg.current = query.error;
  }
  useEffect(() => {
    return () => {};
  }, [update]);
  const resetIds = ["email", "password", "name"];
  useEffect(() => {
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
          <input
            type="file"
            onChange={(event) => {
              if (!event.target.files) return;
              var file = event.target.files[0];

              if (file.size > 204800) {
                alert("File is too big!");
                return;
              }
              try {
                imageCompression(file, {
                  maxSizeMB: 0.0098,
                  maxWidthOrHeight: 400,
                  useWebWorker: true,
                }).then((compressedFile) => {
                  file = compressedFile;

                  // Check if a file is selected
                  if (file) {
                    // Create a new FileReader object
                    const reader = new FileReader();

                    // Define a callback function to handle the file reading process
                    reader.onload = function (e) {
                      // Set the imgString.current to the base64-encoded string of the image
                      imgString.current = e.target?.result as string;
                      setUpdate(!update);
                      // Use imgString.current as needed
                    };

                    // Read the selected file as a Data URL (base64-encoded string)
                    reader.readAsDataURL(file);
                  }
                });
              } catch (error) {
                console.log(error);
              }
            }}
            className="hidden"
            id="imgUpload"
          />
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-100">
              {" "}
              Sign up today!{" "}
            </h2>{" "}
          </div>{" "}
          <div
            className="h-fit w-fit overflow-hidden m-auto relative bg-transparent cursor-pointer"
            onClick={() => {
              document.getElementById("imgUpload")?.click();
            }}
          >
            <img
              src={imgString.current}
              alt="User Image Upload"
              className="h-40 w-40  rounded-full"
            />
            <div className="absolute bottom-0 right-0 p-2 px-4 text-3xl text-white bg-teal-400 z-20 rounded-full">
              +
            </div>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    placeholder="John Doe"
                    onChange={(e) => (userName.current = e.target.value)}
                    className="block w-full rounded-md border-0 pl-1 py-1.5 text-black-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
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
                  onClick={async (e) => {
                    e.preventDefault();
                    const toSend = {
                      username: userName.current,
                      password: hashString(pass.current),
                      img: imgString.current,
                      email: userEmail.current,
                    };
                    var resp = await fetch("/backEndApi/login/signUp", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(toSend),
                    });
                    if (resp.ok) {
                      signIn("credentials", {
                        username: userName.current,
                        password: hashString(pass.current),
                        redirect: true,
                        callbackUrl: "/home",
                      });
                    } else {
                      var t = await resp.text();
                      errorMsg.current = t;
                      setUpdate(!update);
                    }
                  }}
                >
                  {" "}
                  Sign up{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
            <div className="text-center text-sky-100 mt-2">
              Already have an account?&nbsp;
              <a href="/" className=" text-sky-500">
                Sign in!!&nbsp;
              </a>
            </div>
            <div className="h-5"></div>
            <ProviderList providers={providers} />{" "}
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
};

export default Signup;
