import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { CategoryTabs } from "@components/Tabs";
import { useTheme } from "@contexts/theme";
import { GuidelineSimple } from "@fragments/Guideline";
import { GuidelineSimpleType } from "@models/training";
import { getGuidelines } from "@services/training";

const tabs = ["내야", "외야", "포수", "투수", "타격", "주루", "기타"];

export function GuidelineList() {
  const [selectedCategory, setSelectedCategory] = useState<string>(tabs[0]);
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [guidelines, setGuidelines] = useState<GuidelineSimpleType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleGuideLineClick = (guideline: GuidelineSimpleType) => {
    navigate(`/training/guidelines/${guideline.id}`);
  };

  const handleGuidelineCreate = () => {
    navigate("/training/guidelines/new");
  };

  useEffect(() => {
    const fetchGuidelines = async () => {
      const response = await getGuidelines(selectedCategory, selectedFilter);

      if (response) {
        setGuidelines(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchGuidelines();
  }, [refreshCount, selectedFilter, selectedCategory, location.pathname]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      </Container>
    );
  }

  return (
    <Container>
      <Subtitle>훈련 가이드라인</Subtitle>
      <Categories>
        <CategoryTabs
          tabs={tabs}
          activeTab={selectedCategory}
          setActiveTab={setSelectedCategory}
        />
      </Categories>
      <Header>
        <FilterButtons>
          <button onClick={() => setSelectedFilter("전체")} data-testid="all">
            <Chip
              label="전체"
              color={selectedFilter === "전체" ? "#FFFFFF" : colors.borderDark}
              bgColor={
                selectedFilter === "전체" ? "#424242" : colors.background500
              }
            />
          </button>
          <button onClick={() => setSelectedFilter("드릴")} data-testid="drill">
            <Chip
              label="드릴"
              color={selectedFilter === "드릴" ? "#455A64" : colors.borderDark}
              bgColor={
                selectedFilter === "드릴" ? "#ECEFF1" : colors.background500
              }
            />
          </button>
          <button onClick={() => setSelectedFilter("예시")} data-testid="example">
            <Chip
              label="예시"
              color={selectedFilter === "예시" ? "#6A1B9A" : colors.borderDark}
              bgColor={
                selectedFilter === "예시" ? "#F3E5F5" : colors.background500
              }
            />
          </button>
        </FilterButtons>
        <Button onClick={handleGuidelineCreate} data-testid="create-button">
          가이드라인 추가
        </Button>
      </Header>
      <Board>
        {guidelines.map((guideline) => (
          <button
            key={guideline.id}
            onClick={() => handleGuideLineClick(guideline)}
            data-testid={`guideline-${guideline.id}`}
          >
            <GuidelineSimple guideline={guideline} />
          </button>
        ))}
      </Board>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 16px;

  > div:first-child {
    display: flex;
    flex-direction: row;
    padding: 8px 16px;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 16px;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Board = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 16px;
  gap: 16px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 24px;
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

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.background100};
  font-weight: 500;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};

  cursor: pointer;
  transition: background-color 0.2s;
`;
