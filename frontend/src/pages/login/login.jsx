import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 로그인 처리
  const handleLogin = async () => {
    if (!id || !password) {
      alert("입력 후 클릭하세요.");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center h-[525px] w-[800px] bg-white shadow-md p-8 pt-4 rounded-xl">
      <div className="text-2xl font-bold text-center text-gray-600">Login</div>

      <div className="w-5/6 h-full bg-gray-100 rounded-2xl p-10 shadow-xl flex flex-col items-center justify-center mt-4 gap-6">
        {/* ID 입력 */}
        <div className="flex flex-col w-5/6">
          <label htmlFor="id-input" className="text-sm font-semibold text-gray-500 mb-2">
            ID
          </label>
          <input
            id="id-input"
            type="text"
            placeholder="Enter your ID"
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
            disabled={!id || !password}
            className={`px-6 py-2 font-semibold rounded-lg shadow-lg transition-all duration-300 ${
              id && password ? "bg-pink-300 text-white hover:bg-pink-400" : "bg-gray-300 text-gray-500"
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
