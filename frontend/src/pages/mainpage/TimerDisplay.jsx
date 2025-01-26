import React from "react";

const TimerDisplay = ({ elapsedTime }) => {
  return <span className="text-xl font-semibold">{elapsedTime}</span>;
};

export default TimerDisplay;
