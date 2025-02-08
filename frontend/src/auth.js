const API_URL = "http://localhost:5000";

// 사용자 로그인
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    await getCsrfToken(); // 로그인 후 CSRF 토큰 가져오기

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 로그아웃 (JWT 삭제)
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("csrf_token");
};
