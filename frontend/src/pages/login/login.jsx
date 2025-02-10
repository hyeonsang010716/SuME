import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import API from "../../API";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 로그인 처리
  const handleLogin = async () => {
    if (!id) {
      alert("이메일을 입력하세요.");
      return;
    } else if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    console.log("login 버튼 클릭");

    try {
      await API.login(id, password);
      navigate("/");
    } catch (error) {
      alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center h-[525px] w-[800px] bg-white shadow-md p-8 pt-4 rounded-xl">
      <div className="text-2xl font-bold text-center text-gray-600">Login</div>

      <div className="w-5/6 h-full bg-gray-100 rounded-2xl p-10 shadow-xl flex flex-col items-center justify-center mt-4 gap-6">
        {/* ID 입력 */}
        <div className="flex flex-col w-5/6">
          <label htmlFor="id-input" className="text-sm font-semibold text-gray-500 mb-2">
            Email
          </label>
          <input
            id="id-input"
            type="text"
            placeholder="Enter your Email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col w-5/6 relative">
          <label htmlFor="password-input" className="text-sm font-semibold text-gray-500 mb-2">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <span
              onClick={togglePasswordVisibility}
              className="text-gray-400 absolute top-3 right-4 cursor-pointer"
            >
              {passwordVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </span>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="w-full mt-10 flex items-center justify-center">
          <button
            onClick={handleLogin}
            className="w-28 py-2 font-semibold rounded-lg shadow-lg transition-all duration-300 mr-4 bg-pink-300 text-white hover:bg-pink-400"
          >
            Login
          </button>
          <Link
            to="/Auth"
            className="flex items-center justify-center w-28 py-2 ml-4 font-semibold rounded-lg shadow-lg transition-all duration-300 bg-white border-2 hover:bg-green-300 text-gray-500 hover:text-white hover:border-green-300"
          >
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
