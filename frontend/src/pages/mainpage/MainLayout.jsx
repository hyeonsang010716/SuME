import React from "react";

const MainLayout = () => {
  return (
  <div id="top" className="w-full h-5/6 flex flex-col items-center justify-center">
    <div className="flex w-full items-start justify-center">
      <p className="text-xl text-gray-500 font-bold mb-4">Summary MEETING</p>
    </div>
    <div className="w-1/2 h-2/3 rounded-2xl p-8 shadow-md" style={{ background: "#F4F4F5" }}>
      <div className="text-center mb-4">
        <p className="no-wrap">녹음을 통해 회의를 요약하세요.</p>
      </div>
    </div>
  </div>
  );
};

export default MainLayout;