// 로컬
const API_URL = "http://localhost:5000";

// 서버
// const API_URL = "http://sume-backend:5000";

const API = {
  // Upload Audio
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

  // Get Summation
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

  //회원가입
  register: async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "회원가입 실패");
      }
      
      console.log("회원가입 성공:",data);
      return data;
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      throw error;
    }
  },

  //Login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "로그인 실패");
      }

      // JWT 디코딩 (Base64 URL 디코딩)
      const tokenParts = data.access_token.split(".");
      const payload = JSON.parse(atob(tokenParts[1])); // Base64 디코딩
      const expirationTime = payload.exp * 1000; // 초 → 밀리초 변환

      // 현재 시간보다 1분 후에 토큰이 만료된다면, 문제 발생 가능
      if (Date.now() > expirationTime - 60000) {
        console.warn("발급된 JWT 토큰이 너무 빨리 만료됩니다.");
      }

      // JWT와 만료 시간 저장
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token_exp", expirationTime.toString());

      console.log("로그인 성공! JWT 저장 완료:", data.access_token);
      return data;
    } catch (error) {
      console.error("로그인 에러:", error.message);
      throw error;
    }
  },

  // JWT 검증
  getProfile: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("토큰이 없음");
      return null; // null 반환
    }

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("인증 실패");
      }

      console.log("프로필 정보:", data);
      return data; // 정상 반환
    } catch (error) {
      console.error("프로필 요청 에러:", error.message);
      return null; // 에러 발생 시 null 반환
    }
  },

  //JWT 유효성 확인
  checkTokenValidity: () => {
    const token = localStorage.getItem("token");
    const tokenExp = localStorage.getItem("token_exp");
    if (!token || !tokenExp) {
      console.log("토큰 없음. 로그아웃 상태 유지.");
      return false;
    }

    const currentTime = Date.now();
    if (currentTime > parseInt(tokenExp, 10)) {
      console.log("토큰 만료됨. 자동 로그아웃 진행.");
      API.logout();
      return false;
    }

    return true; // 유효한 토큰
  },

  // logout
  logout: () => {
    localStorage.removeItem("token");
    console.log("로그아웃 완료");
  },
};

export default API;
