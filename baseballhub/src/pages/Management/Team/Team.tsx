import styled from "styled-components";

import { TeamTable } from "@fragments/Team";

export function Team() {
  // TODO: 선수 16명, 매니저 2명
  return (
    <Container>
      <Wrapper>
        <TeamTable />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Wrapper = styled.div`
  display: block;
  flex: 1;
  margin: 16px 0;
`;
