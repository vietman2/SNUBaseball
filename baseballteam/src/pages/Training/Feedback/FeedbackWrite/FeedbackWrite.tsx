import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
import { useTheme } from "@contexts/theme";
import { ClassificationType } from "@models/training";
import { MemberType } from "@models/user";
import { getMembers } from "@services/person";
import {
  createFeedback,
  editFeedback,
  getCategoryOptions,
  getFeedbackDetail,
} from "@services/training";

export function FeedbackWrite() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<ClassificationType[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const { feedbackId } = useParams();
  const { colors } = useTheme();

  const editMode = location.pathname.includes("edit");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMemberClick = (value: string) => {
    const member = members.find((member) => member.name === value);

    if (!member) {
      return;
    }

    setSelectedMember(member);
  };

  const handleSubmit = async () => {
    if (editMode && feedbackId) {
      const response = await editFeedback(
        parseInt(feedbackId),
        title,
        content,
        selectedCategory,
        selectedMember?.id,
        selectedStatus
      );

      if (response) {
        window.alert("피드백을 수정했습니다.");
        handleBack();
      } else {
        window.alert("피드백을 수정하는데 실패했습니다.");
      }
    } else {
      const response = await createFeedback(
        title,
        content,
        selectedCategory,
        selectedMember?.id,
        selectedStatus
      );

      if (response) {
        window.alert("피드백을 등록했습니다.");
        handleBack();
      } else {
        window.alert("피드백을 등록하는데 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await getMembers("ybs");
      const response2 = await getCategoryOptions();

      if (response1 && response2) {
        setMembers(response1);
        setCategoryOptions(response2);
        setSelectedCategory(response2[0].label);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    const fetchNoticeDetails = async () => {
      if (!feedbackId) {
        setError(true);
        setLoading(false);
        return;
      }

      const response = await getFeedbackDetail(parseInt(feedbackId));

      if (response) {
        setTitle(response.data.title);
        setContent(response.data.content);
        setSelectedCategory(response.data.category.label);
        setSelectedMember(response.data.player);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();

    if (editMode) {
      fetchNoticeDetails();
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorComponent label="뒤로가기" onRefresh={handleBack} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <AppIcon icon="chevron-left" size={24} color="gray" />
        </BackButton>
        <Title>{editMode ? "피드백 수정" : "새 피드백"}</Title>
        <Categories>
          {categoryOptions.map((category) => (
            <button
              key={category.label}
              onClick={() => setSelectedCategory(category.label)}
              data-testid={`category-${category.label}`}
            >
              <Chip
                label={category.label}
                color={
                  category.label === selectedCategory
                    ? category.color
                    : colors.borderDark
                }
                bgColor={
                  category.label === selectedCategory
                    ? category.background_color
                    : colors.background300
                }
              />
            </button>
          ))}
        </Categories>
        <div>
          <select
            value={selectedMember ? selectedMember.name : ""}
            onChange={(e) => handleMemberClick(e.target.value)}
            data-testid="player-select"
          >
            <option value={0}>선수</option>
            {members.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            data-testid="status-select"
          >
            <option value="">상태</option>
            <option value="신규">신규</option>
            <option value="진행중">진행중</option>
            <option value="검토중">검토중</option>
            <option value="완료">완료</option>
          </select>
        </div>
      </Header>
      <Wrapper>
        <span>제목</span>
        <TextInput
          wide
          placeholder="제목을 입력하세요"
          value={title}
          onChange={setTitle}
        />
      </Wrapper>
      <ContentWrapper>
        <span>내용</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요."
          data-testid="content-input"
        />
      </ContentWrapper>
      <ButtonWrapper>
        <button onClick={handleSubmit}>{editMode ? "수정" : "등록"}</button>
      </ButtonWrapper>
    </Container>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Column)`
  flex: 1;
  padding: 16px 24px;
  gap: 12px;
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};

  select {
    align-items: center;
    width: 72px;
    height: 26px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background900};
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.foreground700};
  }
`;

const ContentWrapper = styled(Wrapper)`
  flex: 1;
  gap: 8px;

  textarea {
    display: flex;
    flex: 1;
    padding: 8px;
    min-height: 360px;

    border-radius: 8px;
    border: ${({ theme }) => `2px solid ${theme.colors.borderDark}`};

    color: ${({ theme }) => theme.colors.foreground700};
    font-size: 1rem;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  gap: 8px;

  > button {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 8px 0;

    color: ${({ theme }) => theme.colors.background100};
    font-weight: 500;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
