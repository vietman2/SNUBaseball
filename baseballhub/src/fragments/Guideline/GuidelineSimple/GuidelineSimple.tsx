import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { GuidelineSimpleType } from "@models/guidelines";

interface Props {
  guideline: GuidelineSimpleType;
}

export function GuidelineSimple({ guideline }: Readonly<Props>) {
  const imageUri = `https://img.youtube.com/vi/${guideline.video_id}/0.jpg`;

  const renderTitle = () => {
    if (guideline.title.length > 18) {
      return `${guideline.title.slice(0, 18)}...`;
    }
    return guideline.title;
  };

  return (
    <Container>
      <Tags>
        {guideline.is_drill ? (
          <Chip label="드릴" bgColor="#E8F2F2" color="#50C878" />
        ) : (
          <Chip label="예시" bgColor="#E8E6F2" color="#0F0F70" />
        )}
        {guideline.is_indoor_possible ? (
          <Chip label="실내 가능" bgColor="#D6E5FF" color="#0000FF" />
        ) : (
          <Chip label="실내 불가" bgColor="#FFD6D6" color="#FF0000" />
        )}
        <Chip
          label={guideline.num_people}
          bgColor="#D5D5D5"
          color="#252525"
          icon="people"
        />
      </Tags>
      <img src={imageUri} alt={guideline.title} />
      <Title>
        <span>{renderTitle()}</span>
        <Icons>
          <IconWrapper>
            <AppIcon icon="heart" size={16} color="#FF0000" />
            {guideline.num_likes}
          </IconWrapper>
          <IconWrapper>
            <AppIcon icon="chat" size={16} color="#0F0F70" />
            {guideline.num_comments}
          </IconWrapper>
        </Icons>
      </Title>
      <div>
        <span>{guideline.shared_by}</span>
        <span>{guideline.shared_at}</span>
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

  color: ${({ theme }) => theme.colors.foreground700};
  background-color: ${({ theme }) => theme.colors.background100};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};

  img {
    width: 300px;
    height: 180px;
    border-radius: 8px;
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 14px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > span {
    font-size: 18px;
    font-weight: 600;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  font-size: 14px;
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
