import api from "../api/axios";

export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data.data;
};

export const createTask = async (task: any) => {
  const { data } = await api.post("/tasks", task);
  return data.data;
};

export const updateTask = async (id: string, task: any) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data.data;
};

export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data.data;
};