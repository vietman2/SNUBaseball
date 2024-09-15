import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <SubContainer>
        <Title>UPCOMING</Title>
      </SubContainer>
      <SubContainer>
        <Title>PHOTO</Title>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
