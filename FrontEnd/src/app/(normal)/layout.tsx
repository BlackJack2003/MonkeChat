import "@/styles/globals.css";

import Header from "@/components/header/header";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
