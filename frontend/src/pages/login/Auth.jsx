import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
import API from "../../API";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 이메일 유효성 검사 (정규식)
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 비밀번호 길이 검사 (8~12자리)
  const isValidPassword = (password) => {
    return password.length >= 8 && password.length <= 12;
  };

  // 회원가입 처리
  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("올바른 이메일 형식을 입력하세요. (예: example@domain.com)");
      return;
    }

    if (!isValidPassword(password)) {
      alert("비밀번호는 8~12자리여야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);

    try {
      await API.register(name, email, password);
      alert("회원가입 성공!");

      // 회원가입 후 자동 로그인
      await API.login(email, password);
      navigate("/"); // 홈 화면으로 이동
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-[600px] w-[800px] bg-white shadow-md p-8 pt-4 rounded-xl">
      <div className="text-2xl font-bold text-center text-gray-600">Join</div>

      <div className="w-5/6 h-full bg-gray-100 rounded-2xl p-10 shadow-xl flex flex-col items-center justify-center mt-4 gap-6">
        {/* 이름 입력 */}
        <div className="flex flex-col w-5/6">
          <label htmlFor="name-input" className="text-sm font-semibold text-gray-500 mb-2">
            Name
          </label>
          <input
            id="name-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* 이메일 입력 */}
        <div className="flex flex-col w-5/6">
          <label htmlFor="email-input" className="text-sm font-semibold text-gray-500 mb-2">
            Email
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border ${isValidEmail(email) || email === "" ? "border-gray-300" : "border-red-500"} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {!isValidEmail(email) && email !== "" && (
            <p className="text-red-500 text-xs mt-1">올바른 이메일을 입력하세요.</p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col w-5/6">
          <label htmlFor="password-input" className="text-sm font-semibold text-gray-500 mb-2">
            Password
          </label>
          <input
            id="password-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border ${isValidPassword(password) || password === "" ? "border-gray-300" : "border-red-500"} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {!isValidPassword(password) && password !== "" && (
            <p className="text-red-500 text-xs mt-1">비밀번호는 8~12자리여야 합니다.</p>
          )}
        </div>

        {/* 비밀번호 확인 입력 */}
        <div className="flex flex-col w-5/6">
          <label htmlFor="confirm-password-input" className="text-sm font-semibold text-gray-500 mb-2">
            Password 재입력
          </label>
          <input
            id="confirm-password-input"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 border ${password === confirmPassword || confirmPassword === "" ? "border-gray-300" : "border-red-500"} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {password !== confirmPassword && confirmPassword !== "" && (
            <p className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        {/* 회원가입 버튼 */}
        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleRegister}
            disabled={!name || !email || !password || !confirmPassword || !isValidEmail(email) || !isValidPassword(password) || password !== confirmPassword || loading}
            className={`px-6 py-2 font-semibold rounded-lg shadow-lg transition-all duration-300 ${
              name && email && password && confirmPassword && isValidEmail(email) && isValidPassword(password) && password === confirmPassword && !loading
                ? "bg-blue-400 text-white hover:bg-blue-500"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Auth;
