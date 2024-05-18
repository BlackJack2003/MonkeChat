import "@/styles/globals.css";

import Header from "@/components/header/header";
import Footer from "@/components/appfooter";
import React from "react";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await getServerSession();
  return (
    <>
      <Header />
      {children}
    </>
  );
}
