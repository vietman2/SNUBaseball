import styled from "styled-components";

import { TeamInfoType } from "@models/team";

export function TeamTableHeader() {
  return (
    <Header>
      <div>연도</div>
      <div>지도교수</div>
      <div>감독</div>
      <div>수석매니저</div>
      <div>주장</div>
      <div>부주장</div>
      <div>매니저</div>
      <div>선수</div>
      <div>경기수</div>
    </Header>
  );
}

interface Props {
  team: TeamInfoType;
}

export function TeamTableRow({ team }: Readonly<Props>) {
  return (
    <Container>
      <div>{team.year}</div>
      <div>{team.professor}</div>
      <div>{team.head_coach}</div>
      <div>{team.head_manager}</div>
      <div>{team.captain}</div>
      <div>{team.vice_captain}</div>
      <div>{team.num_managers}</div>
      <div>{team.num_players}</div>
      <div>{team.games}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  border-top: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 32px;

    border-right: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
  }

  > div:nth-child(2) {
    width: 100px;
  }

  > div:nth-child(3) {
    width: 100px;
  }

  @media (max-width: 768px) {
    > div {
      width: 80px;
    }

    > div:nth-child(7) {
      display: none;
    }

    > div:nth-child(8) {
      display: none;
    }

    > div:nth-child(9) {
      display: none;
    }
  }
`;

const Header = styled(Container)`
  border-top: none;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
`;
