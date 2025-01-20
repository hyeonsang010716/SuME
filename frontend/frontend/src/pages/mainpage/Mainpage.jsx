import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import RecordingButton from "./RecordingButton";
import RecordedAudio from "./RecordedAudio";

const Mainpage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = async (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.wav");

        try {
          const response = await fetch("/audio", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            console.log("File uploaded successfully");
          } else {
            console.error("File upload failed");
          }
        } catch (err) {
          console.error("Error uploading file:", err);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecordingStartTime(Date.now());
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setRecordingStartTime(null);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isRecording && recordingStartTime) {
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");
        setElapsedTime(`${minutes}:${seconds}`);
      }, 1000);
    } else {
      setElapsedTime("00:00");
    }

    return () => clearInterval(timer);
  }, [isRecording, recordingStartTime]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="w-full flex flex-col items-center justify-end pb-28 h-full bg-gray-100 border-10 sm:w-2/3 xl:w-1/2">
        <h1 className="text-2xl font-bold mb-4">회의 녹음기</h1>
        <RecordedAudio audioURL={audioURL} />
        <div className="flex items-center justify-between p-8 space-x-4 mb-4 w-5/6 h-20 rounded-3xl border border-gray-600">
        <div className="flex items-center justify-between space-x-4">
          <div>선택 언어</div>
          <select className="w-24 h-12 rounded-3xl p-2 border-none">
            <option>한국어</option>
            <option>Engilsh</option>
          </select>
        </div>
        <div className="flex space-x-4 items-center justify-center">
          <RecordingButton
            isRecording={isRecording}
            onClick={isRecording ? stopRecording : startRecording}
          />
          <TimerDisplay elapsedTime={elapsedTime} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
