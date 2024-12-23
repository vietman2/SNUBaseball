import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
import {
  createGuideline,
  editGuideline,
  getGuidelinesDetail,
} from "@services/training";

const categories = ["내야", "외야", "포수", "투수", "타격", "주루", "기타"];

export function GuidelineWrite() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [indoor, setIndoor] = useState<boolean>(false);
  const [minPlayers, setMinPlayers] = useState<number>(1);
  const [maxPlayers, setMaxPlayers] = useState<number>(2);

  const navigate = useNavigate();
  const location = useLocation();
  const { guidelineId } = useParams();

  const editMode = location.pathname.includes("edit");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleClose = () => {
    navigate(-1);
  };

  const toggleIndoor = () => {
    setIndoor(!indoor);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (editMode && guidelineId) {
      const response = await editGuideline(
        parseInt(guidelineId),
        title,
        content,
        videoLink,
        selectedCategory,
        selectedType === "드릴",
        indoor,
        minPlayers,
        maxPlayers
      );

      if (response) {
        window.alert("성공적으로 수정되었습니다.");
        handleClose();
      } else {
        window.alert("수정에 실패했습니다.");
      }
    } else {
      const response = await createGuideline(
        title,
        content,
        videoLink,
        selectedCategory,
        selectedType === "드릴",
        indoor,
        minPlayers,
        maxPlayers
      );

      if (response) {
        window.alert("성공적으로 등록되었습니다.");
        handleClose();
      } else {
        window.alert("등록에 실패했습니다.");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchGuidelineDetails = async () => {
      if (!editMode) {
        setLoading(false);
        return;
      }

      if (!guidelineId) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      const response = await getGuidelinesDetail(parseInt(guidelineId));

      if (response) {
        setTitle(response.title);
        setVideoLink(`https://www.youtube.com/watch?v=${response.video_id}`);
        setContent(response.content);
        setSelectedCategory(response.category);
        setSelectedType(response.is_drill ? "드릴" : "예시");
        setIndoor(response.is_indoor);
        setMinPlayers(response.min_people);
        setMaxPlayers(response.max_people);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchGuidelineDetails();
  }, [editMode, guidelineId]);

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
        <ErrorComponent label="뒤로가기" onRefresh={handleClose} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleClose}>
          <AppIcon icon="chevron-left" size={24} color="gray" />
        </BackButton>
        <Title>새 가이드라인</Title>
      </Header>
      <Horizontal>
        <Horizontal>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            data-testid="category"
          >
            <option value="">분류</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            data-testid="type"
          >
            <option value="">유형</option>
            <option value="드릴">드릴</option>
            <option value="예시">예시</option>
          </select>
        </Horizontal>
      </Horizontal>
      <Horizontal>
        <Row>
          <Subtitle>실내 가능 여부</Subtitle>
          <input
            type="checkbox"
            checked={indoor}
            onChange={toggleIndoor}
            data-testid="toggle"
          />
        </Row>
        <Horizontal>
          <Subtitle>인원</Subtitle>
          <div>
            <input
              type="number"
              value={minPlayers}
              onChange={(e) => setMinPlayers(+e.target.value)}
              min={1}
              max={10}
              data-testid="min"
            />
            <Subtitle>~</Subtitle>
            <input
              type="number"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(+e.target.value)}
              min={1}
              max={10}
              data-testid="max"
            />
          </div>
        </Horizontal>
      </Horizontal>
      <Wrapper>
        <Subtitle>제목</Subtitle>
        <TextInput
          wide
          placeholder="제목을 입력하세요"
          value={title}
          onChange={setTitle}
        />
      </Wrapper>
      <Wrapper>
        <Subtitle>유튜브 영상 (링크)</Subtitle>
        <TextInput
          wide
          placeholder="유튜브 영상 링크를 입력하세요."
          value={videoLink}
          onChange={setVideoLink}
        />
      </Wrapper>
      <Content>
        <Subtitle>내용</Subtitle>
        <ContentInput
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요."
          data-testid="content-input"
        />
      </Content>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Footer>
        <button onClick={handleSubmit} data-testid="submit">
          등록
        </button>
      </Footer>
    </Container>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  > input {
    align-self: center;
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
`;

const Container = styled(Column)`
  flex: 1;
  padding: 16px 24px;
  gap: 16px;
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const Title = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Header = styled(Row)`
  align-items: center;
  gap: 12px;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const Subtitle = styled.div`
  padding-bottom: 2px;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Horizontal = styled(Row)`
  align-items: center;
  gap: 16px;

  > div:last-child {
    display: flex;
    flex-direction: row;
    gap: 8px;

    > input {
      height: 24px;
      width: 36px;
    }
  }

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
`;

const Wrapper = styled(Column)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Content = styled(Wrapper)`
  flex: 1;
`;

const ContentInput = styled.textarea`
  display: flex;
  flex: 1;
  padding: 8px;
  min-height: 200px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.foreground300};

  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
`;

const DividerWrapper = styled.div`
  display: flex;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 0 8px 0;
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
