import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ViewButtons } from "@components/Buttons";
import { Chip } from "@components/Chips";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Searchbar } from "@components/Searchbar";
import {
  FeedbackCard,
  FeedbackTableHeader,
  FeedbackTableRow,
} from "@fragments/Feedback";
import { useWindowSize } from "@hooks/useWindowSize";
import { ClassificationType, FeedbackSimpleType } from "@models/training";
import { MemberType } from "@models/user";
import { getFeedbacks } from "@services/training";
import { getMembers } from "@services/person";

const views = [
  {
    label: "보드",
    icon: "grid",
  },
  {
    label: "표",
    icon: "table",
  },
];

export function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackSimpleType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [classifications, setClassifications] = useState<ClassificationType[]>(
    []
  );
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [query, setQuery] = useState<string>("");
  const [view, setView] = useState<string>("보드");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleFeedbackClick = (id: number) => {
    navigate(`/training/feedback/${id}`);
  };

  const handleViewChange = (view: string) => {
    setView(view);
    localStorage.setItem("feedback_view", view);
  };

  const handleNewClick = () => {
    navigate("/training/feedback/new");
  };

  const handleCategoryClick = (category: string | null) => {
    if (category === null) {
      setSelectedCategory(null);
    } else if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handlePlayerClick = (player: number | null) => {
    setSelectedMember(player);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await getFeedbacks(
        query,
        selectedCategory,
        selectedMember
      );
      const response2 = await getMembers("ybs");

      if (response1 && response2) {
        setFeedbacks(response1.feedbacks);
        setClassifications(response1.classifications);
        setMembers(response2);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [refreshCount, location, query, selectedCategory, selectedMember]);

  useEffect(() => {
    const view = localStorage.getItem("feedback_view");
    if (view) {
      setView(view);
    }
  }, []);

  return (
    <Container>
      <Subtitle>피드백</Subtitle>
      <Menus>
        <ViewButtons
          buttons={views}
          selected={view}
          onClick={handleViewChange}
        />
        <Button onClick={handleNewClick}>새 피드백</Button>
      </Menus>
      <Filters>
        <Searchbar query={query} setQuery={setQuery} />
        <Classifications
          classifications={classifications}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        {members.length > 0 && (
          <PlayerFilter
            members={members}
            selectedPlayer={selectedMember}
            handlePlayerClick={handlePlayerClick}
          />
        )}
      </Filters>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      ) : (
        <>
          {view === "보드" ? (
            <BoardView>
              {feedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </BoardView>
          ) : (
            <DesktopView>
              <FeedbackTableHeader />
              {feedbacks.map((feedback) => (
                <FeedbackTableRow key={feedback.id} feedback={feedback} />
              ))}
            </DesktopView>
          )}
        </>
      )}
    </Container>
  );
}

interface FilterProps {
  classifications: ClassificationType[];
  selectedCategory: string | null;
  handleCategoryClick: (category: string | null) => void;
}

function Classifications({
  classifications,
  selectedCategory,
  handleCategoryClick,
}: Readonly<FilterProps>) {
  const disabledColor = "#BDBDBD";
  const disabledBgColor = "#E0E0E0";

  return (
    <ClassificationContainer>
      <button onClick={() => handleCategoryClick(null)} data-testid="all">
        <Chip
          label="전체"
          color={selectedCategory ? disabledColor : "#FFFFFF"}
          bgColor={selectedCategory ? disabledBgColor : "#424242"}
        />
      </button>
      {classifications.map((classification) => (
        <button
          key={classification.label}
          onClick={() => handleCategoryClick(classification.label)}
          data-testid={`classification-${classification.label}`}
        >
          <Chip
            label={classification.label}
            color={
              selectedCategory === classification.label
                ? classification.color
                : disabledColor
            }
            bgColor={
              selectedCategory === classification.label
                ? classification.background_color
                : disabledBgColor
            }
          />
        </button>
      ))}
    </ClassificationContainer>
  );
}

interface PlayerFilterProps {
  members: MemberType[];
  selectedPlayer: number | null;
  handlePlayerClick: (player: number | null) => void;
}

function PlayerFilter({
  members,
  selectedPlayer,
  handlePlayerClick,
}: Readonly<PlayerFilterProps>) {
  return (
    <select
      value={selectedPlayer ? selectedPlayer : ""}
      onChange={(e) => handlePlayerClick(+e.target.value)}
      data-testid="player-select"
    >
      <option value={0}>전체</option>
      {members.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </select>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 0 16px;

  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 4px 16px;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Menus = styled(Horizontal)`
  justify-content: space-between;
`;

const Filters = styled(Horizontal)`
  display: flex;
  align-items: center;
  margin: 0 16px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Button = styled.button`
  align-items: center;
  padding: 4px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.background100};
  font-weight: 500;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const DesktopView = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoardView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const Queries = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin: 8px 0;
  gap: 8px;

  select {
    margin-left: 4px;
    padding: 4px;
    border-radius: 8px;
    border: none;
    background-color: ${({ theme }) => theme.colors.background100};
  }
`;

const ClassificationContainer = styled(Queries)`
  margin-left: 16px;
`;
