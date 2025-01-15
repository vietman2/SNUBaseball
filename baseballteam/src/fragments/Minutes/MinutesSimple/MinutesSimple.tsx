import styled from "styled-components";

import { MinutesType } from "@models/team";

interface Props {
  minutes: MinutesType;
}

export function MinutesSimple({ minutes }: Readonly<Props>) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  return (
    <Container>
      <div>{minutes.title}</div>
      <div>
        <span>{minutes.author.name}</span>
        <span>{formatDate(minutes.created_at)}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 100px;
  padding: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};

  > div:first-child {
    display: flex;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.foreground700};
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.foreground500};
  }
`;
