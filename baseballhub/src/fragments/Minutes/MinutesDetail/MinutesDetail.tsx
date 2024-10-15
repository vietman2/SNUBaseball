import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleMinutesDetail } from "@data/admin";
import { MinutesDetailType } from "@models/admin";

interface Props {
  minutesId: number | null;
  goBack: () => void;
}

export function MinutesDetail({ minutesId, goBack }: Readonly<Props>) {
  const [minutes, setMinutes] = useState<MinutesDetailType>();

  useEffect(() => {
    setMinutes(sampleMinutesDetail);
  }, []);

  if (minutesId === null || minutes === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{minutes.title}</Subtitle>
        <div>{minutes.date}</div>
        <div>
          참석자:{" "}
          {minutes.attendees.map((attendee, index) => {
            return index === minutes.attendees.length - 1
              ? attendee
              : `${attendee}, `;
          })}
        </div>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <Subtitle>회의 내용</Subtitle>
        <div>{minutes.content}</div>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-size: 16px;

  > div:nth-child(2) {
    display: flex;
    margin: 16px 0 8px 0;
    padding: 0 8px;
  }

  > div:nth-child(3) {
    display: flex;
    padding: 0 8px;
  }
`;

const DividerWrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 0;

  color: ${({ theme }) => theme.colors.foreground500};

  > div {
    padding: 8px 16px;
  }
`;
