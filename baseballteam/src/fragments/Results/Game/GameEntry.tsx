import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { Ballpark } from "@components/Icons";
import { LineupType } from "@models/records";

interface Props {
  lineup: LineupType | undefined;
}

export function GameEntry({ lineup }: Readonly<Props>) {
  if (!lineup) return <Container>데이터가 없습니다.</Container>;

  return (
    <Container>
      <Half>
        <Wrapper>
          <Subtitle>선발라인업</Subtitle>
          <Starting>
            <thead>
              <tr>
                <th>타순</th>
                <th>선수</th>
              </tr>
            </thead>
            <tbody>
              {lineup.order.map((player, index) => (
                <tr key={player.back_number}>
                  <td>{index + 1}</td>
                  <td>
                    <span>{player.back_number}</span>
                    <span>{player.name}</span>
                  </td>
                </tr>
              ))}
              <tr>
                <td>선발</td>
                <td>
                  <span>{lineup.starting_pitcher.back_number}</span>
                  <span>{lineup.starting_pitcher.name}</span>
                </td>
              </tr>
            </tbody>
          </Starting>
        </Wrapper>
        <Wrapper>
          <Subtitle>대기선수</Subtitle>
          <Bench>
            {lineup.bench.map((player) => (
              <Chip key={player.back_number}>
                <span>
                  <span>{player.back_number}</span>
                  <span>{player.name}</span>
                </span>
                <span>{player.profile_position}</span>
              </Chip>
            ))}
          </Bench>
        </Wrapper>
      </Half>
      <span>
        <VerticalDivider />
      </span>
      <Half>
        <Wrapper>
          <Subtitle>수비포지션</Subtitle>
          <DiagramWrapper>
            <Ballpark
              size={280}
              pitcher={lineup.starting_pitcher.name}
              catcher={
                lineup.order.filter((player) => player.position === "C")[0].name
              }
              first={
                lineup.order.filter((player) => player.position === "1B")[0]
                  .name
              }
              second={
                lineup.order.filter((player) => player.position === "2B")[0]
                  .name
              }
              third={
                lineup.order.filter((player) => player.position === "3B")[0]
                  .name
              }
              short={
                lineup.order.filter((player) => player.position === "SS")[0]
                  .name
              }
              left={
                lineup.order.filter((player) => player.position === "LF")[0]
                  .name
              }
              center={
                lineup.order.filter((player) => player.position === "CF")[0]
                  .name
              }
              right={
                lineup.order.filter((player) => player.position === "RF")[0]
                  .name
              }
              dh={
                lineup.order.filter((player) => player.position === "DH")[0]
                  ?.name ?? ""
              }
            />
          </DiagramWrapper>
        </Wrapper>
        <Wrapper>
          <Subtitle>참가 매니저</Subtitle>
          <Bench>
            {lineup.managers.map((manager) => (
              <Chip key={manager.back_number}>
                <span>
                  <span>{manager.back_number}</span>
                  <span>{manager.name}</span>
                </span>
                <span>{manager.profile_position}</span>
              </Chip>
            ))}
          </Bench>
        </Wrapper>
      </Half>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;

    > span {
      display: none;
    }
  }
`;

const Half = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 4px 8px;
  gap: 16px;

  > div {
    flex: 1;
    flex-direction: column;
  }
`;

const Subtitle = styled.div`
  align-self: center;
  font-size: 1.125rem;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Starting = styled.table`
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;

  th {
    padding: 4px;
    border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
  }

  td {
    padding: 4px 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;

    border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};

    > span:first-child {
      display: inline-block;
      width: 24px;
      margin-right: 8px;
      text-align: right;
      font-weight: 600;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 1480px) {
    width: 100%;
  }
`;

const Bench = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const DiagramWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Chip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 72px;
  max-width: 72px;
  padding: 4px 0;
  gap: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  > span:first-child {
    display: flex;
    align-items: center;
    gap: 4px;

    > span:first-child {
      font-size: 0.875rem;
      font-weight: 600;
    }
    > span:last-child {
      font-size: 0.95rem;
      font-weight: 600;
    }
  }

  > span:last-child {
    font-size: 0.85rem;
    font-weight: 400;
  }
`;
