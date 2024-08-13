import styled from "styled-components";

export function Memories() {
  return (
    <Container>
      <Row>
        <ImageBox>
          <Image1 src="https://via.placeholder.com/150" />
          <ImageTitle>Image Title</ImageTitle>
        </ImageBox>
      </Row>
      <Row>
        <ImageBox>
          <Image2 src="https://via.placeholder.com/150" />
          <ImageTitle>Image Title</ImageTitle>
        </ImageBox>
        <ImageBox>
          <Image2 src="https://via.placeholder.com/150" />
          <ImageTitle>Image Title</ImageTitle>
        </ImageBox>
      </Row>
      <Row>
        <ImageBox>
          <Image3 src="https://via.placeholder.com/150" />
          <ImageTitle>Image Title</ImageTitle>
        </ImageBox>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: "row";
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image1 = styled.img`
  width: 37.5vw;
  height: 250px;
`;

const Image2 = styled.img`
  width: 27.5vw;
  height: 110px;
`;

const Image3 = styled.img`
  width: 27.5vw;
  height: 250px;
`;

const ImageTitle = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: black;
`;
