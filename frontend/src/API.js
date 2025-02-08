// 로컬
const API_URL = "http://localhost:5000";

// 서버
// const API_URL = "http://sume-backend:5000";

const API = {
  uploadAudio: async (formData) => {
    try {
      console.log("Upload Audio");
      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed. response failed.");
      }

      const data = await response.json();

      // filename과 file_path 저장
      localStorage.setItem("audio_filename", data.filename);
      localStorage.setItem("audio_file_path", data.file_path);
      console.log("Upload Audio 및 파일명 저장 완료");
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  getSummation: async () => {
    try {
      console.log("Get Summation");
      const filename = localStorage.getItem("audio_filename");
      const filePath = localStorage.getItem("audio_file_path");

      if (!filename || !filePath) {
        throw new Error("No audio file uploaded yet.");
      }

      const response = await fetch(
        `${API_URL}/audio?filename=${filename}&file_path=${filePath}`,  // path 수정
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Summation. response not ok.");
      }

      const data = await response.json();
      console.log(data);
      console.log("Get Summation done");
      return data.message;
      
    } catch (error) {
      console.error("Error fetching Summation:", error);
      throw error;
    }
  },
};

export default API;
