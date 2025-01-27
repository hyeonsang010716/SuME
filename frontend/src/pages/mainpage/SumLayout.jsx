import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

const SumLayout = ({ isStart, summation, isLoading, errorMessage }) => {
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
      className="w-3/4 h-full flex flex-col items-center justify-start"
    >
      <div
        className=" h-full w-full rounded-2xl p-8 shadow-md transition-all duration-300"
        style={{ background: "#F4F4F5" }}
      >
        <div className="text-center mb-4">
          {isLoading ? (
            <p>요약 처리 중...</p>
          ) : (
            <div className="flex items-center justify-center relative">
              <p className="no-wrap mr-2" style={{color:"#6B6B6B"}}>{summation || errorMessage || "녹음을 통해 회의를 요약하세요."}</p>
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