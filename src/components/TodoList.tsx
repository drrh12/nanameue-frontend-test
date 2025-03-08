import React, { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";

function TodoList() {
  const [todos, setTodos] = useState([]);
  let todoID: string = "diWcIFvCAdz8K2jslpAe";

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = () => {
    createTodo("newTodo");
  };

  const handleUpdateTodo = () => {
    updateTodo(todoID);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todoID);
  };

  return (
    <div>
      <button onClick={handleCreateTodo}>create todo</button>
      <button onClick={handleUpdateTodo}>update todo</button>
      <button onClick={handleDeleteTodo}>delete todo</button>
      <p>{todos.map((todo) => JSON.stringify(todo))}</p>
    </div>
  );
}

TodoList.propTypes = {};

export default TodoList;
