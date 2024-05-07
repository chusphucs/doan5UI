import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link, useLocation } from "react-router-dom";

export default function UserUpdate() {
  const location = useLocation();
  const isActive = (targetPath) => {
    return location.pathname === targetPath;
  };
  return (
    <div className="">
      <MainLayout>
        <div className="grid grid-cols-5 pt-14 h-screen">
          <div className="relative md:grid col-span-1 bg-[#FFFEF9] hidden  ">
            <div className="pt-6 px-4 flex flex-col">
              <Link
                to={"/"}
                className={`px-4 py-2 flex gap-1 items-center ${
                  isActive("/")
                    ? "text-blue-900 px-2 bg-red-400 opacity-50 font-bold rounded-3xl"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                Today
              </Link>
              <Link
                to={"/user/upcoming"}
                className={`px-4 py-2 flex gap-1 items-center ${
                  isActive("/user/upcoming")
                    ? "text-blue-900 px-2 bg-red-400 opacity-50 font-bold rounded-3xl"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                Upcoming
              </Link>
            </div>
            <div>
              <p className="font-bold mt-[-180px] p-4">My teams</p>
              <hr className="border-gray-300 border-b-[1px]" />
              <Link to={"/teams/:id"}># teamname</Link>
            </div>
            <div className="absolute bottom-6 right-10">
              <p className="font-bold">+ Add new team</p>
            </div>
          </div>
          <div className="md:grid md:col-span-4 grid col-span-5">
            <div className="flex flex-col">
              <div className="flex items-center px-12 pt-10 pb-1">
                <h1 className="text-3xl font-bold mr-8">Update profile</h1>
              </div>
              <div className="md:grid md:grid-cols-3 flex flex-col gap-10 pl-10 md:pl-32 pt-4">
                <form noValidate>
                  <div className="mb-2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none "
                      placeholder="Email@gmail.com"
                      readOnly
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      value="zxcvbnm"
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
