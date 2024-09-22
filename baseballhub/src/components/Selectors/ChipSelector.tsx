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
          bgColor={option === selected ? "#0F0F70" : "#B5B6B6"}
          color={option === selected ? "#E8E6F2" : "#0B1623"}
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
