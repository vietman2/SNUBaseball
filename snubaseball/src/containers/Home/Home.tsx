import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const images = [
  "https://via.placeholder.com/1920x1080",
  "https://via.placeholder.com/1920x1080",
  "https://via.placeholder.com/1920x1080",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  useEffect(() => {
    startSlider();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
        <LeftButton onClick={goToPrevious}>❮</LeftButton>
        <RightButton onClick={goToNext}>❯</RightButton>
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  flex: 0 0 100vw;
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
