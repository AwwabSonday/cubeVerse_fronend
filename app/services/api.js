const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper for making API requests with JSON headers and optional auth token
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data.message || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

// Auth API endpoints
export async function apiRegister(username, email, password) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export async function apiLogin(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiGetMe(token) {
  return request("/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function apiChangePassword(currentPassword, newPassword, token) {
  return request("/api/auth/password", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// Times / Statistics API endpoints
export async function apiGetTimes(category = "3x3", token) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/api/times${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function apiSaveTime({ time, scramble, category = "3x3" }, token) {
  return request("/api/times", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ time, scramble, category }),
  });
}

export async function apiDeleteTime(id, category = "3x3", token) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/api/times/${id}${query}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function apiResetTimes(category = "3x3", token) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/api/times/reset${query}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
