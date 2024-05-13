import React from "react";
import MainLayout from "../layouts/MainLayout";
import avatar from "../assets/avatar.jpg";
import Nav from "../components/Nav";

export default function TeamPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-5 pt-14 h-screen">
        <Nav />
        <div className="md:grid md:col-span-4 grid col-span-5">
          <div className="flex flex-col">
            <div className="w-full p-4 justify-between items-center flex">
              <p className="ml-4 text-sm text-gray-600">Teams / teamname</p>
              <div className="flex mr-10 items-center gap-4">
                <button className="border-gray-500 border-[0.2px] px-2 pb-1 rounded-full">
                  +
                </button>
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full cursor-pointer border-gray-500 border-[0.2px] shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
