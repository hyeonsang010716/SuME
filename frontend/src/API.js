const API_URL = "http://localhost:8001";

const API = {
  //Audio POST
  uploadAudio: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },
  // 텍스트 POST 요청 (챗봇 기능 구현한다면 사용 예정)
  /*
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
  },*/

  //요약본 GET
  getSummation: async () => {
    try {
      const response = await fetch(`${API_URL}/audio`);
      if (!response.ok) {
        throw new Error("Failed to fetch Summation");
      }

      return await response.text();
    } catch (error) {
      console.error("Error fetching Summation:", error);
      throw error;
    }
  },
};

export default API;
