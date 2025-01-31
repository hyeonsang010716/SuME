import React from "react";

const TimerDisplay = ({ elapsedTime }) => {
  return <span className="text-xl font-semibold" style={{color:"#6B6B6B"}}>{elapsedTime}</span>;
};

export default TimerDisplay;
