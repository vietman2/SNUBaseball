import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { GuidelineSimpleType } from "@models/training";

interface Props {
  guideline: GuidelineSimpleType;
}

export function GuidelineSimple({ guideline }: Readonly<Props>) {
  return (
    <Container>
      <Tags>
        <Chip
          label={guideline.type.label}
          bgColor={guideline.type.background_color}
          color={guideline.type.color}
        />
        <Chip
          label={guideline.location.label}
          bgColor={guideline.location.background_color}
          color={guideline.location.color}
        />
        <Chip
          label={guideline.num_people}
          bgColor="#D5D5D5"
          color="#252525"
          icon="people"
        />
      </Tags>
      <img src={guideline.preview_image} alt={guideline.title} />
      <Title>
        <span>
          <AppIcon
            icon={guideline.is_youtube ? "youtube" : "instagram"}
            size={16}
            color="#0F0F70"
          />
          {guideline.title}
        </span>
        <Icons>
          <IconWrapper>
            <AppIcon icon="heart-outline" size={16} color="#0F0F70" />
            {guideline.num_likes}
          </IconWrapper>
          <IconWrapper>
            <AppIcon icon="chat" size={16} color="#0F0F70" />
            {guideline.num_comments}
          </IconWrapper>
        </Icons>
      </Title>
      <div>
        <span>{guideline.author}</span>
        <span>{guideline.created_at}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 24px;
  gap: 8px;
  width: 348px;

  color: ${({ theme }) => theme.colors.foreground700};
  background-color: ${({ theme }) => theme.colors.background100};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};

  img {
    width: 300px;
    height: 180px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background500};

    object-fit: contain;
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 0.9rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 600;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  font-size: 0.9rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
