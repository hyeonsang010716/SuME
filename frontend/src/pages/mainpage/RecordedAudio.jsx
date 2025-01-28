import React from "react";

const RecordedAudio = ({ audioURL }) => {
  if (!audioURL) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold">녹음된 파일</h2>
      <audio controls src={audioURL} className="mt-2" />
    </div>
  );
};

export default RecordedAudio;
