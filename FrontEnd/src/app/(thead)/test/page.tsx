"use client";
import React, { useState } from "react";
// import Image from "next/image";
// import Carousel from "@/components/generic/Carousel";
import Error from "@/components/error";

const Page: React.FC = () => {
  const [errVal, seterrVal] = useState("ass");
  return (
    <div className="h-screen w-screen mt-20">
      <Error text={errVal} setText={seterrVal} />
    </div>
  );
};

export default Page;
