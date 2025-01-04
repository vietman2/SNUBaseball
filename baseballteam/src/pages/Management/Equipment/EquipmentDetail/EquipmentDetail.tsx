import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { useAuth } from "@contexts/auth";
import { EquipmentUpdateModal, EquipmentUpdateTip } from "@fragments/Equipment";
import { EquipmentDetailType } from "@models/management";
import { MemberType } from "@models/user";
import { getEquipmentDetails } from "@services/management";
import { getMembers } from "@services/person";

export function EquipmentDetail() {
  const [equipment, setEquipment] = useState<EquipmentDetailType>();
  const [activeMembers, setActiveMembers] = useState<MemberType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tipModalOpen, setTipModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { equipmentId } = useParams();
  const navigation = useNavigate();
  const { user } = useAuth();

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const handleClose = () => {
    navigation("/management/equipment");
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    handleRefresh();
  };

  const openTipModal = () => {
    setTipModalOpen(true);
  };

  const closeTipModal = () => {
    setTipModalOpen(false);
    handleRefresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await getEquipmentDetails(equipmentId);
      const response2 = await getMembers("YB");

      if (response1 && response2) {
        setEquipment(response1);
        setActiveMembers(response2);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [equipmentId, refreshCount]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (equipmentId === null || equipment === undefined || error) {
    return <ErrorComponent onRefresh={handleClose} label="뒤로가기" />;
  }

  return (
    <>
      <Container>
        <Header>
          <Title>{equipment.name}</Title>
        </Header>
        <Wrapper>
          <Divider />
        </Wrapper>
        <Content>
          <SubtitleWrapper>
            <Subtitle>
              관리 요령 (담당자: {equipment.person_in_charge.join(", ")})
            </Subtitle>
            {user?.is_admin && (
              <Button onClick={openTipModal}>수정</Button>
            )}
          </SubtitleWrapper>
          <span>{equipment.management_tips}</span>
        </Content>
        <Wrapper>
          <Divider />
        </Wrapper>
        <Content>
          <SubtitleWrapper>
            <Subtitle>현황</Subtitle>
            {equipment.is_in_charge && (
              <Button onClick={openModal}>업데이트</Button>
            )}
          </SubtitleWrapper>
          <Locations>
            {equipment.location.map((location, index) => (
              <LocationWrapper
                key={location.name}
                $last={index === equipment.location.length - 1}
              >
                <LocationTitle>{location.name}</LocationTitle>
                {location.equipment.map((item) => (
                  <Row key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                  </Row>
                ))}
              </LocationWrapper>
            ))}
          </Locations>
        </Content>
        <Wrapper>
          <Divider />
        </Wrapper>
        <Content>
          <Subtitle>변경 내역</Subtitle>
          <Column>
            <History $header>
              <span>날짜</span>
              <span>담당자</span>
              <span>요약</span>
              <span>상세</span>
            </History>
            {equipment.history.map((history) => (
              <History key={history.id}>
                <span>{history.updated_at}</span>
                <span>{history.person}</span>
                <span>{history.summary}</span>
                <Details>
                  {history.details}
                  {history.notes && (
                    <span className="tooltip">비고: {history.notes}</span>
                  )}
                </Details>
              </History>
            ))}
          </Column>
        </Content>
      </Container>
      <EquipmentUpdateModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        equipment={equipment}
        activeMembers={activeMembers}
      />
      <EquipmentUpdateTip
        modalOpen={tipModalOpen}
        closeModal={closeTipModal}
        equipment={equipment}
      />
    </>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Container = styled(Column)`
  flex: 1;
  width: calc(100vw - 120px);
  padding: 36px;
  gap: 24px;

  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 24px;
  }
`;

const Header = styled(Column)`
  gap: 16px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Subtitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Content = styled(Column)`
  gap: 12px;

  > span {
    line-height: 1.75;
    white-space: pre-wrap;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  > div {
    flex: 1;
  }
`;

const Locations = styled(Wrapper)`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LocationWrapper = styled(Column)<{ $last?: boolean }>`
  max-width: 280px;
  gap: 8px;
  border-right: ${({ theme, $last }) =>
    $last ? "none" : `1px solid ${theme.colors.borderLight}`};

  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 280px;
    padding-bottom: 16px;
    border-right: none;
  }
`;

const LocationTitle = styled.div`
  align-self: center;
  margin-bottom: 4px;
  font-size: 1.05rem;
  font-weight: 600;

  border-right: none;
`;

const Row = styled.div`
  display: flex;

  > span:first-child {
    flex: 1;
  }

  > span:last-child {
    display: flex;
    flex: 0.4;
    justify-content: flex-end;
    padding-right: 12px;
  }
`;

const History = styled.div<{ $header?: boolean }>`
  display: flex;
  flex-direction: row;
  min-width: 360px;
  height: 24px;

  border-top: ${({ theme, $header }) =>
    $header ? "none" : `1px solid ${theme.colors.borderLight}`};

  > span {
    flex: 1;
    padding: 4px 8px;
    min-width: 54px;
    font-size: 14px;
    font-weight: 500;

    border-right: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
  }

  > span:nth-child(2) {
    flex: 0.5;
    min-width: 54px;
  }

  > span:nth-child(3) {
    min-width: 96px;
  }

  > span:last-child {
    flex: 2.5;
    min-width: 280px;

    border-right: none;
  }
`;

const Details = styled.span`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }

  > span {
    position: absolute;
    bottom: 80%;
    left: 10%;
    padding: 4px 8px;
    visibility: hidden;
    opacity: 0;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background100};

    transition: visibility 0.3s, opacity 0.3s;
  }
`;

const Button = styled.button`
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background900};
  color: ${({ theme }) => theme.colors.foreground900};
  cursor: pointer;
`;
