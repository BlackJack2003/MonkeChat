"use client";
import React, { useState, useEffect } from "react";
import Header from "./header";

const transparent_mode_class = ["bg-trasparent", "text-white"];
const normal_mode_class = ["bg-gray-100", "dark:bg-gray-900", "border-b-[1px]"];

function handleNav(e: Event, setY: Function) {
  var window = e.currentTarget as Window;
  if (window == null || window == undefined) return;
  var sc = Math.round(window.scrollY);
  var head = document.getElementById("myHeaderbgp");
  if (sc == 0) {
    head?.classList.remove(...normal_mode_class);
    head?.classList.add(...transparent_mode_class);
  } else {
    head?.classList.remove(...transparent_mode_class);
    head?.classList.add(...normal_mode_class);
  }
  setY(sc);
}

const THeader: React.FC = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    setY(window.scrollY);
    var sc = Math.round(window.scrollY);
    var head = document.getElementById("myHeaderbgp");
    if (sc == 0) {
      head?.classList.remove(
        "bg-gray-100",
        "dark:bg-gray-900",
        "border-b-[1px]"
      );
      head?.classList.add("bg-trasparent", "text-white");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNav(e, setY));
    return () => {
      // return a cleanup function to unregister our function since it will run multiple times
      window.removeEventListener("scroll", (e) => handleNav(e, setY));
    };
  }, [y]);
  return <Header></Header>;
};
export default THeader;
