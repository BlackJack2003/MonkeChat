import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <>
      <div
        className="w-screen h-screen top-0 left-0 flex flex-col"
        style={{ backgroundImage: "url('/mountain.jpg')" }}
      >
        <div className="text-white z-[1] flex sm:flex-row align-middle items-center m-auto backdrop-blur-lg p-10 w-[75vw] h-[75%] relative shadow-[5px 8px 10px stroke-neutral-600] rounded-md hover:border-red-400 hover:border-1 hover:shadow-xl">
          <div className="justify-normal max-w-[45vw]">
            <p className="text-4xl mb-8 font-bold">About Me</p>
            <p>
              I am a student of B.E Computer Science from BMS Institute of
              Technology & Management and an ambitious, dedicated fresh graduate
              with strong Analytical, Communication and public speaking skills.
            </p>
          </div>
          <Image
            src="/lone-dog.jpg"
            height={700}
            width={400}
            alt="creators image"
            className="absolute right-4 rounded-md my-auto"
          ></Image>
        </div>
      </div>
      <section
        id="contact"
        className="w-screen h-fit p-4 transition-all "
        style={{
          background:
            "linear-gradient(90deg, rgba(87,154,235,1) 0%, rgba(103,124,29,1) 89%, rgba(96,120,34,1) 100%)",
        }}
      >
        <div className=" underline underline-offset-4 text-3xl hover:text-4xl hover:underline-offset-8 transition-all w-fit mx-auto">
          Contact
        </div>
        <div className="flex align-middle my-10 space-x-5 w-screen justify-center">
          <a href="https://github.com/BlackJack2003" className="ml-[-20px]">
            <div className="flex-col flex align-baseline">
              <Image src="/GitHub.svg" height={120} width={120} />
              <p className="text-white bold ml-[8px]">BlackJack2003</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
