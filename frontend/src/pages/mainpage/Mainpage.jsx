import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import RecordingButton from "./RecordingButton";
import RecordedAudio from "./RecordedAudio";
import MainLayout from "./MainLayout";
import SumPage from "./SumPage";
import API from "../../API";
import "../../App.css"

const Mainpage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [summation, setSummation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setIsStart(true);

      recorder.ondataavailable = async (event) => {
        const audioBlob = new Blob([event.data], { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.wav");

        try {
          setIsLoading(true);
          await API.uploadAudio(formData);
          const result = await API.getSummation();
          setSummation(result);
        } catch (err) {
          console.error(err);
          setErrorMessage(err.message || "알 수 없는 에러가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecordingStartTime(Date.now());
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setErrorMessage("마이크 접근 실패");
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
    <div
      className="flex flex-col items-center justify-end h-screen"
      style={{ background: "#E4E4E7" }}
    >
      <div className="w-full flex flex-col items-center justify-end h-full rounded-none pt-12 shadow-2xl bg-gray-100 border-10 lg:w-5/6 lg:h-5/6 lg:pt-0 lg:rounded-t-2xl 2xl:w-3/4">
        
        <SumPage isStart={isStart} summation={summation} isLoading={isLoading} errorMessage={errorMessage} />
        <RecordedAudio audioURL={audioURL} />
        <div
          id="text창"
          className="flex items-center justify-between p-8 space-x-4 mb-4 w-5/6 h-20 rounded-3xl border border-gray-200 shadow-xl text-sm lg:text-base 2xl:text-base"
        >
          <div className="flex items-center justify-between space-x-4">
            <div className="text-nowrap">요약 언어</div>
            <select className="w-24 h-12 rounded-xl p-2 border-none">
              <option>한국어</option>
              <option>English</option>
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
