import React from "react";
import Image from "next/image";
import Carousel from "@/components/generic/Carousel";

const Home = () => {
  var h = 500;
  var w = 400;
  var car1ImgStyle: React.CSSProperties = {
    width: w,
    height: h,
    objectFit: "fill",
  };
  return (
    <div>
      <section
        className="h-screen w-screen flex justify-between"
        style={{ backgroundImage: "url(/home_static/home-bg.jpg)" }}
      >
        <div className="text-white z-[1] flex sm:flex-row align-middle items-center m-auto backdrop-blur-lg p-10 w-[75vw] h-[75%] relative shadow-[5px 8px 10px stroke-neutral-600] rounded-md hover:border-red-400 hover:border-1 hover:shadow-xl">
          <div className="justify-normal max-w-[45vw]">
            <p className="text-4xl mb-8 font-bold">About Monke Chat</p>
            <p className=" text-justify">
              Discover a whole new world of chatting with Monke Chat! Whether
              you&apos;re swinging solo or chatting with your troop, our app
              brings fun and convenience to your fingertips. Connect with
              friends, share laughs, and create unforgettable memories—all in
              one place. With intuitive features and a playful interface, Monke
              Chat makes staying in touch effortless and enjoyable. Join the
              chatter and let the good times roll with Monke Chat today!
            </p>
          </div>
          <Carousel
            className="absolute right-[60px] rounded-lg my-auto"
            width={w}
            height={h}
            period={5000}
          >
            <img
              src="/home_static/lady-texting.jpg"
              style={car1ImgStyle}
              alt="random lady texting"
            />
            <img
              src="/home_static/boggy.jpg"
              style={car1ImgStyle}
              alt="goood booy"
            />

            <img src="/Monke.webp" style={car1ImgStyle} alt="creators image" />
            <img
              src="/lone-dog.jpg"
              style={car1ImgStyle}
              alt="creators image"
            />
          </Carousel>
        </div>
      </section>
      <section
        id="features"
        className="h-screen w-screen flex justify-between"
        style={{ backgroundImage: "url(/home_static/8764.jpg)" }}
      >
        <div className="text-white z-[1] flex sm:flex-col align-middle items-center m-auto backdrop-blur-lg p-10 w-[75vw] h-[75%] relative shadow-[5px 8px 10px stroke-neutral-600] rounded-md border-red-400 border-1 shadow-xl">
          <p className="mx-auto py-5 text-7xl font-extrabold ">Features</p>
          <div className="flex justify-evenly mt-5">
            <div>
              <Image
                height={250}
                width={250}
                src="/home_static/lock.png"
                alt="privacy"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(144deg) brightness(107%) contrast(99%)",
                  boxShadow: "initial",
                }}
              />
              <p className="text-4xl text-center mx-auto">Privacy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
