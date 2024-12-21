import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ViewButtons } from "@components/Buttons";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Searchbar } from "@components/Searchbar";
import {
  DiscussionCard,
  DiscussionsTableHeader,
  DiscussionsTableRow,
} from "@fragments/Discussions";
import { DiscussionSimpleType } from "@models/forum";
import { getDiscussions } from "@services/board";

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

export function DiscussionList() {
  const [discussions, setDiscussions] = useState<DiscussionSimpleType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [view, setView] = useState<string>("보드");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleDiscussionClick = (discussion: DiscussionSimpleType) => {
    navigate(`/forum/discussions/${discussion.id}`);
  };

  const handleWriteClick = () => {
    navigate("/forum/discussions/new");
  };

  const handleViewChange = (view: string) => {
    setView(view);
    localStorage.setItem("discussion_view", view);
  };

  useEffect(() => {
    const fetchDiscussions = async () => {
      const response = await getDiscussions(query);

      if (response) {
        setDiscussions(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    if (location.pathname === "/forum/discussions") {
      fetchDiscussions();
    }
  }, [location, query, refreshCount]);

  useEffect(() => {
    const view = localStorage.getItem("discussion_view");

    if (view) {
      setView(view);
    }
  }, []);

  return (
    <Container>
      <Subtitle>자유게시판</Subtitle>
      <Views>
        <ViewButtons
          buttons={views}
          selected={view}
          onClick={handleViewChange}
        />
        <Button onClick={handleWriteClick}>새 글</Button>
      </Views>
      <SearchbarWrapper>
        <Searchbar query={query} setQuery={setQuery} />
      </SearchbarWrapper>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      ) : (
        <>
          {view === "보드" ? (
            <Board>
              {discussions.map((discussion) => (
                <button
                  key={discussion.id}
                  onClick={() => handleDiscussionClick(discussion)}
                  data-testid={`discussion-${discussion.id}`}
                >
                  <DiscussionCard discussion={discussion} />
                </button>
              ))}
            </Board>
          ) : (
            <Table>
              <DiscussionsTableHeader />
              {discussions.map((discussion) => (
                <button
                  key={discussion.id}
                  onClick={() => handleDiscussionClick(discussion)}
                  data-testid={`discussion-${discussion.id}`}
                >
                  <DiscussionsTableRow discussion={discussion} />
                </button>
              ))}
            </Table>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
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

const Views = styled(Horizontal)`
  justify-content: space-between;
`;

const SearchbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;

  @media (max-width: 768px) {
    align-items: center;
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
`;

const Board = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: center;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;
