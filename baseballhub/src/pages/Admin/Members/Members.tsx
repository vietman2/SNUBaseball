import styled from "styled-components";

export function Members() {
  return (
    <>
      <Container>
        <Title>부원관리</Title>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;
