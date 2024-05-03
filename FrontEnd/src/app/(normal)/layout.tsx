import "@/styles/globals.css";

import Header from "@/components/header/header";
import Footer from "@/components/appfooter";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
