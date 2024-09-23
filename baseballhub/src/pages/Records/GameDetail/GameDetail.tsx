import { useEffect, useState } from "react";
import styled from "styled-components";

import { IFrame } from "@components/Frames";
import { AppIcon } from "@components/Icons";
import { ExpandableTab, Tabs } from "@components/Tabs";
import { sampleGameResult } from "@data/records/games";
import {
  GameRecords,
  GameEntry,
  GameFeedback,
  Scoreboard,
} from "@fragments/Game";
import { useWindowSize } from "@hooks/useWindowSize";

interface Props {
  selectedGame: number;
  goBack: () => void;
}

const tabs = ["엔트리", "피드백", "상세기록"];

export function GameDetail({ selectedGame, goBack }: Readonly<Props>) {
  const [selectedTab, setSelectedTab] = useState<string>("엔트리");

  const { width } = useWindowSize();

  const getVideoWidth = () => {
    return ((width - 240) * 0.75).toString();
  };

  const getVideoHeight = () => {
    return ((width - 240) * 0.75 * 0.5).toString();
  };

  useEffect(() => {
    // fetch game detail from server
    console.log(selectedGame);
  }, []);

  return (
    <Container>
      <Header onClick={goBack}>
        <div>
          <AppIcon icon="chevron-left" size={24} color="#0B1623" />
          목록
          {width}
        </div>
      </Header>
      {width >= 1920 ? (
        <>
          <WideBoard>
            <Scoreboard game={sampleGameResult} />
          </WideBoard>
          <WideContents>
            <Half>
              <ExpandableTab title="엔트리" height="1000px">
                <GameEntry game={sampleGameResult} />
              </ExpandableTab>
              <ExpandableTab title="상세기록" height="1000px">
                <GameRecords
                  lineup={sampleGameResult.lineup}
                  pitchers={sampleGameResult.pitchers}
                />
              </ExpandableTab>
            </Half>
            <Half>
              <ExpandableTab title="풀영상" height="500px">
                <Video>
                  <IFrame videoId="U28Gz6Dev0w" width="720" height="360" />
                </Video>
              </ExpandableTab>
            </Half>
          </WideContents>
        </>
      ) : (
        <NarrowContents>
          <div>
            <Scoreboard game={sampleGameResult} />
          </div>
          <ExpandableTab title="풀영상" height="500px">
            <Video>
              <IFrame
                videoId="U28Gz6Dev0w"
                width={getVideoWidth()}
                height={getVideoHeight()}
              />
            </Video>
          </ExpandableTab>
          <Tabs
            type={2}
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setSelectedTab}
          />
          <NarrowTabPage>
            {selectedTab === "엔트리" ? (
              <GameEntry game={sampleGameResult} />
            ) : selectedTab === "피드백" ? (
              <GameFeedback game={sampleGameResult} />
            ) : selectedTab === "상세기록" ? (
              <GameRecords
                lineup={sampleGameResult.lineup}
                pitchers={sampleGameResult.pitchers}
              />
            ) : null}
          </NarrowTabPage>
        </NarrowContents>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Half = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - 480px);
  padding: 0 8px 0 0;
  gap: 16px;

  overflow-y: auto;
`;

const Video = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const WideBoard = styled.div`
  display: flex;
  width: 100%;
  padding: 0 360px;
  margin: 16px 0;
  justify-content: center;
  align-items: center;
`;

const WideContents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 8px 16px;
  gap: 16px;
`;

const NarrowContents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - 200px);
  padding: 8px 16px;
  gap: 16px;

  overflow-y: auto;
`;

const NarrowTabPage = styled.div`
  display: flex;
  flex: 1;
  margin-top: -16px;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.colors.offWhite};
`;
