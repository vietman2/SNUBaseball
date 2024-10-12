import { useState } from "react";
import styled from "styled-components";

import { ChipTabs } from "@components/Tabs";
import { BattingTable, PitchingTable } from "@fragments/Stats";
import { useWindowSize } from "@hooks/useWindowSize";

const types = ["타자", "투수"];

export function Stats() {
  const [selectedType, setSelectedType] = useState<string>("타자");

  const { width } = useWindowSize();

  return (
    <Container>
      <ChipTabs
        options={types}
        selected={selectedType}
        onSelect={setSelectedType}
      />
      <Wrapper offset={width > 768 ? "300px" : "48px"}>
        {selectedType === "타자" ? <BattingTable /> : <PitchingTable />}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Wrapper = styled.div<{ offset: string }>`
  display: block;
  flex: 1;
  flex-direction: column;
  width: calc(100vw - ${({ offset }) => offset});
  margin: 16px 0;

  overflow-x: auto;
  white-space: nowrap;
`;
