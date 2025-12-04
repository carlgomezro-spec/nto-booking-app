import api from "../apiClient";

// GET /tattoos
export const getTattoos = async () => {
  const response = await api.get("api/tattoos");
  return response.data; // Devuelve un array de tattoos
};
