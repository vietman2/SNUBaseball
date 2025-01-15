import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { TransactionType } from "@models/accountings";

function Income() {
  return (
    <Type>
      <AppIcon icon="arrow-down" color="green" size={24} />
      <span>수입</span>
    </Type>
  );
}

function Expense() {
  return (
    <Type>
      <AppIcon icon="arrow-up" color="red" size={24} />
      <span>지출</span>
    </Type>
  );
}

export function TransactionTableHeader() {
  return (
    <Header>
      <div>날짜</div>
      <div>계좌</div>
      <div>유형</div>
      <div>금액</div>
      <div>분류</div>
      <div>내역</div>
      <div>거래처</div>
      <div>거래 후 잔액</div>
    </Header>
  );
}

interface Props {
  transaction: TransactionType;
}

export function TransactionTableRow({ transaction }: Readonly<Props>) {
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");

    return `${year.slice(2)}/${month}/${day}`;
  };

  return (
    <Container>
      <div>{formatDate(transaction.date)}</div>
      <div>
        <Chip
          label={transaction.account.label}
          color={transaction.account.color}
          bgColor={transaction.account.background_color}
        />
      </div>
      <div>{transaction.type === "수입" ? <Income /> : <Expense />}</div>
      <div>{transaction.amount.toLocaleString()}원</div>
      <div>{transaction.category}</div>
      <div>
        <span>{transaction.description}</span>
      </div>
      <div>{transaction.counter_party}</div>
      <div>{transaction.balance_after.toLocaleString()}원</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 32px;

    border-right: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
  }

  > div:nth-child(4) {
    width: 108px;
  }

  > div:nth-child(6) {
    width: 200px;
    padding: 0 8px;
    > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  > div:nth-child(7) {
    width: 120px;

    @media (max-width: 1280px) {
      display: none;
    }
  }

  > div:nth-child(8) {
    width: 108px;

    @media (max-width: 1280px) {
      display: none;
    }
  }
`;

const Header = styled(Container)`
  display: flex;
  flex-direction: row;

  border-bottom: ${({ theme }) => `2px solid ${theme.colors.borderLight}`};
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  font-size: 0.95rem;
  font-weight: 500;
`;
