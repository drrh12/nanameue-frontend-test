import React, { useState, useRef, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import { useWeb3 } from "../context/Web3Context";
import styled from "styled-components";
import deleteIcon from "../imgs/delete-icon.svg";

function TodoItems() {
  const { filteredTodos, deleteTodoItem, updateTodoItem } = useTodo();
  const { rewardTaskCompletion, isConnected } = useWeb3();
  // state to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(filteredTodos);
  }, [filteredTodos]);

  const toggleDropdown = (todoId: string) => {
    setOpenDropdownId(openDropdownId === todoId ? null : todoId);
  };

  // handle task completion and reward
  const handleTaskCompletion = async (todoId: string, isDone: boolean) => {
    // only reward if task is completed and wallet connected
    if (!isDone && isConnected) {
      try {
        await updateTodoItem(todoId, true);
        await rewardTaskCompletion();
      } catch (error) {
        console.error("Error handling task completion:", error);
      }
    } else {

      await updateTodoItem(todoId, isDone);
    }
  };

  return (
    <TodoItemsContainer>
      {filteredTodos.length === 0 ? (
        <p>No matching tasks.</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem key={todo._id}>
            <TodoTextContainer>
              <Checkbox
                type="checkbox"
                checked={todo.isDone}
                // onChange={() => updateTodoItem(todo._id, !todo.isDone)}
                // onChange={() => console.log(`Toggled: ${todo.text}`)}
                onClick={() => handleTaskCompletion(todo._id, todo.isDone)}
              />
              <TodoText>{todo.text}</TodoText>
            </TodoTextContainer>
            <OptionsContainer>
              <OptionsButton onClick={() => toggleDropdown(todo._id)}>
                <img src={deleteIcon} alt="Delete" />
              </OptionsButton>
              {openDropdownId === todo._id && (
                <DropdownMenu ref={dropdownRef}>
                  <DropdownItem onClick={() => deleteTodoItem(todo._id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              )}
            </OptionsContainer>
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
  justify-content: space-between;
  width: 100%;
  height: 46px;
  border-radius: 9999px;
  border: none;
  padding: 0 16px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #2e2e2e;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
`;

const TodoTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
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
    background-color: #576371;
    border-color: #576371;
  }

  &:checked::after {
    content: "✔";
    color: white;
    font-size: 14px;
    position: absolute;
  }
`;

const TodoText = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 500;
`;

const OptionsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const OptionsButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 10;
  min-width: 100px;
  margin-top: 5px;

  @media (max-width: 640px) {
    right: 0;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  color: #526f92;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default TodoItems;
