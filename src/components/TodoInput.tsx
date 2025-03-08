import React, { useState } from "react";
import styled from "styled-components";
import { useTodo } from "../context/TodoContext";
function TodoInput() {
  const { addTodo } = useTodo();
  const [text, setText] = useState("");

  const handleAddTodo = () => {
    addTodo(text);
  };

  return (
    <InputContainer>
      <Input onChange={(e) => setText(e.target.value)}></Input>
      <AddButton onClick={handleAddTodo}>ADD</AddButton>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 9999px;
  border: none;
  padding: 0 80px 0 20px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #2e2e2e;
  background-color: #fff;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #526f92;
  }
`;

const AddButton = styled.button`
  background-color: #526f92;
  color: #fff;
  border: none;
  border-radius: 8px;
`;

export default TodoInput;
