import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { InterviewType } from "@models/archive";

interface Props {
  interview: InterviewType;
}

export function Interview({ interview }: Readonly<Props>) {
  return (
    <Container>
      <Divider type="dashed" width="90%" />
      <Wrapper>
        <ImagesContainer>
          {interview.images.map((image) => (
            <div key={image.id}>
              <img src={image.uri} alt={image.uri} />
            </div>
          ))}
        </ImagesContainer>
        <Title>{interview.title}</Title>
        <Subtitle>{interview.member}</Subtitle>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 70vw;
  gap: 12px;

  @media (max-width: 768px) {
    max-width: 100vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  gap: 12px;
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 8px;

  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    display: block;
    width: 25vw;
    height: 25vw;
    object-fit: fill;

    @media (max-width: 768px) {
      width: 50vw;
      height: 50vw;
    }
  }
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
`;

const Subtitle = styled.span`
  font-size: 1rem;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.primary};
`;
