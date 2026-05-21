import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getTodoApi = () => {
  return api.get("/api/getTodo");
};

export const createTodoApi = (newTodo: { name: string }) => {
  return api.post("/api/createTodo", newTodo);
};

export const deleteTodoApi = (id: string) => {
  return api.delete(`/api/deleteTodo/${id}`);
};

export const updateTodoApi = (updatedTodo: { id: string , name:string }) => {
  return api.put(`/api/updateTodo/${updatedTodo.id}`, updatedTodo);
};
