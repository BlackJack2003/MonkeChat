import Header from "@/components/header/transparentHeader";
import Footer from "@/components/appfooter";
import React from "react";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
