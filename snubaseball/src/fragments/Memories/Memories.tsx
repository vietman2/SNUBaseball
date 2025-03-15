import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { MemoriesType } from "@models/archive";

interface Props {
  memories: MemoriesType;
}

export function Memories({ memories }: Readonly<Props>) {
  return (
    <Container>
      <Divider text={memories.year} type="dashed" />
      <ImagesContainer>
        {memories.images.map((image) => (
          <div key={image.id}>
            <img src={image.url} alt={image.url} />
          </div>
        ))}
      </ImagesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1.75fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  max-height: 360px;
  padding: 0 24px;
  gap: 8px;

  img {
    display: block;
    flex: 1;
    width: 100%;
    max-height: 360px;
    object-fit: cover;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  > div:first-child {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  > div:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    img {
      max-height: 176px;
    }
  }

  > div:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    img {
      max-height: 176px;
    }
  }

  > div:last-child {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }
`;
