import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import MainImage1 from "@assets/images/main1.jpg";
import MainImage2 from "@assets/images/main2.jpg";
import MainImage3 from "@assets/images/main3.jpg";
import { useWindowSize } from "@hooks/useWindowSize";

const images = [MainImage1, MainImage2, MainImage3];

export default function Home() {
  const [isWide, setIsWide] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { width } = useWindowSize();

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startSlider();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    resetInterval();
  };

  useEffect(() => {
    startSlider();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsWide(width > 1024);
  }, [width]);

  return (
    <Container>
      <ImageContainer>
        <ImageInnerContainer
          style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
        >
          {images.map((image, index) => (
            <Image key={index} style={{ backgroundImage: `url(${image})` }} />
          ))}
        </ImageInnerContainer>
        <LeftButton onClick={goToPrevious} data-testid="left">
          ❮
        </LeftButton>
        <RightButton onClick={goToNext} data-testid="right">
          ❯
        </RightButton>
        <Line1>WELCOME TO</Line1>
        <Line2>SEOUL NAT'L UNIV. BASEBALL TEAM</Line2>
        <Line3>서울대학교 야구부에 오신 것을 환영합니다</Line3>
      </ImageContainer>
      <SubContainer $isWide={isWide}>
        <Title>UPCOMING</Title>
        <Title>PHOTO</Title>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div<{ $isWide?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: ${({ $isWide }) => ($isWide ? "0 20%" : "0 24px")};
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 40vh;
  overflow: hidden;
`;

const ImageInnerContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 300vw;
`;

const Image = styled.div`
  width: 100vw;
  height: 40vh;
  background-size: cover;
  background-position: center;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border: none;
  border-radius: 25%;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const LeftButton = styled(Button)`
  left: 10px;
`;

const RightButton = styled(Button)`
  right: 10px;
`;

const Line1 = styled.span`
  position: absolute;
  top: 35%;
  left: 10%;
  font-size: 1.75rem;
  font-weight: 400;
  color: white;
`;

const Line2 = styled.span`
  position: absolute;
  top: 50%;
  left: 10%;
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

const Line3 = styled.span`
  position: absolute;
  top: 75%;
  left: 10%;
  font-size: 1rem;
  font-weight: 500;
  color: white;
`;
