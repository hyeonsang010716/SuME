import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const RecordingButton = ({ isRecording, onClick }) => {
  return (
    <button
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md ${
        isRecording ? "bg-pink-500 animate-pulse" : "bg-pink-400 hover:bg-pink-500 transition duration-300 "
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} size="x" />
    </button>
  );
};

export default RecordingButton;
