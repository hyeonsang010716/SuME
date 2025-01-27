import React from "react";

const RecordedAudio = ({ audioURL }) => {
  if (!audioURL) return null;

  return (
    <div>
      <audio controls src={audioURL} className="mt-2" />
    </div>
  );
};

export default RecordedAudio;
