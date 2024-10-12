import { useEffect, useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { IFrame } from "@components/Frames";
import { Subtitle } from "@components/Texts";
import { useTheme } from "@contexts/theme";
import { sampleGuidelineDetail } from "@data/guidelines";
import { useWindowSize } from "@hooks/useWindowSize";
import { GuidelineDetailType } from "@models/guidelines";

interface Props {
  guidelineId: number;
  goBack: () => void;
}

export function GuidelineDetail({ guidelineId, goBack }: Readonly<Props>) {
  const [guideline, setGuideline] = useState<GuidelineDetailType | null>(null);

  const { width } = useWindowSize();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // TODO: fetch guideline by guidelineId
    setGuideline(sampleGuidelineDetail);
  }, [guidelineId]);

  if (!guideline) return null; // TODO: handle loading state

  return (
    <Container>
      <Header onClick={goBack}>
        <div>
          <AppIcon
            icon="chevron-left"
            size={24}
            color={isDarkMode ? "#C5A86F" : "#0B1623"}
          />
          목록
        </div>
      </Header>
      <Contents>
        <Metadata>
          <Subtitle size="large">{guideline.title}</Subtitle>
          <div>
            <span>{guideline.shared_by}</span>
            <span>{guideline.shared_at}</span>
          </div>
        </Metadata>
        <Description>
          <IFrame
            videoId={guideline.video_id}
            width={width > 768 ? "480px" : "320px"}
            height={width > 768 ? "270px" : "180px"}
          />
        </Description>
        <div>
          {guideline.comments.map((comment) => (
            <div key={comment.id}>
              {comment.commented_by}: {comment.comment}
            </div>
          ))}
        </div>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};

    &:hover {
      cursor: pointer;
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground900};
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};

  span {
    margin: 0 16px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;

  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
`;
