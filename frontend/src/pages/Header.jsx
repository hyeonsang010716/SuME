import React from "react";
import Title from "./Title";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Header = ( {isMainPage} ) => {
  return (
    <header id="div1" className={`relative bg-white h-3/4 rounded-none ${isMainPage ? "md:w-[1200px]" : "md:w-[400px]"} md:rounded-3xl shadow-none md:shadow-xl w-full`}>
      <Link
        to="/login"
        className="absolute right-8 top-8 flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold transition-all duration-200 text-gray-500 hover:text-pink-400"
      >
        <FontAwesomeIcon icon={faUser} size="xl" />
      </Link>

      <div id="title" className="flex items-center justify-center w-full h-1/6">
        <Title />
      </div>
      
      <div id="mid" className="flex items-center justify-center w-full h-1/6">
        <Link
          to="/login"
          className="w-full h-full flex items-center justify-center"
        >
          <div
            className="flex items-center justify-center w-2/3 h-5/6 font-bold rounded-3xl border-2 border-white shadow-xl opacity-50 bg-gray-300 hover:bg-gray-400 transition duration-300"
          >
            로그인하러 가기
          </div>
        </Link>
      </div>
      <div id="mid" className="flex items-center justify-center w-full h-1/6">
        <Link
          to="/note"
          className="w-full h-full flex items-center justify-center"
        >
          <div
            className="flex items-center justify-center w-2/3 h-5/6 font-bold rounded-3xl border-2 border-white shadow-xl opacity-50 bg-gray-300 hover:bg-gray-400 transition duration-300"
          >
            회의 요약하러 가기
          </div>
        </Link>
      </div>
      {/*
      <div id="main" className="flex items-center justify-center w-full h-2/3">
        <div
          className="w-2/3 h-5/6 rounded-3xl border-2 border-white shadow-xl opacity-50"
          style={{background:"#D9D9D9"}}
        >
        </div>
      </div>
      */}
    </header>
  );
};

export default Header;
