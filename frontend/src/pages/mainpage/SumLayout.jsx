import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

const SumLayout = ({ isStart, isRecording, summation, isLoading, errorMessage }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (summation) {
      navigator.clipboard.writeText(summation)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500); // 3초 후 아이콘 원래대로
        })
        .catch(() => console.error("복사 실패"));
    }
  };

  return (
    <div
      id="top"
      className="w-full h-[350px] pt-8 md:pt-0 md:h-full flex flex-col items-center justify-start"
    >
      <div
        className={`h-full w-full rounded-2xl p-4 shadow-md transition-all duration-300 overflow-y border-2 border-white`}
        style={{
          background: "#F4F4F5",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowX: "hidden"
        }}
      >
        <div className="mb-4">
          {isLoading ? (
            <p className="no-wrap mr-2 font-bold text-lg" style={{color:"#6B6B6B"}}>요약 처리 중...</p>
          ) : (
            <div className="flex flex-col items-start justify-start relative">
              <h1 className="no-wrap mr-2 font-bold text-lg" style={{color:"#6B6B6B"}}>{isRecording ? "녹음 중..." : "요약내용"}</h1>
              <p className="no-wrap mr-2 font-bold text-md" style={{color:"#6B6B6B"}}>{summation || errorMessage}</p>
              {summation && (
                <button
                  className="text-gray-500 hover:text-gray-700 absolute top-0 right-0 focus:outline-none"
                  onClick={handleCopy}
                  label="Copy Summation"
                >
                  <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} size="lg" />
                  {isCopied && (
                    <div
                      className="absolute -top-4 -left-4 h-4 w-16 text-gray-600 text-xs font-extrabold rounded-sm"
                    >
                      복사완료!
                    </div>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SumLayout;