import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useWindowSize } from "@hooks/useWindowSize";

interface Props {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function SimpleSelector({
  options,
  selected,
  onSelect,
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container
      $wide={width > 768}
      onClick={toggleDropdown}
      ref={containerRef}
      data-testid="selector"
    >
      <Selector>
        {selected}
        <AppIcon icon="down" size={18} color="#667BE8" />
      </Selector>
      <Dropdown>
        {isOpen &&
          options.map((option) => (
            <Item
              key={option}
              onClick={() => onSelect(option)}
              $isSelected={option === selected}
            >
              {option}
            </Item>
          ))}
      </Dropdown>
    </Container>
  );
}

const Container = styled.div<{ $wide: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  font-size: ${({ $wide }) => ($wide ? 16 : 12)}px;
`;

const Selector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 4px 8px 12px;
  gap: 8px;

  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.offWhite};
  border-radius: 8px;

  div:first-child {
    flex: 1;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.lavender};
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
`;

const Item = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;

  font-weight: ${({ $isSelected }) => ($isSelected ? 600 : 400)};

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.lavender : theme.colors.offWhite};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.background}; /* Optional hover effect */
  }
`;
