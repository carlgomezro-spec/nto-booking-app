import api from "../apiClient";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });

  // Guardamos el token
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  // Guardamos también el usuario en localStorage
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data; // data debe incluir { token, user }
};
export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
