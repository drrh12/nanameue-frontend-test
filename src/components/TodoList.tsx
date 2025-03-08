import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/api";
import ProgressBar from "./ProgressBar";
import Filter from "./Filter";
import TodoInput from "./TodoInput";
import TodoTasks from "./TodoTasks";

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
      <AppContainer>
        <TodoContainer>
          <ProgressBar />
          <header>
            <TodoHeader>
              <TodoTitle>To-dos</TodoTitle>
              <Filter></Filter>
            </TodoHeader>
          </header>
          <main>
            <TodoInput />
            <TodoTasks />
          </main>
        </TodoContainer>
      </AppContainer>
    </div>
  );
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  background-color: #d1d0d9;
`;

const TodoContainer = styled.div`
  width: 720px;
  border-radius: 20px;
  padding: 40px;
  position: relative;
  background-color: #f5f5f5;

  @media (max-width: 991px) {
    width: 100%;
    max-width: 720px;
    padding: 20px;
  }

  @media (max-width: 640px) {
    padding: 15px;
  }
`;

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TodoTitle = styled.h1`
  color: #000;
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

TodoList.propTypes = {};

export default TodoList;
