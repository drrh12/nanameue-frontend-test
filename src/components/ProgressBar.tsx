import React, { useMemo } from "react";
import styled from "styled-components";
import { useTodo } from "../context/TodoContext";

function ProgressBar() {
  const { todos } = useTodo();

  // calculate the progress percentage
  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    const completedTasks = todos.filter((todo) => todo.isDone).length;
    return Math.round((completedTasks / todos.length) * 100);
  }, [todos]);

  return (
    <ProgressContainer>
      <ProgressHeader>Progress</ProgressHeader>
      <ProgressBarContainer>
        <ProgressBarBackground />
        <ProgressBarFill width={progress} />
      </ProgressBarContainer>
      <ProgressText>{progress}% of tasks completed</ProgressText>
    </ProgressContainer>
  );
}

const ProgressContainer = styled.div`
  border-radius: 20px;
  padding: 18px 19px;
  margin-bottom: 36px;
  background-color: #576371;

  @media (max-width: 991px) {
    padding: 15px;
  }

  @media (max-width: 640px) {
    padding: 12px;
  }
`;

const ProgressHeader = styled.h2`
  color: white;
  font-size: 18px;
  margin: 0 0 12px 0;
  font-weight: 500;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressBarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #455261;
`;

const ProgressBarFill = styled.div<{ width: number }>`
  position: absolute;
  width: ${(props) => props.width}%;
  height: 100%;
  border-radius: 999px;
  background-color: #60c6ff;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  color: #e0e0e0;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  margin: 0;
`;

export default ProgressBar;
