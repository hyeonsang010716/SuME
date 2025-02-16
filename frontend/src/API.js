const API_URL = "http://localhost:5000"; // 로컬
// const API_URL = "http://sume-backend:5000"; // 서버

const API = {
  // 날짜 포맷 변환 함수 (YYYY-MM-DD 형식으로 변환)
  formatDate: (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  },

  // 오디오 업로드
  uploadAudio: async (formData) => {
    try {
      console.log("Audio 업로드 중");
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const data = await response.json();
      localStorage.setItem("audio_filename", data.filename);
      localStorage.setItem("audio_file_path", data.file_path);
      console.log("Audio 업로드 완료");
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  // Summation 요청
  getSummation: async () => {
    try {
      const token = localStorage.getItem("token");
      // 현재 사용자 ID 가져오기
      let response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const userData = await response.json();
      console.log("User ID:", userData.user_id);
      if (!response.ok) {
        throw new Error("사용자 ID 가져오기 실패");
      }

      console.log("Summation 요청");
      const filename = localStorage.getItem("audio_filename");
      const filePath = localStorage.getItem("audio_file_path");

      if (!filename || !filePath) {
        throw new Error("No audio file uploaded yet.");
      }

      response = await fetch(
        `${API_URL}/audio?filename=${filename}&file_path=${filePath}&user_id=${userData.user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Summation.");
      }

      const data = await response.json();
      console.log("Summation 요청 완료", data);
      const isConfirmed = window.confirm("일정을 저장하시겠습니까?");
      if (isConfirmed) {
        alert("일정을 저장했습니다.");
      } else {
        let event_ids = data.event_ids;
        console.log("삭제할 이벤트 id: ",event_ids);
        event_ids.map(id => {
          API.deleteEvent(id);
        })
      }
      return data.message;
    } catch (error) {
      console.error("Error fetching Summation:", error);
      throw error;
    }
  },

  // 회원가입
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

      console.log("회원가입 성공:", data);
      return data;
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      throw error;
    }
  },

  // 로그인
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
      const payload = JSON.parse(atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/")));
      const expirationTime = payload.exp * 1000;

      if (Date.now() > expirationTime - 60000) {
        console.warn("발급된 JWT 토큰이 너무 빨리 만료됩니다.");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token_exp", expirationTime.toString());

      console.log("로그인 성공! JWT 저장 완료");
      return data;
    } catch (error) {
      console.error("로그인 에러:", error.message);
      throw error;
    }
  },

  // 프로필 정보 가져오기
  getProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 없음");
      return null;
    }

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("인증 실패");
      }

      const data = await response.json();
      console.log("프로필 정보:", data);
      return data;
    } catch (error) {
      console.error("프로필 요청 에러:", error.message);
      return null;
    }
  },

  // 토큰 검증
  checkTokenValidity: () => {
    const token = localStorage.getItem("token");
    const tokenExp = localStorage.getItem("token_exp");
    if (!token || !tokenExp) {
      console.log("토큰 없음. 로그아웃 상태 유지");
      sessionStorage.setItem("summation","");
      return false;
    }

    if (Date.now() > Number(tokenExp)) {
      console.log("토큰 만료됨. 자동 로그아웃 진행");
      API.logout();
      return false;
    }

    return true;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    sessionStorage.setItem("summation", "");
    console.log("로그아웃 완료");
  },

  // 이벤트(일정) 가져오기
  getEvents: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 없음");
      return [];
    }

    try {
      // 현재 사용자 ID 가져오기
      let response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      console.log("User ID:", userData.user_id);
      if (!userData.user_id) throw new Error("유효한 사용자 ID가 없습니다.");

      // 캘린더 API 요청
      const url = new URL(`${API_URL}/calendar/events`);
      url.searchParams.append("user_id", userData.user_id);
      url.searchParams.append("start", "2024-02-01");
      url.searchParams.append("end", "2026-02-20");

      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("이벤트 받아오기 실패");
      }

      const data = await response.json();
      console.log("이벤트 data:", data); // 변환 전 데이터 확인

      // FullCalendar에서 인식 가능한 날짜 형식으로 변환
      return data.map(event => ({
        id: event.id,
        title: event.title,
        start: API.formatDate(event.start_time),  // 날짜 변환 적용
        end: API.formatDate(event.end_time),
        description: event.description
      }));
    } catch (error) {
      console.error("이벤트 받아오기 에러:", error.message);
      return [];
    }
  },
  
  // 새로운 이벤트 추가
  createEvent: async (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 없음");
      return null;
    }

    try {
      // 현재 사용자 ID 가져오기
      let response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const userData = await response.json();
      console.log("User ID:", userData.user_id);
      if (!response.ok) {
        throw new Error("사용자 ID 가져오기 실패");
      }

      // 새 이벤트 추가 요청
      response = await fetch(`${API_URL}/calendar/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userData.user_id,  // 유저 ID 포함
          title: event.title,
          start: event.start,
          end: event.end,
          description: event.description,
        }),
      });

      if (!response.ok) {
        throw new Error("이벤트 추가 실패");
      }
      const data = await response.json();
      console.log("새 이벤트 추가 성공:", data);

      const updatedEvents = await API.getEvents();
    return updatedEvents.find(e => e.id === data.id) || null; // 방금 생성한 이벤트 반환
    } catch (error) {
      console.error("이벤트 추가 에러:", error.message);
      throw error;
    }
  },

  // 이벤트 삭제
  deleteEvent: async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("토큰이 없음");
      return null;
    }

    try {
      const response = await fetch(`${API_URL}/calendar/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error("이벤트 삭제 실패");
      }

      console.log(`이벤트 (ID: ${eventId}) 삭제 성공`);
      return true;
    } catch (error) {
      console.error("이벤트 삭제 에러:", error.message);
      throw error;
    }
  }
};

export default API;
