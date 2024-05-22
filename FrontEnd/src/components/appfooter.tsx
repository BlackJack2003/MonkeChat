"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setThemeDark, setThemeLight } from "../redux/actions/themeAction";
import { AppDispatch } from "../redux/store/nstore";
import { _Footer } from "./footer";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import {
  setEmail,
  setImage,
  setPrivateKey,
  setPublicKey,
  setSession,
  setSignOut,
  setUsername,
} from "@/redux/actions/sessionAction";

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
  const dataRef = useRef<Session | null>();
  const [isChecked, setIsChecked] = useState(false);
  const preferredThemeDark = useAppSelector((state: any) => {
    return state.theme.darkMode;
  });
  const myPass = useAppSelector((state) => state.session.password);
  useEffect(() => {
    setIsChecked(preferredThemeDark);
    const fetchData = async () => {
      console.log("maPass:", myPass);
      dataRef.current = await getSession();

      if (dataRef.current != null) {
        dispatch(setUsername(dataRef.current.user.name));
        dispatch(setEmail(dataRef.current.user.email));
        dispatch(setImage(dataRef.current.user.image));
        if (dataRef.current.user.pulic_key)
          dispatch(setPublicKey(dataRef.current.user.public_key));
        if (dataRef.current.user.private_key)
          dispatch(setPrivateKey(dataRef.current.user.private_key));
      } else {
        dispatch(setSignOut());
        // signOut();
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch data every 5 minutes
    return () => clearInterval(interval); // Clean up interval on component unmount
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
