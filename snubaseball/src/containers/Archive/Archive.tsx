import styled from "styled-components";

import { Divider } from "@components/Dividers";

export default function Archive() {
  return (
    <Container>
      <Title>
        MEMORIES<Subtitle>_순간의 기록</Subtitle>
      </Title>
      <Line>
        <YearText>2024</YearText>
      </Line>
      <Grid>
        <ImageContainerLarge></ImageContainerLarge>
        <ImageContainerSmallTop></ImageContainerSmallTop>
        <ImageContainerSmallBottom></ImageContainerSmallBottom>
        <ImageContainerMedium></ImageContainerMedium>
      </Grid>
      <Line>
        <YearText>2023</YearText>
      </Line>
      <Grid>
        <ImageContainerLarge></ImageContainerLarge>
        <ImageContainerSmallTop></ImageContainerSmallTop>
        <ImageContainerSmallBottom></ImageContainerSmallBottom>
        <ImageContainerMedium></ImageContainerMedium>
      </Grid>
      <Divider />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-top: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 0 20px;
`;

const Subtitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const Line = styled.div`
  position: relative;
  width: 100vw;
  height: 1px;
  margin: 15px 0 5px 0;
  background: repeating-linear-gradient(
    to right,
    black 0,
    black 2px,
    transparent 2px,
    transparent 6px,
    black 6px,
    black 8px,
    transparent 8px,
    transparent 12px,
    black 12px,
    black 20px,
    transparent 20px,
    transparent 24px
  );
`;

const YearText = styled.span`
  position: absolute;
  right: 0;
  top: -15px;
  background-color: white;
  padding-left: 25px;
  font-size: 20px;
  color: #0f0f70;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  width: 95vw;
  height: 15vh;
  grid-template-columns: 4fr 3fr 3fr;
  grid-column-rows: 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;
  margin: 15px 0;
  padding: 0 20px;
`;

const ImageContainerLarge = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  background-color: #f0f0f0;
`;

const ImageContainerSmallTop = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background-color: red;
`;

const ImageContainerSmallBottom = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: green;
`;

const ImageContainerMedium = styled.div`
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  background-color: blue;
`;
