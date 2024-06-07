import React from "react";
import Header from "../components/Header";
import bghome from "../assets/bg.png";

export default function MainLayout({ children }) {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${bghome})`,
      }}
    >
      <Header />
      <div>{children}</div>
    </div>
  );
}
