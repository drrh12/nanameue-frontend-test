import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
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
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  addTodo: (text: string) => Promise<void>;
  deleteTodoItem: (id: string) => Promise<void>;
  updateTodoItem: (id: string, completed: boolean) => Promise<void>;
  filteredTodos: Todo[];
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");

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

  //   const filteredTodos = todos.filter((todo) => {
  //     if (filter[0] === "all") return true;
  //     if (filter[0] === "done") return todo.isDone;
  //     if (filter[0] === "undone") return !todo.isDone;
  //   });

  const filteredTodos = useMemo(() => {
    console.log("current filter", filter);
    if (filter === "all") return todos;
    return todos.filter((todo) =>
      filter === "done" ? todo.isDone : !todo.isDone
    );
    // return todos.filter((todo) => {
    //   if (filter === "all") return true;
    //   if (filter === "done") return todo.isDone;
    //   if (filter === "undone") return !todo.isDone;
    // });
  }, [todos, filter]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodoItem,
        updateTodoItem,
        filter,
        setFilter,
        filteredTodos,
      }}
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
