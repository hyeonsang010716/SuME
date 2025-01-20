const API_URL = "http://localhost:3001"; // 백엔드 URL

const API = {
  uploadAudio: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      return await response.json(); // 서버 응답 데이터 반환
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // 에러를 호출한 쪽으로 전달
    }
  },
  // 텍스트 POST 요청 (챗봇 활용)
  postText: async (text) => {
    try {
      const response = await fetch(`${API_URL}/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Text submission failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting text:", error);
      throw error;
    }
  },

  getSummation: async () => {
    try {
      const response = await fetch(`${API_URL}/hi`);
      if (!response.ok) {
        throw new Error("Failed to fetch Summation");
      }

      return await response.text(); // 문자열 응답 처리
    } catch (error) {
      console.error("Error fetching Summation:", error);
      throw error;
    }
  },
};

export default API;
