import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ViewButtons } from "@components/Buttons";
import { Chip } from "@components/Chips";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Searchbar } from "@components/Searchbar";
import { useAuth } from "@contexts/auth";
import {
  NoticeCard,
  NoticeTableRow,
  NoticeTableHeader,
} from "@fragments/Notices";
import { NoticeCategoryType, NoticeSimpleType } from "@models/forum";
import { getNotices } from "@services/board";

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

export function NoticeList() {
  const [notices, setNotices] = useState<NoticeSimpleType[]>([]);
  const [categories, setCategories] = useState<NoticeCategoryType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [view, setView] = useState<string>("보드");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleNoticeClick = (notice: NoticeSimpleType) => {
    navigate(`/forum/notices/${notice.id}`);
  };

  const handleWriteClick = () => {
    navigate("/forum/notices/new");
  };

  const handleViewChange = (view: string) => {
    setView(view);
    localStorage.setItem("notice_view", view);
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

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await getNotices(query, selectedCategory);

      if (response) {
        setNotices(response.notices);
        setCategories(response.categories);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    if (location.pathname === "/forum/notices") {
      fetchNotices();
    }
  }, [refreshCount, location, query, selectedCategory]);

  useEffect(() => {
    const view = localStorage.getItem("notice_view");
    if (view) {
      setView(view);
    }
  }, []);

  return (
    <Container>
      <Subtitle>공지</Subtitle>
      <Contents>
        <ViewOptions>
          <ViewButtons
            buttons={views}
            selected={view}
            onClick={handleViewChange}
          />
          {user?.is_admin && (
            <Button onClick={handleWriteClick}>새 공지</Button>
          )}
        </ViewOptions>
        <Horizontal>
          <Searchbar query={query} setQuery={setQuery} />
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
        </Horizontal>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
        ) : (
          <>
            {view === "보드" ? (
              <Notices>
                {notices.map((notice) => (
                  <button
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    data-testid={`notice-${notice.id}`}
                  >
                    <NoticeCard key={notice.id} notice={notice} />
                  </button>
                ))}
              </Notices>
            ) : (
              <>
                <NoticeTableHeader />
                {notices.map((notice) => (
                  <button
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    data-testid={`notice-${notice.id}`}
                  >
                    <NoticeTableRow key={notice.id} notice={notice} />
                  </button>
                ))}
              </>
            )}
          </>
        )}
      </Contents>
    </Container>
  );
}

interface FilterProps {
  categories: NoticeCategoryType[];
  selectedCategory: string | null;
  handleCategoryClick: (category: string | null) => void;
}

function Filters({
  categories,
  selectedCategory,
  handleCategoryClick,
}: Readonly<FilterProps>) {
  const disabledColor = "#BDBDBD";
  const disabledBgColor = "#E0E0E0";

  return (
    <Horizontal>
      <button onClick={() => handleCategoryClick(null)} data-testid="all">
        <Chip
          label="전체"
          color={selectedCategory ? disabledColor : "#FFFFFF"}
          bgColor={selectedCategory ? disabledBgColor : "#424242"}
        />
      </button>
      {categories.map((category) => (
        <button
          key={category.label}
          onClick={() => handleCategoryClick(category.label)}
          data-testid={`category-${category.label}`}
        >
          <Chip
            label={category.label}
            color={
              selectedCategory === category.label
                ? category.color
                : disabledColor
            }
            bgColor={
              selectedCategory === category.label
                ? category.background_color
                : disabledBgColor
            }
          />
        </button>
      ))}
    </Horizontal>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.background100};
  font-size: 1rem;
  font-weight: 400;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
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

const ViewOptions = styled(Horizontal)`
  justify-content: space-between;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Notices = styled.div`
  display: flex;
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
