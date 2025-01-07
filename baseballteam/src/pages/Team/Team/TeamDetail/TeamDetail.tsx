import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useTheme } from "@contexts/theme";
import { PlayerSimple, StaffSimple } from "@fragments/Member";
import { TeamMembersType } from "@models/team";
import { getTeamDetail } from "@services/team";

export function TeamDetail() {
  const [teamInfo, setTeamInfo] = useState<TeamMembersType>();

  const navigate = useNavigate();
  const { year } = useParams<{ year: string }>();
  const { colors } = useTheme();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamDetail(year);

      if (response) {
        setTeamInfo(response);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <BackButton onClick={goBack} data-testid="back">
        <AppIcon icon="chevron-left" size={24} color={colors.foreground900} />
        목록
      </BackButton>
      {teamInfo ? (
        <>
          <Wrapper>
            <Subtitle>지도자</Subtitle>
            <Members>
              {teamInfo.staff.map((member) => (
                <StaffSimple key={member.id} staff={member} />
              ))}
            </Members>
          </Wrapper>
          <Wrapper>
            <Subtitle>매니저</Subtitle>
            <Members>
              {teamInfo.managers.map((member) => (
                <StaffSimple key={member.id} staff={member} />
              ))}
            </Members>
          </Wrapper>
          <Wrapper>
            <Subtitle>선수</Subtitle>
            <Members>
              {teamInfo.players.map((member) => (
                <PlayerSimple key={member.id} player={member} />
              ))}
            </Members>
          </Wrapper>
        </>
      ) : (
        <NoData>데이터가 없습니다.</NoData>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: center;
  min-width: 768px;
  max-width: 768px;
  padding: 12px 16px;
  gap: 16px;

  @media (max-width: 1480px) {
    min-width: 540px;
    max-width: 768px;
  }

  @media (max-width: 768px) {
    min-width: 360px;
    max-width: 768px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Subtitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Members = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;
