import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainImage1 from "@assets/images/main1.jpg";
import MainImage2 from "@assets/images/main2.jpg";
import MainImage3 from "@assets/images/main3.jpg";
import { Divider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
//import { Interview } from "@fragments/Interviews";
import { Memories } from "@fragments/Memories";
import { MemoriesType } from "@models/archive";
import { getMemories } from "@services/archive";

const images = [MainImage1, MainImage2, MainImage3];

export function Home() {
  const [memories, setMemories] = useState<MemoriesType[]>([]);
  //const [interviews, setInterviews] = useState<InterviewType[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const navigateToGallery = () => {
    navigate("/gallery");
  };

  /*const navigateToInterviews = () => {
    navigate("/interviews");
  };*/

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
    const fetchData = async () => {
      const memories = await getMemories();

      if (memories) {
        setMemories(memories);
      }
    };

    fetchData();
    startSlider();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <ImageContainer>
        <ImageInnerContainer
          style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
        >
          {images.map((image) => (
            <Image key={image} style={{ backgroundImage: `url(${image})` }} />
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
          <span>SEOUL NAT'L UNIV. BASEBALL TEAM</span>
          <span>서울대학교 야구부에 오신 것을 환영합니다</span>
        </Texts>
      </ImageContainer>
      <Wrapper>
        <Subtitle>
          MEMORIES
          <span>_순간의 기록</span>
        </Subtitle>
        {memories.map((memory) => (
          <Memories key={memory.year} memories={memory} />
        ))}
        <Divider />
        <MoreButton onClick={navigateToGallery} data-testid="more-memories">
          {"MORE >>"}
        </MoreButton>
      </Wrapper>
      {/*<Wrapper>
        <Subtitle>
          INTERVIEW
          <span>_우리들의 이야기</span>
        </Subtitle>
        {interviews.map((interview) => (
          <Interview key={interview.id} interview={interview} />
        ))}
        <Divider />
        <MoreButton
          onClick={navigateToInterviews}
          data-testid="more-interviews"
        >
          {"MORE >>"}
        </MoreButton>
      </Wrapper>*/}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: 64px;

  overflow-x: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: 8px;
  }
`;

const ImageInnerContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 300vw;
`;

const Image = styled.div`
  width: 100vw;
  height: 50vh;
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
  padding: 8px 2px;
  cursor: pointer;
  z-index: 999;

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  gap: 16px;
`;

const Subtitle = styled.span`
  padding: 0 16px;
  font-size: 1.5rem;
  font-weight: 700;

  > span {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const MoreButton = styled.button`
  display: flex;
  justify-content: flex-start;
  padding: 0 24px;

  color: ${({ theme }) => theme.colors.primary};
`;
