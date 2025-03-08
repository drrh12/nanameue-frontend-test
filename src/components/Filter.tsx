import React from "react";
import { useTodo } from "../context/TodoContext";
import styled from "styled-components";
function Filter() {
  const { filter, setFilter } = useTodo();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <FilterContainer>
      <label>filter</label>
      <FilterSelect value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </FilterSelect>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #526f92;
  }
`;

export default Filter;
