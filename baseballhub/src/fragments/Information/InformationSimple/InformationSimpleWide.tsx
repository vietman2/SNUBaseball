import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { InformationSimpleType } from "@models/forum";

export function InformationSimpleWideHeader() {
  return (
    <Header>
      <div>No</div>
      <div>제목</div>
      <div>작성자</div>
      <div>날짜</div>
      <div>조회수</div>
    </Header>
  );
}

interface Props {
  information: InformationSimpleType;
}

export function InformationSimpleWide({ information }: Readonly<Props>) {
  return (
    <Container>
      <div>{information.id}</div>
      <div>
        {information.pin && <AppIcon icon="pin" size={16} color="white" />}
        {information.title}
      </div>
      <div>{information.author}</div>
      <div>{information.created_at}</div>
      <div>{information.num_views}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;

  color: ${({ theme }) => theme.colors.foreground500};

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  > div:nth-child(2) {
    display: flex;
    flex: 3;
    justify-content: flex-start;
    gap: 8px;

    font-weight: 700;
  }
`;

const Header = styled(Container)`
  color: ${({ theme }) => theme.colors.foreground900};
  font-weight: 700;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background500};

  > div:nth-child(2) {
    justify-content: center;
  }
`;
