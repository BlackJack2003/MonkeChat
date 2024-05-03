"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setThemeDark, setThemeLight } from "../redux/actions/themeAction";
import { AppDispatch } from "../redux/store/nstore";
import { _Footer } from "./footer";

function checkAndSetTheme(dispatch: AppDispatch, isChecked: boolean) {
  var root = document.getElementById("myRoot");
  if (isChecked) {
    dispatch(setThemeDark());
    root?.classList.add("dark", "bg-myBg-dark");
    root?.classList.remove("bg-myBg");
  } else {
    dispatch(setThemeLight());
    root?.classList.remove("dark", "bg-myBg-dark");
    root?.classList.add("bg-myBg");
  }
  return () => {};
}

function ModeBtn() {
  //isChecked == darkmode
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const preferredThemeDark = useAppSelector((state: any) => {
    return state.theme.darkMode;
  });
  useEffect(() => {
    setIsChecked(preferredThemeDark);
  }, []);
  useEffect(() => {
    checkAndSetTheme(dispatch, isChecked);
  }, [isChecked, dispatch]);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label
        className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center"
        style={{ marginLeft: "90%", marginRight: "0", marginBottom: "20px" }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="label flex items-center text-sm font-medium  ">
          Light
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium  ">
          Dark
        </span>
      </label>
    </>
  );
}

const Footer: React.FC = () => {
  return (
    <_Footer>
      <ModeBtn />
    </_Footer>
  );
};

export default Footer;
