import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
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
  const [query, setQuery] = useState<string>("");

  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTransactions();

      if (response) {
        setTransactions(response);
      }
    };

    if (location.pathname === "/accountings/history") {
      fetchData();
    }
  }, [refreshCount, location.pathname]);

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
                  <option value="부비">부비</option>
                  <option value="발전기금">발전기금</option>
                  <option value="KUSF 지원금">KUSF 지원금</option>
                  <option value="운동부 지원금">운동부 지원금</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div>
                <Button onClick={closeFilter}>
                  취소
                </Button>
                <Button onClick={applyFilters}>
                  적용
                </Button>
              </div>
            </FilterModal>
          </FilterWrapper>
          <Button onClick={handleCreate}>내역 추가</Button>
        </Horizontal>
      </Header>
      <TransactionTableHeader />
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
  width: 240px;
  padding: 24px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background500};

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
