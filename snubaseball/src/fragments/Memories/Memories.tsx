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
            <img src={image.uri} alt={image.caption} />
            <span>{image.caption}</span>
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
  padding: 0 24px;
  gap: 8px;

  img {
    display: block;
    width: 100%;
    height: 35vh;
    object-fit: fill;

    @media (max-width: 768px) {
      height: 20vh;
    }
  }

  span {
    font-size: 0.85rem;
    text-align: center;
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

    > img {
      height: 15vh;

      @media (max-width: 768px) {
        height: 8vh;
      }
    }
  }

  > div:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    > img {
      height: 15vh;

      @media (max-width: 768px) {
        height: 8vh;
      }
    }
  }

  > div:last-child {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }
`;
