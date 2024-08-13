import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { getImages } from "services/archive/images";
import { Interview, Memories } from "fragments/Archive";

type ImageType = {
  id: number;
  title: string;
  file: string;
};

export default function Archive() {
  const [images, setImages] = useState<ImageType[]>([]);

  const fetchImages = async () => {
    try {
      const response = await getImages();

      if (response.status === 200) {
        setImages(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigateMore = () => {};

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Container>
      <Title>
        MEMORIES <Subtitle>_ 순간의 기록</Subtitle>
      </Title>
      <Line>
        <YearText>2024</YearText>
      </Line>
      <ImageContainer>{images ? <Memories /> : null}</ImageContainer>
      <Line>
        <YearText>2023</YearText>
      </Line>
      <ImageContainer>{images ? <Memories /> : null}</ImageContainer>
      <Divider />
      <Button onClick={navigateMore}>{"MORE >>"}</Button>
      <Title>
        INTERVIEW <Subtitle>_ 우리들의 이야기</Subtitle>
      </Title>
      <Line />
      <Interview />
      <Divider />
      <Button onClick={navigateMore}>{"MORE >>"}</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
  padding: 5px 20px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: black;
`;

const Line = styled.div`
  position: relative;
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
  padding-left: 15px;
  padding-right: 20px;
  font-size: 20px;
  color: #0f0f70;
  z-index: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 280px;
  margin: 20px 0;
  padding: 0 0px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  color: #0f0f70;
  font-size: 16px;
  margin: 10px 20px;
  cursor: pointer;
`;
