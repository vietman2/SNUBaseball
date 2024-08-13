import styled from "styled-components";

export function Interview() {
  return (
    <Container>
      <Cards>
        <Card />
        <Card />
        <Card />
      </Cards>
      <Title>[선수 인터뷰] 야구부 주장으로 살아남기</Title>
      <Subtitle>수학교육과 20 임준원</Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  gap: 10px;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  background: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 5px 0;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: black;
`;
