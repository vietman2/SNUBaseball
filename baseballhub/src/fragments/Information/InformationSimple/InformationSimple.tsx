import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { InformationSimpleType } from "@models/forum";

interface Props {
  information: InformationSimpleType;
}

export function InformationSimple({ information }: Readonly<Props>) {
  return (
    <Container>
      <div>
        <div>{information.created_at}</div>
      </div>
      <div>
        {information.pin && <AppIcon icon="pin" size={16} color="white" />}
        {information.title}
        {information.has_attachment && (
          <AppIcon icon="attachment" size={16} color="gray" />
        )}
      </div>
      <div>
        <div>{information.author}</div>
        <div>{information.num_views}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 48px);
  padding: 8px 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground500};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
    gap: 8px;

    font-size: 18px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
