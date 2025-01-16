import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { AccountType } from "@models/accountings";
import {
  createTransaction,
  getAccounts,
  getTransaction,
  updateTransaction,
} from "@services/accountings";

export function HistoryWrite() {
  const [accountOptions, setAccountOptions] = useState<AccountType[]>([]);

  const [selectedAccountId, setSelectedAccountId] = useState<string>("1");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("지출");
  const [category, setCategory] = useState<string>("식비");
  const [paymentMethod, setPaymentMethod] = useState<string>("카드");
  const [counterParty, setCounterParty] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const editMode = location.pathname.includes("edit");
  const [error, setError] = useState<boolean>(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (editMode) {
      const response = await updateTransaction(id, {
        accountId: selectedAccountId,
        amount,
        date,
        description,
        type,
        category,
        paymentMethod,
        counterParty,
        notes,
      });

      if (response) {
        navigate("/accountings/history");
      } else {
        window.alert("수정에 실패했습니다.");
      }
    } else {
      const response = await createTransaction({
        accountId: selectedAccountId,
        amount,
        date,
        description,
        type,
        category,
        paymentMethod,
        counterParty,
        notes,
      });

      if (response) {
        navigate("/accountings/history");
      } else {
        window.alert("저장에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAccounts();

      if (response) {
        setAccountOptions(response);
      } else {
        setError(true);
      }
    };

    const fetchHistory = async (id: string) => {
      const response = await getTransaction(id);

      if (response) {
        setSelectedAccountId(response.account.id.toString());
        setAmount(response.amount);
        setDate(response.date);
        setDescription(response.description);
        setType(response.type);
        setCategory(response.category);
        setPaymentMethod(response.method);
        setCounterParty(response.counter_party);
        setNotes(response.notes);
      } else {
        setError(true);
      }
    };

    fetchData();

    if (editMode) {
      if (id) fetchHistory(id);
      else setError(true);
    }
  }, []);

  if (error) {
    return <ErrorComponent label="뒤로가기" onRefresh={goBack} />;
  }

  return (
    <Container>
      <div>
        <BackButton onClick={goBack}>
          <AppIcon icon="chevron-left" size={24} color="gray" />
        </BackButton>
        <span>{editMode ? "내역 수정" : "내역 추가"}</span>
      </div>
      <Contents>
        <InputWrapper>
          <span>계좌</span>
          <div>
            <select
              onChange={(e) => setSelectedAccountId(e.target.value)}
              value={selectedAccountId}
              data-testid="account-select"
            >
              {accountOptions.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.label}
                </option>
              ))}
            </select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>금액</span>
          <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              data-testid="amount-input"
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>유형</span>
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              data-testid="type-select"
            >
              <option value="수입">수입</option>
              <option value="지출">지출</option>
            </select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>분류</span>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-testid="category-select"
            >
              <option value="수입">수입</option>
              <option value="식비">식비</option>
              <option value="교통비">교통비</option>
              <option value="숙박비">숙박비</option>
              <option value="야구용품비">야구용품비</option>
              <option value="선수등록비">선수등록비</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>결제방식</span>
          <div>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              data-testid="method-select"
            >
              <option value="수입">수입</option>
              <option value="카드">카드</option>
              <option value="계좌이체">계좌이체</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>내용</span>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="description-input"
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>거래처</span>
          <div>
            <input
              type="text"
              value={counterParty}
              onChange={(e) => setCounterParty(e.target.value)}
              data-testid="counterparty-input"
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>날짜</span>
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              {...(editMode && { disabled: true })}
              data-testid="date-input"
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <span>비고</span>
          <div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              data-testid="notes-input"
            />
          </div>
        </InputWrapper>
      </Contents>
      <Button onClick={handleSubmit}>저장</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    > span {
      display: flex;
      padding: 8px 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground900};
    }
  }
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 0;
  gap: 8px;

  > span:first-child {
    display: flex;
    padding: 6px;
    width: 100px;
  }

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 8px;

    > select {
      display: flex;
      flex: 1;
      align-items: center;
      height: 26px;
      padding: 4px 8px;
      border-radius: 8px;
      border: none;
      font-size: 0.9rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground900};
      background: url("/assets/icons/chevron-down.svg") no-repeat 98% 48%;
      background-color: white;

      @media (max-width: 768px) {
        width: 40vw;
        background-color: ${({ theme }) => theme.colors.background300};
      }
    }

    > input {
      display: flex;
      flex: 1;
      padding: 4px 8px;
      border: ${({ theme }) => `1px solid ${theme.colors.borderDark}`};
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground900};

      @media (max-width: 768px) {
        width: 40vw;
        background-color: ${({ theme }) => theme.colors.background300};
      }
    }

    > input[type="date"] {
      display: block;
    }

    > textarea {
      display: flex;
      flex: 1;
      height: 120px;
      padding: 4px 8px;
      border: ${({ theme }) => `1px solid ${theme.colors.borderDark}`};
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground900};

      @media (max-width: 768px) {
        width: 40vw;
        background-color: ${({ theme }) => theme.colors.background300};
      }
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background100};

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
