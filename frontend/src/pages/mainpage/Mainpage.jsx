import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import RecordingButton from "./RecordingButton";
import RecordedAudio from "./RecordedAudio";
import Title from "../Title";
import SumLayout from "./SumLayout";
import Descript from "./Descript";
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
    <div id="div2" className="flex flex-col items-center w-2/3 h-3/4 bg-white rounded-3xl shadow-xl">
      <div id="title" className="w-full h-1/6">
        <Title />
      </div>

      <div id="main" className="w-5/6 h-2/3 flex items-center justify-center -mt-4 mb-4">
        <div className="w-1/3 h-full flex items-center justify-center">
          <Descript />
        </div>
        <div className="w-2/3 h-full flex items-center justify-center">
          <SumLayout isStart={isStart} summation={summation} isLoading={isLoading} errorMessage={errorMessage} />
        </div>
      </div>
      
      <div className="w-full h-1/4 flex items-center justify-center">
        <div
          id="text창"
          className="flex items-center justify-end p-8 space-x-4 mb-4 w-5/6 h-20 rounded-3xl border border-gray-200 shadow-xl text-sm lg:text-base 2xl:text-base"
        >
          <RecordedAudio audioURL={audioURL} />
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
