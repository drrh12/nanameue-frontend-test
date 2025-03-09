import React, { useState, useRef, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import styled from "styled-components";
import arrowDown from "../imgs/arrow-down.svg";

function Filter() {
  const { filter, setFilter } = useTodo();
  const [showPopover, setShowPopover] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatFilterText = (filterValue: string) => {
    return filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setShowPopover(false);
  };

  return (
    <FilterContainer ref={dropdownRef}>
      <DropdownButton onClick={togglePopover}>
        <FilterText>{formatFilterText(filter)}</FilterText>
        <DropdownIcon>
          <img src={arrowDown} alt="arrow-down" />
        </DropdownIcon>
      </DropdownButton>

      {showPopover && (
        <FilterPopover>
          {["all", "done", "undone"].map((filterOption) => (
            <FilterOption
              key={filterOption}
              active={filterOption === filter}
              onClick={() => handleFilterChange(filterOption)}
            >
              {formatFilterText(filterOption)}
            </FilterOption>
          ))}
        </FilterPopover>
      )}
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 10px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  min-width: 120px;
`;

const FilterText = styled.span`
  color: #2e2e2e;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;

const DropdownIcon = styled.span`
  font-size: 10px;
  color: #526f92;
`;

const FilterPopover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 110px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 6px;
  background-color: #fff;
  z-index: 10;
  margin-top: 5px;
`;

const FilterOption = styled.button<{ active: boolean }>`
  width: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #2e2e2e;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.active ? "#f5f5f5" : "transparent")};
  text-align: left;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #526f92;
  }
`;

export default Filter;
