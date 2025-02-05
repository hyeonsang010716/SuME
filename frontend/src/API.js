import { getStoredCsrfToken, getCsrfToken } from "./csrf";

const API_URL = "http://localhost:5000";

getCsrfToken();

const API = {
  uploadAudio: async (formData) => {
    try {
      const csrfToken = getStoredCsrfToken();

      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();

      // filename과 file_path 저장
      localStorage.setItem("audio_filename", data.filename);
      localStorage.setItem("audio_file_path", data.file_path);

      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  getSummation: async () => {
    try {
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
        throw new Error("Failed to fetch Summation");
      }

      const data = await response.json();
      return data.message;
      
    } catch (error) {
      console.error("Error fetching Summation:", error);
      throw error;
    }
  },
};

export default API;
