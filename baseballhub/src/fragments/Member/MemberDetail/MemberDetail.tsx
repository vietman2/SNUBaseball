import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider, VerticalDivider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { MemberDetailType } from "@models/user";
import { getMemberDetail } from "@services/person";

interface Props {
  memberId: number | null;
  goBack: () => void;
}

export function MemberDetail({ memberId, goBack }: Readonly<Props>) {
  const [member, setMember] = useState<MemberDetailType>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (memberId === null) return;

      setLoading(true);
      const response = await getMemberDetail(memberId);

      if (response) {
        setMember(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchMemberDetails();
  }, [memberId, refreshCount]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (memberId === null || member === undefined || error)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <div>
          <img src={member.profile_image} alt={member.name} />
          <div>
            <Subtitle size="large">{member.name}</Subtitle>
            <div>{member.role}</div>
          </div>
        </div>
        <div>
          <Chip
            label={member.status.name}
            color={member.status.color}
            bgColor={member.status.background_color}
          />
        </div>
      </Header>
      <Data>
        <div>
          <div>등번호</div>
          <div>{member.back_number}</div>
        </div>
        <VerticalDivider height="75%" />
        <div>
          <div>주 포지션</div>
          <div>{member.position}</div>
        </div>
        <VerticalDivider height="75%" />
        <div>
          <div>입단</div>
          <div>{member.date_joined}</div>
        </div>
        <VerticalDivider height="75%" />
        <div>
          <div>활동기간</div>
          <div>{member.num_semester}</div>
        </div>
      </Data>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <Subtitle>부원 정보</Subtitle>
        <Wrapper>
          <Column>
            <Row>
              <div>학번</div>
              <div>{member.student_id}</div>
            </Row>
            <Divider color={"#A1A1A1"} />
            <Row>
              <div>전화번호</div>
              <div>{member.phone}</div>
            </Row>
            <Divider color={"#A1A1A1"} />
            <Row>
              <div>생년월일</div>
              <div>{member.birth_date}</div>
            </Row>
          </Column>
          <Column>
            <Row>
              <div>전공</div>
              <div>{member.major}</div>
            </Row>
            <Divider color={"#A1A1A1"} />
            <Row>
              <div>이메일</div>
              <div>{member.email}</div>
            </Row>
            <Divider color={"#A1A1A1"} />
            <Row>
              <div>비고</div>
              <div>{member.notes}</div>
            </Row>
          </Column>
        </Wrapper>
        <Column>
          <Divider color={"#A1A1A1"} />
          <Row>
            <div>주소</div>
            <div>{member.address}</div>
          </Row>
        </Column>
      </Content>
      {member.position === "매니저" ? null : (
        <>
          <DividerWrapper>
            <Divider bold />
          </DividerWrapper>
          <Content>
            <Subtitle>프로필</Subtitle>
            <Wrapper>
              <Column>
                <Row>
                  <div>투타</div>
                  <div>{member.hands}</div>
                </Row>
                <Divider color={"#A1A1A1"} />
                <Row>
                  <div>체중</div>
                  <div>{member.tale?.weight}</div>
                </Row>
                <Divider color={"#A1A1A1"} />
                <Row>
                  <div>라이벌</div>
                  <div>{member.tale?.rival}</div>
                </Row>
                <Divider color={"#A1A1A1"} />
                <Row>
                  <div>강점</div>
                  <div>{member.tale?.strength}</div>
                </Row>
              </Column>
              <Column>
                <Row>
                  <div>선수출신</div>
                  <div>{member.is_elite ? "O" : "X"}</div>
                </Row>
                <Divider color={"#A1A1A1"} />
                <Row>
                  <div>신장</div>
                  <div>{member.tale?.height}</div>
                </Row>
                <Divider color={"#A1A1A1"} />
                <Row>
                  <div>롤모델</div>
                  <div>{member.tale?.role_model}</div>
                </Row>
                <Divider color={"#A1A1A1"} />
                <Row>
                  <div>약점</div>
                  <div>{member.tale?.weakness}</div>
                </Row>
              </Column>
            </Wrapper>
          </Content>
        </>
      )}
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <Subtitle>자기소개</Subtitle>
        <Block>
          <div>야구부에 들어온 이유</div>
          <div>{member.tale?.reason}</div>
        </Block>
        <Block>
          <div>2024시즌 목표</div>
          <div>{member.tale?.goal}</div>
        </Block>
        <Void />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;

      object-fit: cover;
      image-rendering: -webkit-optimize-contrast;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    > div:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;

      > div:last-child {
        display: flex;
        padding: 0 16px;
      }
    }
  }

  > div:last-child {
    padding: 8px 0;
  }
`;

const Data = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
  padding: 8px 16px;
  gap: 24px;

  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    > div:first-child {
      color: ${({ theme }) => theme.colors.foreground700};
    }

    > div:last-child {
      color: ${({ theme }) => theme.colors.foreground900};
      font-size: 18px;
      font-weight: 700;
    }
  }

  > div:nth-child(odd) {
    flex: 1;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const DividerWrapper = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 16px;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  font-size: 14px;

  > div:first-child {
    color: ${({ theme }) => theme.colors.foreground700};
  }

  > div:last-child {
    color: ${({ theme }) => theme.colors.foreground900};
    font-weight: 700;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 8px;

  font-size: 14px;

  > div:first-child {
    color: ${({ theme }) => theme.colors.foreground700};
    font-weight: 700;
  }

  > div:last-child {
    color: ${({ theme }) => theme.colors.foreground900};
    line-height: 1.5rem;
  }
`;

const Void = styled.div`
  display: flex;
  height: 60px;
`;
