// _app.js
import React from "react";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import "../styles/globals.css";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { RootState, store, AppDispatch } from "../redux/store/store";

function MyRootEle({
  Component,
  pageProps,
}: {
  Component: React.FC<any>;
  pageProps: any;
}) {
  var theme = useSelector((state: RootState) => {
    return state.theme;
  });
  const [myThemeDark, setmyThemeDark] = useState(false);
  useEffect(() => {
    return () => {
      setmyThemeDark(theme.darkMode === true);
      localStorage.setItem("theme", myThemeDark === true ? "dark" : "light");
    };
  }, [theme]);
  return (
    <div
      id="myRoot"
      className={(myThemeDark ? "dark bg-myBg-dark" : " bg-myBg") + " pb-2"}
    >
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC<any>;
  pageProps: any;
}) {
  return (
    <Provider store={store}>
      <MyRootEle Component={Component} pageProps={pageProps}></MyRootEle>
    </Provider>
  );
}
