import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const RecordingButton = ({ isRecording, onClick }) => {
  return (
    <button
      className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md ${
        isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500"
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} size="2x" />
    </button>
  );
};

export default RecordingButton;
