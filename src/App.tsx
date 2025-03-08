import React from "react";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </>
  );
}

export default App;
