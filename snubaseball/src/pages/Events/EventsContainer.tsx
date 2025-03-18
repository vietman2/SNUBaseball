import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";

import { ClosingCeremony } from "./ClosingCeremony/ClosingCeremony";
import { Graduation } from "./Graduation/Graduation";
import { Homecoming } from "./Homecoming/Homecoming";
import { AppIcon } from "@components/Icons";

export function EventsContainer() {
  return (
    <Routes>
      <Route path="/" element={<EventsLayout />}>
        <Route index element={<Navigate to="homecoming" />} />
        <Route path="homecoming" element={<Homecoming />} />
        <Route path="graduation" element={<Graduation />} />
        <Route path="closing-ceremony" element={<ClosingCeremony />} />
      </Route>
    </Routes>
  );
}

function EventsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHomecoming = () => {
    navigate("/events/homecoming");
  };

  const goToGraduation = () => {
    navigate("/events/graduation");
  };

  const goToClosingCeremony = () => {
    navigate("/events/closing-ceremony");
  };

  return (
    <Container>
      <Tabs>
        <Tab
          onClick={goToHomecoming}
          $isActive={location.pathname.includes("homecoming")}
        >
          <AppIcon icon="baseball" size={24} />
          OB전
        </Tab>
        <Tab
          onClick={goToClosingCeremony}
          $isActive={location.pathname.includes("closing-ceremony")}
        >
          <AppIcon icon="event" size={24} color="blue" />
          종무식
        </Tab>
        <Tab
          onClick={goToGraduation}
          $isActive={location.pathname.includes("graduation")}
        >
          <AppIcon icon="graduation" size={24} />
          졸업식
        </Tab>
      </Tabs>
      <Contents>
        <Outlet />
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lowEmphasis};

  @media (min-width: 768px) {
    margin: -8px 0;
  }
`;

const Tab = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 4px;

  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.highEmphasis};

  border-bottom: 2px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : "transparent"};
  transition: border-bottom 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 0.925rem;
  }
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 16px;
`;
