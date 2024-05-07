import React from "react";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="relative bg-[#eeeeee]">
      <Header />
      <div>{children}</div>
    </div>
  );
}
