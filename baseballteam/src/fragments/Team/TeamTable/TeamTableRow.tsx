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
      <div>승</div>
      <div>무</div>
      <div>패</div>
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
      <div>{team.wins}</div>
      <div>{team.ties}</div>
      <div>{team.losses}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
  }
`;

const Header = styled(Container)``;
