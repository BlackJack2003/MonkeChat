import React from "react";
import Image from "next/image";
import Carousel from "@/components/generic/Carousel";

const page = () => {
  return (
    <div className="h-screen w-screen mt-20">
      <Carousel
        style={{
          fontSize: "20px",
          margin: "auto",
          marginTop: "200px",
          marginLeft: "200px",
        }}
        width={200}
      >
        <div className="min-w-[200px] h-28 bg-gray-700">1</div>
        <div className="min-w-[200px] h-28 bg-gray-700">2</div>
        <div className="min-w-[200px] h-28 bg-gray-700">3</div>
        <div className="min-w-[200px] h-28 bg-gray-700">4</div>
        <div className="min-w-[200px] h-28 bg-gray-700">5</div>
      </Carousel>
    </div>
  );
};

export default page;
