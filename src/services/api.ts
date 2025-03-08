const API_URL = "https://nanameue-front-end-candidate-test.vercel.app/api";
const USERNAME = "flavio";

// api calls
export const getTodos = async () => {
  const response = await fetch(`${API_URL}/${USERNAME}/todos`);
  const data = await response.json();
  return data;
};

export const createTodo = async (text: string) => {
  const response = await fetch(`${API_URL}/${USERNAME}/todos/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  return await response.json();
};

export const updateTodo = async (id: string) => {
  const response = await fetch(`${API_URL}/${USERNAME}/todos/${id}/toggle`, {
    method: "PUT",
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${API_URL}/${USERNAME}/todos/${id}`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });
  const data = await response.json();
  return data;
};
