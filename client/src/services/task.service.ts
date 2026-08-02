import api from "../lib/axios";

export const getTasks = async (
  search = "",
  status = ""
) => {
  const response = await api.get("/tasks", {
    params: {
      search,
      status,
    },
  });

  return response.data;
};

export const getTaskStats = async () => {
  const response = await api.get("/tasks/stats");
  return response.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
  scheduledAt?: string;
}) => {
  const response = await api.post("/tasks", data);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    scheduledAt?: string;
    status?: string;
  }
) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};