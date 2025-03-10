import React from "react";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import { Web3Provider } from "./context/Web3Context";

function App() {
  return (
    <>
      <Web3Provider>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </Web3Provider>
    </>
  );
}

export default App;
