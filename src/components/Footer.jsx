import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="border-t-slate-300 border-t mt-4 ">
      <Container>
        <div className="md:flex-row justify-between py-8 flex flex-col gap-10 ">
          <div>
            <ul className="lg:flex gap-6 space-y-4 lg:space-y-0 text-xs">
              <li>
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li>
                <Link>Mới nhất</Link>
              </li>
              <li>
                <Link to={"/study"}>Bán chạy</Link>
              </li>
              <li>
                <Link>Tác giả</Link>
              </li>
            </ul>
          </div>
          <div className="font-semibold">STORY & BOOK</div>
          <div className="text-xs">Copyright © 2024 Planet Earth Store</div>
        </div>
      </Container>
    </div>
  );
}
