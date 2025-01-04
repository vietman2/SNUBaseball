import { useEffect, useState } from "react";
import styled from "styled-components";

import { PlayerSimple, StaffSimple } from "@fragments/Member";
import { TeamInfoType } from "@models/team";
import { getTeams, getTeamDetail } from "@services/team";

export function MembersList() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [teamInfo, setTeamInfo] = useState<TeamInfoType>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamDetail(selectedYear);

      if (response) {
        setTeamInfo(response);
      }
    };

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    const fetchYears = async () => {
      const response = await getTeams();

      if (response) {
        setYearOptions(response.years);
        setSelectedYear(response.years[0]);
      }
    };

    fetchYears();
  }, []);

  return (
    <Container>
      <Filter>
        <label>연도</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          data-testid="year-select"
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </Filter>
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
  padding: 12px 16px;
  gap: 16px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  select {
    align-items: center;
    width: 60px;
    height: 26px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background700};
  }
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
