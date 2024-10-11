import styled from "styled-components";

import { StatsTable } from "@fragments/Stats";

export function Stats() {
  return (
    <Container>
      <div>Stats</div>
      <StatsTable />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;
