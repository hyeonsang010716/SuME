import React, { useState, useEffect } from "react";
import Title from "./Title";
import Calender from "./calender/Calender";
import CalenderSummary from "./calender/CalenderSummary";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import API from "../API"; // API 가져오기

const Header = ({ isMainPage }) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenValid = API.checkTokenValidity();
    //setIsLoggedIn(tokenValid);
  }, [isMainPage]);

  const handleLogout = () => {
    console.log("logout 클릭");
    API.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header id="div1" className={`relative bg-white rounded-none md:rounded-t-[30px] xl:rounded-[30px] xl:rounded-3xl h-[525px] ${isMainPage ? "w-[400px]" : "w-full md:w-[800px] xl:w-[400px]"} shadow-none md:shadow-xl`}>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="absolute right-2 md:right-8 top-4 md:top-8 flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold transition-all duration-200 text-gray-500 hover:text-pink-400"
        >
          <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
        </button>
      ) : (
        <Link
          to="/login"
          className="absolute right-2 md:right-8 top-0 md:top-8 flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold transition-all duration-200 text-gray-500 hover:text-pink-400"
        >
          <FontAwesomeIcon icon={faUser} size="xl" />
        </Link>
      )}

      <div id="title" className="flex items-center justify-center w-full h-1/6">
        <Title />
      </div>
      
      {!isLoggedIn ? (
        <div id="mid" className="flex items-center justify-center w-full h-1/6">
          <Link to="/login" className="w-full h-full flex items-center justify-center">
            <div className="flex items-center justify-center w-2/3 h-5/6 font-bold rounded-3xl border-2 border-white shadow-xl opacity-50 bg-gray-300 hover:bg-gray-400 transition duration-300">
              로그인하러 가기
            </div>
          </Link>
        </div>
      ) : null}

      <div id="mid" className="flex items-center justify-center w-full h-1/6">
        <Link to="/note" className="w-full h-full flex items-center justify-center">
          <div className="flex items-center justify-center w-2/3 h-5/6 font-bold rounded-3xl border-2 border-white shadow-xl opacity-50 bg-gray-300 hover:bg-gray-400 transition duration-300">
            회의 요약하러 가기
          </div>
        </Link>
      </div>

      {isLoggedIn && (
        <div id="mid" className="flex items-center justify-center w-full h-2/3">
          <button
            onClick={() => {
              setIsCalenderOpen(true);
              document.body.classList.add("overflow-hidden"); // 모달 열릴 때 스크롤 방지
            }}
            className="w-2/3 h-5/6 rounded-xl font-bold shadow-xl opacity-50 bg-gray-100 border-2 border-white hover:bg-gray-300 transition duration-300"
          >
            <CalenderSummary />
          </button>
        </div>
      )}

      {/* 캘린더 모달 */}
      {isCalenderOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl w-4/5 md:w-1/2 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">캘린더</h2>
              <button
                className="text-red-500 font-bold text-lg"
                onClick={() => {
                  setIsCalenderOpen(false);
                  document.body.classList.remove("overflow-hidden"); // 모달 닫힐 때 스크롤 복구
                }}
              >
                ✖
              </button>
            </div>
            <Calender />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
