import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import RecordingButton from "./RecordingButton";
import RecordedAudio from "./RecordedAudio";
import TextInputForm from "./TextInputForm";
import API from "../../API";

const Mainpage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingStartTime, setRecordingStartTime] = useState(null);``
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [summation, setSummation] = useState(""); // 요약 결과
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지

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
          // 파일 업로드
          setIsLoading(true); // 로딩 시작
          await API.uploadAudio(formData); // POST 요청으로 업로드

          // 처리 결과 가져오기
          const fetchSummation = async () => {
            try {
              const result = await API.getSummation(); // GET 요청
              setSummation(result); // 상태에 업데이트
            } catch (error) {
              console.error("Error fetching summary:", error);
              setErrorMessage("요약 가져오기 실패");
            } finally {
              setIsLoading(false); // 로딩 끝
            }
          };

          // 3초 간격으로 백엔드 처리가 완료됐는지 확인
          const pollForResult = () => {
            const interval = setInterval(async () => {
              try {
                const result = await API.getSummation();
                if (result) {
                  clearInterval(interval); // 결과를 가져오면 반복 중단
                  setSummation(result); // 상태 업데이트
                  setIsLoading(false);
                }
              } catch (err) {
                console.error("Polling error:", err);
              }
            }, 3000); // 3초 간격으로 확인
          };

          pollForResult(); // 결과 확인 시작
        } catch (err) {
          console.error("Error uploading file:", err);
          setErrorMessage("파일 업로드 실패");
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="w-full flex flex-col items-center justify-end pb-28 h-full bg-gray-100 border-10 sm:w-2/3 xl:w-1/2">
        <RecordedAudio audioURL={audioURL} />
        <div className="text-center mb-4">
          {isLoading ? (
            <p>요약 처리 중...</p>
          ) : (
            <p>{summation || errorMessage || "녹음을 통해 회의를 요약하세요."}</p>
          )}
        </div>
        <div
          id="text창"
          className="flex items-center justify-between p-8 space-x-4 mb-4 w-5/6 h-20 rounded-3xl border border-gray-400"
        >
          <div className="flex items-center justify-between space-x-4">
            <div>요약 언어</div>
            <select className="w-24 h-12 rounded-3xl p-2 border-none">
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
