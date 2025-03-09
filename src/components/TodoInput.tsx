import React, { useState } from "react";
import styled from "styled-components";
import { useTodo } from "../context/TodoContext";

function TodoInput() {
  const { addTodo } = useTodo();
  const [text, setText] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <InputContainer onSubmit={handleAddTodo}>
      <InputWrapper>
        <Input
          placeholder="Add your to-do ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <AddButton type="submit">Add</AddButton>
      </InputWrapper>
    </InputContainer>
  );
}

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 9999px;
  border: none;
  padding: 0 110px 0 20px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #2e2e2e;
  background-color: #fff;
  outline: none;
`;

const AddButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 10px 17px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  cursor: pointer;
  background-color: #526f92;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #425a77;
  }

  &:focus {
    outline: none;
  }
`;

export default TodoInput;
