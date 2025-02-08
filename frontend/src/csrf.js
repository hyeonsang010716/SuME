const API_URL = "http://localhost:5000";
// const API_URL = "http://sume-backend:5000";

export const getCsrfToken = async () => {
  try {
    const response = await fetch(`${API_URL}/csrf_token`, { credentials: "include" });
    const data = await response.json();
    localStorage.setItem("csrf_token", data.csrf_token);
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
};

export const getStoredCsrfToken = () => {
  return localStorage.getItem("csrf_token");
};
