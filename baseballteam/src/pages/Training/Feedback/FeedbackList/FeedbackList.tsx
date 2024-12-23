import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ViewButtons } from "@components/Buttons";
import { Chip } from "@components/Chips";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Searchbar } from "@components/Searchbar";
import { useTheme } from "@contexts/theme";
import {
  FeedbackCard,
  FeedbackTableHeader,
  FeedbackTableRow,
} from "@fragments/Feedback";
import { ClassificationType, FeedbackSimpleType } from "@models/training";
import { MemberType } from "@models/user";
import { getMembers } from "@services/person";
import { getFeedbacks, getCategoryOptions } from "@services/training";

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
  const [selectedStatus, setSelectedStatus] = useState<string>("");
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
        selectedMember,
        selectedStatus
      );
      const response2 = await getMembers("ybs");
      const response3 = await getCategoryOptions();

      if (response1 && response2 && response3) {
        setFeedbacks(response1);
        setMembers(response2);
        setClassifications(response3);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [
    refreshCount,
    location,
    query,
    selectedCategory,
    selectedMember,
    selectedStatus,
  ]);

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
        <div>
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
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            data-testid="status-select"
          >
            <option value="">상태</option>
            <option value="신규">신규</option>
            <option value="진행중">진행중</option>
            <option value="검토중">검토중</option>
            <option value="완료">완료</option>
          </select>
        </div>
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
                <button
                  key={feedback.id}
                  onClick={() => handleFeedbackClick(feedback.id)}
                  data-testid={`feedback-${feedback.id}`}
                >
                  <FeedbackCard feedback={feedback} />
                </button>
              ))}
            </BoardView>
          ) : (
            <DesktopView>
              <FeedbackTableHeader />
              {feedbacks.map((feedback) => (
                <button
                  key={feedback.id}
                  onClick={() => handleFeedbackClick(feedback.id)}
                  data-testid={`feedback-${feedback.id}`}
                >
                  <FeedbackTableRow feedback={feedback} />
                </button>
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
  const { colors } = useTheme();

  return (
    <Queries>
      <button onClick={() => handleCategoryClick(null)} data-testid="all">
        <Chip
          label="전체"
          color={selectedCategory ? colors.borderDark : "#FFFFFF"}
          bgColor={selectedCategory ? colors.background300 : "#424242"}
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
                : colors.borderDark
            }
            bgColor={
              selectedCategory === classification.label
                ? classification.background_color
                : colors.background300
            }
          />
        </button>
      ))}
    </Queries>
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
      <option value={0}>선수</option>
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
  flex-direction: column;
  align-items: flex-start;

  select {
    align-items: center;
    width: 60px;
    height: 26px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background700};
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

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
  padding: 8px 16px;
  gap: 16px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Queries = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin: 8px 0;
  gap: 8px;
`;
