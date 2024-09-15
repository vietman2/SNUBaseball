import styled from "styled-components";

export default function Journals() {
  return (
    <Container>
      <Title>훈련 일지</Title>
      <Content>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
