import React, { useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import styled from "styled-components";

function TodoItems() {
  const { todos, filteredTodos, deleteTodoItem, updateTodoItem } = useTodo();

  useEffect(() => {
    console.log(filteredTodos);
  }, [filteredTodos]);

  return (
    <TodoItemsContainer>
      {filteredTodos.length === 0 ? (
        <p>No matching tasks.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem key={todo._id}>
            <Checkbox
              type="checkbox"
              checked={todo.isDone}
              onChange={() => updateTodoItem(todo._id, !todo.isDone)}
              // onChange={() => console.log(`Toggled: ${todo.text}`)}
            />
            <TodoText>
              {todo.text} - {todo.isDone ? "Done" : "Not Done"}
            </TodoText>
            <OptionsButton onClick={() => deleteTodoItem(todo._id.toString())}>
              delete
            </OptionsButton>
          </TodoItem>
        ))
      )}
    </TodoItemsContainer>
  );
}

const TodoItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #526f92;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:checked {
    background-color: #2196f3;
    border-color: #2196f3;
  }

  &:checked::after {
    content: "✔";
    color: white;
    font-size: 14px;
    position: absolute;
  }
`;

const TodoText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const OptionsButton = styled.button`
  cursor: pointer;
  height: 0;
  width: 0;
`;

export default TodoItems;
