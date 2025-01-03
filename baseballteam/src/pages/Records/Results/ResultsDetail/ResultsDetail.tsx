import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
import { IFrame } from "@components/Frames";
import { AppIcon } from "@components/Icons";
import { ExpandableTab, Tabs } from "@components/Tabs";
import { useTheme } from "@contexts/theme";
import { GameEntry } from "@fragments/Results";
import { GameDetailsType } from "@models/records";
import { getResultsDetail } from "@services/records";

const tabs = ["엔트리", "피드백", "중계", "상세기록"];

export function ResultsDetail() {
  const [game, setGame] = useState<GameDetailsType>();
  const [selectedTab, setSelectedTab] = useState<string>("엔트리");

  const { gameId } = useParams();
  const navigation = useNavigate();
  const { colors } = useTheme();

  const goBack = () => {
    navigation(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getResultsDetail(gameId);

      if (response) {
        setGame(response);
      }
    };

    fetchData();
  }, [gameId]);

  return (
    <Container>
      <BackButton onClick={goBack}>
        <AppIcon icon="chevron-left" size={24} color={colors.foreground900} />
        목록
      </BackButton>
      {game ? (
        <>
          <ExpandableTab title="풀영상" height="500px">
            <Video>
              {game.youtube_videoid ? (
                <IFrame
                  videoId={game.youtube_videoid}
                  width="90%"
                  height="240px"
                />
              ) : (
                <NoVideo>영상이 없습니다.</NoVideo>
              )}
            </Video>
          </ExpandableTab>
          <div>
            <Tabs
              tabs={tabs}
              activeTab={selectedTab}
              setActiveTab={setSelectedTab}
            />
            <Content selectedTab={selectedTab} game={game} />
          </div>
        </>
      ) : (
        <ErrorComponent label="뒤로가기" onRefresh={goBack} />
      )}
    </Container>
  );
}

interface Props {
  selectedTab: string;
  game: GameDetailsType;
}

function Content({ selectedTab, game }: Readonly<Props>) {
  return (
    <ContentWrapper>
      {selectedTab === "엔트리" && <GameEntry lineup={game.lineup} />}
    </ContentWrapper>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Column)`
  flex: 1;
  align-self: center;
  min-width: 768px;
  max-width: 768px;
  padding: 16px 24px;
  gap: 16px;

  @media (max-width: 1480px) {
    min-width: 540px;
    max-width: 768px;
  }

  @media (max-width: 768px) {
    min-width: 360px;
    max-width: 768px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};

  &:hover {
    cursor: pointer;
  }
`;

const Video = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const NoVideo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const ContentWrapper = styled(Column)`
  flex: 1;
  align-self: center;
  padding: 8px 16px;

  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;
