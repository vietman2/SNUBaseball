import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "@assets/images/logo.png";
import MainImage1 from "@assets/images/main1.jpg";
import MainImage2 from "@assets/images/main2.jpg";
import MainImage3 from "@assets/images/main3.jpg";
import { AppIcon } from "@components/Icons";
import { Sidebar } from "@components/Sidebar";

const images = [MainImage1, MainImage2, MainImage3];

interface Props {
  isPortrait: boolean;
}

export function Header({ isPortrait }: Readonly<Props>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleNavigate = (path: string) => {
    navigate(path);

    if (isPortrait) {
      setIsSidebarOpen(false);
    }
  };

  const routeNameMap: { [key: string]: string } = {
    "": "서울대학교 야구부",
    about: "소개",
    schedule: "일정",
    archive: "아카이브",
    sitemap: "사이트맵",
    ask: "문의",
  };

  const pageName =
    routeNameMap[location.pathname.split("/")[1]] || "서울대 야구부";

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Container $isMain={location.pathname === "/"}>
        {isPortrait ? (
          <MobileBar>
            <LogoContainer
              onClick={() => handleNavigate("/")}
              data-testid="logo"
            >
              <img src={Logo} alt="logo" />
            </LogoContainer>
            <Title>{pageName}</Title>
            <Icon onClick={openSidebar} data-testid="open">
              <AppIcon icon="menu" size={32} color="black" />
            </Icon>
          </MobileBar>
        ) : (
          <Bar>
            <LogoContainer onClick={() => handleNavigate("/")} data-testid="logo">
              <img src={Logo} alt="logo" />
              서울대학교 야구부
            </LogoContainer>
          </Bar>
        )}
        {location.pathname === "/" ? (
          <ImageContainer>
            <ImageInnerContainer
              style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
            >
              {images.map((image, index) => (
                <Image
                  key={index}
                  style={{ backgroundImage: `url(${image})` }}
                />
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
        ) : null}
      </Container>
      <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

const Container = styled.div<{ $isMain: boolean }>`
  width: 100vw;
  background-color: #f0f0f0;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 400px;
  color: #000;
`;

const MobileBar = styled.div`
  display: flex;
  flex: 1,
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  color: #fff;

  padding: 20px 15px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: black;

  &:hover {
    cursor: default;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #0f0f70;
  font-size: 24px;
  font-weight: 700;

  img {
    width: 50px;
    height: 50px;
  }

  &:hover {
    cursor: pointer;
  }
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
