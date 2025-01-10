import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ViewButtons } from "@components/Buttons";
import { MemberAdd, MembersRowHeader, MemberTableRow } from "@fragments/Member";
import { MemberType } from "@models/user";
import { getMembers } from "@services/person";

const views = [
  {
    label: "전체",
    icon: "list",
  },
  {
    label: "YB",
    icon: "baseball",
  },
  {
    label: "OB",
    icon: "graduate",
  },
  {
    label: "기타",
    icon: "dots",
  },
];

export function MembersList() {
  const [view, setView] = useState<string>("전체");
  const [members, setMembers] = useState<MemberType[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleClose = () => {
    setModalOpen(false);
    handleRefresh();
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleDetail = (id: number) => {
    navigate(`/team/members/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMembers(view);

      if (response) {
        setMembers(response);
      }
    };

    fetchData();
  }, [view, refreshCount]);

  return (
    <>
      <Container>
        <Subtitle>명부관리</Subtitle>
        <Header>
          <ViewButtons buttons={views} selected={view} onClick={setView} wide />
          <Button onClick={handleOpen}>추가</Button>
        </Header>
        <Vertical>
          <MembersRowHeader />
          <>
            {members.length === 0 ? (
              <div>데이터가 없습니다.</div>
            ) : (
              <>
                {members.map((member, index) => (
                  <button
                    key={member.id}
                    onClick={() => handleDetail(member.id)}
                    data-testid={`member-${member.id}`}
                  >
                    <MemberTableRow index={index} member={member} />
                  </button>
                ))}
              </>
            )}
          </>
        </Vertical>
      </Container>
      {modalOpen && <MemberAdd handleClose={handleClose} />}
    </>
  );
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Vertical)`
  padding: 8px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 16px;
`;

const Subtitle = styled.span`
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
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.background100};
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;
