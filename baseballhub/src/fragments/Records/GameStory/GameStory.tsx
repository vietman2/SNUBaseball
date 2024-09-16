import styled from "styled-components";

import { IFrame } from "@components/Frames";

export function GameStory() {
  return (
    <Container>
      <IFrame videoId="U28Gz6Dev0w" width="95%" height="350" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
