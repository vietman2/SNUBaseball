import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Searchbar } from "@components/Searchbar";
import { useTheme } from "@contexts/theme";
import {
  TransactionTableHeader,
  TransactionTableRow,
} from "@fragments/Transactions";
import { TransactionType } from "@models/accountings";
import { getTransactions } from "@services/accountings";

export function HistoryList() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const handleDetail = (id: number) => {
    navigate(`./${id}`);
  };

  const handleCreate = () => {
    navigate("./new");
  };

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };

  const applyFilters = () => {
    closeFilter();
    handleRefresh();
  };

  const handlePageSelect = (page: number) => {
    setSelectedPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await getTransactions(
        selectedPage,
        selectedAccount,
        selectedMonth,
        selectedType,
        query
      );

      if (response) {
        setTransactions(response.results);
        setNumPages(response.num_pages);
        setSelectedPage(response.current_page);
      }

      setLoading(false);
    };

    if (location.pathname === "/accountings/history") {
      fetchData();
    }
  }, [refreshCount, selectedPage, location.pathname, query]);

  return (
    <Container>
      <Header>
        <Subtitle>거래 내역</Subtitle>
        <Horizontal>
          <Searchbar query={query} setQuery={setQuery} />
          <FilterWrapper>
            <button onClick={toggleFilter} data-testid="filter-button">
              <AppIcon icon="filter" size={16} color={colors.foreground900} />
              필터
            </button>
            <FilterModal $isOpen={filterOpen}>
              <div>
                <span>월별 필터</span>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  data-testid="month-filter"
                />
              </div>
              <div>
                <span>계좌별 필터</span>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  data-testid="account-filter"
                >
                  <option value="">전체</option>
                  <option value="2">부비</option>
                  <option value="1">발전기금</option>
                  <option value="3">KUSF 지원금</option>
                  <option value="4">운동부 지원금</option>
                  <option value="5">기타</option>
                </select>
              </div>
              <div>
                <span>유형 필터</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  data-testid="type-filter"
                >
                  <option value="">전체</option>
                  <option value="수입">수입</option>
                  <option value="지출">지출</option>
                </select>
              </div>
              <div>
                <Button onClick={closeFilter}>취소</Button>
                <Button onClick={applyFilters}>적용</Button>
              </div>
            </FilterModal>
          </FilterWrapper>
          <Button onClick={handleCreate}>내역 추가</Button>
        </Horizontal>
      </Header>
      <TransactionTableHeader />
      {loading ? (
        <Loading />
      ) : (
        <>
          {transactions.length === 0 ? (
            <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
          ) : (
            transactions.map((transaction) => (
              <button
                key={transaction.id}
                onClick={() => handleDetail(transaction.id)}
                data-testid={`transaction-${transaction.id}`}
              >
                <TransactionTableRow transaction={transaction} />
              </button>
            ))
          )}
        </>
      )}
      <Pages>
        {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageSelect(page)}
            style={{
              color:
                selectedPage === page ? colors.primary : colors.foreground900,
              fontWeight: selectedPage === page ? 700 : 400,
            }}
            data-testid={`page-${page}`}
          >
            {page}
          </button>
        ))}
      </Pages>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  gap: 16px;
`;

const Horizontal = styled.div`
  display: flex;
  gap: 8px;

  > div:first-child {
    @media (max-width: 768px) {
      width: 240px;
    }
  }
`;

const FilterWrapper = styled.div`
  display: inline-flex;
  position: relative;

  > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 8px;
    gap: 4px;
  }

  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.foreground900};

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.borderLight};
`;

const Subtitle = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;

  color: ${({ theme }) => theme.colors.background100};
  font-size: 1rem;
  font-weight: 400;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const FilterModal = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 120%;
  right: 0;
  width: 240px;
  padding: 24px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background500};
  z-index: 100;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    > button {
      flex: 1;
      font-weight: 600;
    }

    > button:first-child {
      color: ${({ theme }) => theme.colors.foreground900};
      background-color: ${({ theme }) => theme.colors.borderDark};
    }

    > input[type="month"] {
      width: 120px;
      padding: 8px;
      border-radius: 8px;
      border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
      background-color: ${({ theme }) => theme.colors.background300};
    }

    > select {
      width: 120px;
      padding: 8px;
      border-radius: 8px;
      border: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
      background-color: ${({ theme }) => theme.colors.background300};
    }
  }
`;

const Pages = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  gap: 16px;
`;
