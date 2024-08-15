import styled from "styled-components";

export function Interview() {
  return (
    <Container>
      <Cards>
        <Card src="https://kr.object.ncloudstorage.com/snubaseball.test/archive/interviews/%EC%9E%84%EC%A4%80%EC%9B%90/%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8%20%EC%84%A0%EC%88%98%20%EC%9D%B8%ED%84%B0%EB%B7%B0%20%EC%9E%84%EC%A4%80%EC%9B%90_%EB%8C%80%EC%A7%80%201-01.jpg" />
        <Card src="https://kr.object.ncloudstorage.com/snubaseball.test/archive/interviews/%EC%9E%84%EC%A4%80%EC%9B%90/%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8%20%EC%84%A0%EC%88%98%20%EC%9D%B8%ED%84%B0%EB%B7%B0%20%EC%9E%84%EC%A4%80%EC%9B%90_%EB%8C%80%EC%A7%80%201-02.jpg" />
        <Card src="https://kr.object.ncloudstorage.com/snubaseball.test/archive/interviews/%EC%9E%84%EC%A4%80%EC%9B%90/%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8%20%EC%84%A0%EC%88%98%20%EC%9D%B8%ED%84%B0%EB%B7%B0%20%EC%9E%84%EC%A4%80%EC%9B%90_%EB%8C%80%EC%A7%80%201-03.jpg" />
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
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Card = styled.img`
  display: flex;
  width: 25vw;
  height: 25vw;
  background: #f2f2f2;
  border-radius: 10px;
  margin: 5px 15px 5px 0px;
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
