import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../services/api";

export interface Todo {
  _id: string;
  username: string;
  text: string;
  isDone: boolean;
  createdAt: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  addTodo: (text: string) => Promise<void>;
  deleteTodoItem: (id: string) => Promise<void>;
  updateTodoItem: (id: string, completed: boolean) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(["all", "done", "undone"]);

  const fetchTodos = async () => {
    try {
      let data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (text: string) => {
    try {
      await createTodo(text);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoItem = async (id: string) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoItem = async (id: string, completed: boolean) => {
    try {
      await updateTodo(id);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, addTodo, deleteTodoItem, updateTodoItem }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
