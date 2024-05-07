import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "./Container";
import avatar from "../assets/avatar.jpg";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-white relative ">
      <Container>
        <div className="flex fixed left-0 w-screen bg-white justify-between h-14 items-center z-30 md:px-10 px-4 lg:px-16 border-b-[1px] border-gray-300 ">
          {/* logo */}
          <div className="flex items-center gap-6">
            <img
              className="w-12 hidden md:flex"
              src={require("../assets/logo.jpg")}
              alt="logo"
            />
            <a href="/" className="hidden lg:flex text-2xl font-semibold">
              Task management
            </a>
          </div>

          <div className=" relative flex items-center">
            {isLogin ? (
              <div className=" flex items-center gap-4 pr-4">
                <img
                  src={avatar}
                  alt="avatar"
                  onClick={() => {
                    setUserMenu(!userMenu);
                  }}
                  className="h-6 w-6 rounded-full cursor-pointer"
                />
                {userMenu ? (
                  <ul className="absolute top-10 bg-gray-300 w-24 pl-1 h-16 pt-1 z-30">
                    <li>
                      <Link to={"/user/update"}>Edit Profile</Link>
                    </li>
                    <li>
                      <Link to={"/login"}>Logout</Link>
                    </li>
                  </ul>
                ) : (
                  " "
                )}
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
