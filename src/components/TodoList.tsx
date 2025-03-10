import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import Filter from "./Filter";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import { useWeb3 } from "../context/Web3Context";

function TodoList() {
  const { connectWallet, userAddress, tokenBalance, isConnected } = useWeb3();

  return (
    <div>
      <AppContainer>
        <TodoContainer>
          <ProgressBar />
          <header>
            <TodoHeader>
              <TodoTitle>To-dos</TodoTitle>
              {isConnected ? (
                <TokenDisplay>
                  <TokenLabel>Tokens:</TokenLabel>
                  <TokenValue>{tokenBalance}</TokenValue>
                </TokenDisplay>
              ) : (
                <ConnectButton onClick={connectWallet}>
                  Connect Wallet
                </ConnectButton>
              )}
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

const TokenDisplay = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 8px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TokenLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #666;
  margin-right: 8px;
`;

const TokenValue = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #4c49ed;
`;

const ConnectButton = styled.button`
  background-color: #4c49ed;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3c39dd;
  }
`;

const ItemsWrapper = styled.div`
  width: 100%;
`;

TodoList.propTypes = {};

export default TodoList;
