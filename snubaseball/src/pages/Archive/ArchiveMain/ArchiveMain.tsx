import styled from "styled-components";

import { Divider } from "@components/Dividers";

export function ArchiveMain() {
  return (
    <Container>
      <Wrapper>
        <Subtitle>
          MEMORIES
          <span>_순간의 기록</span>
        </Subtitle>
        <Divider text="2024" type="dashed" />
      </Wrapper>
      <Subtitle>
        INTERVIEW
        <span>_우리들의 이야기</span>
      </Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Subtitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;

  > span {
    font-size: 1rem;
    font-weight: 400;
  }
`;
