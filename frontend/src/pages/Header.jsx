import React from "react";
import Title from "./Title";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative bg-white h-3/4 w-2/3 rounded-3xl shadow-xl">
      <Link
        to="/login"
        className="absolute right-4 top-8 text-base font-semibold"
        style={{color:"#6B6B6B"}}
      >
        Login
      </Link>

      <div id="title" className="flex items-center justify-center w-full h-1/6">
        <Title />
      </div>

      <div id="mid" className="flex items-center justify-center w-full h-1/6">
        <div
         className="w-2/3 h-5/6 rounded-3xl border-2 border-white shadow-xl opacity-50"
         style={{background:"#D9D9D9"}}
        >

        </div>
      </div>

      <div id="main" className="flex items-center justify-center w-full h-2/3">
        <div
          className="w-2/3 h-5/6 rounded-3xl border-2 border-white shadow-xl opacity-50"
          style={{background:"#D9D9D9"}}
        >

        </div>
      </div>
    </header>
  );
};

export default Header;
