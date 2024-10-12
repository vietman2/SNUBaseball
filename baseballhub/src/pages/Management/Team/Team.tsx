import styled from "styled-components";

import { Chip } from "@components/Chips";
import { useAuth } from "@contexts/auth";
import { TeamTable } from "@fragments/Team";

export function Team() {
  // TODO: 선수 16명, 매니저 2명
  const { user } = useAuth();

  return (
    <Container>
      <TopWrapper>
        {user?.role === "주장" && (
          <Chip label="신입부원 추가" onClick={() => {}} />
        )}
      </TopWrapper>
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

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.div`
  display: block;
  flex: 1;
  margin: 16px 0;
`;
