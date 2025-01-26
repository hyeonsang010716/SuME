import API from "../../API";
import React, { useState, useEffect } from "react";

const TextInputForm = () => {
  const [inputText, setInputText] = useState(""); // 사용자 입력 텍스트
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지
  const handleTextSubmit = async () => {
    try {
      const response = await API.postText(inputText); // 텍스트 POST 요청
      console.log("Text submitted successfully:", response);
      setInputText(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error submitting text:", error);
      setErrorMessage("텍스트 전송 실패");
    }
  };

  return(
    <div className="mt-4">
      {errorMessage}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="텍스트를 입력하세요"
            className="w-3/4 p-2 border border-gray-400 rounded"
          />
          <button
            onClick={handleTextSubmit}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            전송
          </button>
        </div>
  );
};

export default TextInputForm