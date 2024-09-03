import styled from "styled-components";

import { Chip } from "@components/Chips";

interface Props {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function ChipSelector({ options, selected, onSelect }: Props) {
  return (
    <ChipSelectorWrapper>
      {options.map((option) => (
        <Chip
          key={option}
          label={option}
          bgColor={option === selected ? "#0f0f70" : "#f0f0f0"}
          color={option === selected ? "white" : "#7f7f9c"}
          onClick={() => onSelect(option)}
        />
      ))}
    </ChipSelectorWrapper>
  );
}

const ChipSelectorWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
