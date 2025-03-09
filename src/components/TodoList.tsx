import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import Filter from "./Filter";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";

function TodoList() {
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
            <ItemsWrapper>
              <TodoInput />
              <TodoItems />
            </ItemsWrapper>
          </main>
        </TodoContainer>
      </AppContainer>
    </div>
  );
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  background-color: #d1d0d9;
`;

const TodoContainer = styled.div`
  width: 40%;
  border-radius: 20px;
  padding: 60px;
  position: relative;
  background-color: #f5f5f5;
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

const ItemsWrapper = styled.div`
  width: 100%;
`;

TodoList.propTypes = {};

export default TodoList;
