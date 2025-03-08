import React from "react";
import { useTodo } from "../context/TodoContext";

function TodoItems() {
  const { todos } = useTodo();
  return <div>{todos.map((todo) => JSON.stringify(todo))}</div>;
}

export default TodoItems;
