import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useTheme } from "@contexts/theme";
import { TransactionType } from "@models/accountings";
import { MenuOptionType } from "@models/app";
import { getTransaction, deleteTransaction } from "@services/accountings";

export function HistoryDetail() {
  const [transaction, setTransaction] = useState<TransactionType>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const goBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`../${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteTransaction(id);

      if (response) {
        navigate(-1);
      } else {
        window.alert("삭제에 실패했습니다.");
      }
    }
  };

  const actions: MenuOptionType[] = [
    {
      label: "수정하기",
      onClick: handleEdit,
    },
    {
      label: "삭제하기",
      onClick: () => handleDelete(),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTransaction(id);

      if (response) {
        setTransaction(response);
      }
    };

    fetchData();
  }, [id]);

  if (!transaction) {
    return <ErrorComponent label="뒤로가기" onRefresh={goBack} />;
  }

  return (
    <Container>
      <Header>
        <div>
          <span>상세 내역</span>
          <Menu
            options={actions}
            isOpen={isMenuOpen}
            toggleDropdown={toggleMenu}
          />
        </div>
        <Summary>
          <div>
            <AppIcon
              icon={transaction.type === "수입" ? "arrow-down" : "arrow-up"}
              size={48}
              color={colors.foreground900}
            />
            <div>
              <span>{transaction.description}</span>
              <span>{transaction.type}</span>
            </div>
          </div>
          <div>
            <span>
              {`${
                transaction.type === "수입" ? "+" : "-"
              } ${transaction.amount.toLocaleString()} 원`}
            </span>
            <span>
              {`잔액 ${transaction.balance_after.toLocaleString()} 원`}
            </span>
          </div>
        </Summary>
      </Header>
      <span>
        <Divider color={colors.borderDark} bold />
      </span>
      <Contents>
        <Row>
          <span>날짜</span>
          <span>{transaction.date}</span>
        </Row>
        <Row>
          <span>계좌</span>
          <span>
            <Chip
              label={transaction.account.label}
              color={transaction.account.color}
              bgColor={transaction.account.background_color}
            />
          </span>
        </Row>
        <Row>
          <span>분류</span>
          <span>{transaction.category}</span>
        </Row>
        <Row>
          <span>내용</span>
          <span>{transaction.description}</span>
        </Row>
        <Row>
          <span>금액</span>
          <span>{transaction.amount.toLocaleString()} 원</span>
        </Row>
        <Row>
          <span>거래 후 잔액</span>
          <span>{transaction.balance_after.toLocaleString()} 원</span>
        </Row>
        <Row>
          <span>결제수단</span>
          <span>{transaction.method}</span>
        </Row>
        <Row>
          <span>거래처</span>
          <span>{transaction.counter_party}</span>
        </Row>
        <Row>
          <span>비고</span>
          <span>{transaction.notes}</span>
        </Row>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 24px;

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: 1.625rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.foreground900};
    }
  }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    > div:last-child {
      display: flex;
      flex-direction: column;
      gap: 8px;

      > span:first-child {
        font-size: 1.2rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.foreground900};
      }

      > span:last-child {
        font-size: 1rem;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.foreground300};
      }
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;

    > span:first-child {
      font-size: 1.2rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.foreground900};
    }

    > span:last-child {
      font-size: 1rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.foreground300};
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;

  font-size: 1.125rem;

  > span:first-child {
    color: ${({ theme }) => theme.colors.foreground300};
    font-weight: 600;
  }

  > span:last-child {
    color: ${({ theme }) => theme.colors.foreground900};
    font-weight: 500;
  }
`;
