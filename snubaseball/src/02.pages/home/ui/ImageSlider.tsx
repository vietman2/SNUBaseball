"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  images: string[];
}

export function ImageSlider({ images }: Readonly<Props>) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSlider = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  }, [images.length]);

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
  }, [startSlider]);

  return (
    <ImageContainer>
      <ImageInnerContainer
        style={{
          width: `${images.length * 100}vw`,
          transform: `translate3d(-${currentIndex * 100}vw, 0, 0)`,
        }}
      >
        {images.map((url, index) => (
          <Slide key={url}>
            <SlideImage src={url} alt={`slide-${index}`} fill />
          </Slide>
        ))}
      </ImageInnerContainer>
      <LeftButton onClick={goToPrevious} data-testid="left">
        <AppIcon icon="chevron-left" color="white" />
      </LeftButton>
      <RightButton onClick={goToNext} data-testid="right">
        <AppIcon icon="chevron-right" color="white" />
      </RightButton>
      <Texts>
        <span>WELCOME TO</span>
        <span>{"SEOUL NAT'L UNIV. BASEBALL TEAM"}</span>
        <span>서울대학교 야구부에 오신 것을 환영합니다</span>
      </Texts>
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ImageInnerContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
  contain: paint;
`;

const Slide = styled.div`
  position: relative;
  width: 100vw;
  height: 50vh;
  flex: 0 0 100vw; // 각 슬라이드가 컨테이너의 100% 너비를 차지하도록 설정
`;

const SlideImage = styled(Image)`
  object-fit: cover;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;

  color: ${({ theme }) => theme.colors.background};
  border: none;
  cursor: pointer;
  z-index: 1;
`;

const LeftButton = styled(Button)`
  left: 12px;
`;

const RightButton = styled(Button)`
  right: 12px;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  position: absolute;
  top: 35%;
  left: 10%;
  color: white;

  > span:first-child {
    font-size: 1.75rem;
    font-weight: 400;
  }

  > span:nth-child(2) {
    font-size: 2rem;
    font-weight: 700;
  }

  > span:last-child {
    font-size: 1rem;
    font-weight: 500;
  }
`;
